// Main App — orchestrates screens, navigation, state, tweaks

const { useState: uS, useEffect: uE, useMemo: uM, useRef: uR, useCallback: uC } = React;

const ACCENT_OPTIONS = [
  '#44c6e2', // cyan (default — Jeel Qadem brand)
  '#2aa5c4', // teal
  '#1d5fce', // royal blue
  '#f39322', // orange
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "accent": "#44c6e2",
  "navy": "#021c4d",
  "showWelcome": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Auth + nav state
  const [signedIn, setSignedIn]   = uS(!t.showWelcome);
  const [tab, setTab]             = uS('home');
  const [overlay, setOverlay]     = uS(null); // { kind, ...args }
  const [browseCat, setBrowseCat] = uS(null);
  const [cart, setCart]           = uS([
    // start with a couple items so cart isn't empty on first look
    { pid: 'p05', qty: 5 },
    { pid: 'p11', qty: 2 },
  ]);
  const [toast, setToast]         = uS(null);
  const toastTimer = uR(null);

  const lang  = t.lang || 'en';
  const dict  = I18N[lang];
  const isRTL = lang === 'ar';

  // Apply RTL + accent var to .app root
  uE(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--navy-800', t.navy);
  }, [lang, t.accent, t.navy]);

  // Showing toast
  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }

  // Cart helpers
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  function addToCart(product, qty) {
    setCart(prev => {
      const ex = prev.find(l => l.pid === product.id);
      if (ex) return prev.map(l => l.pid === product.id ? { ...l, qty: l.qty + qty } : l);
      return [...prev, { pid: product.id, qty }];
    });
    showToast(`${qty} × ${lang === 'ar' ? product.ar : product.en} ${lang === 'ar' ? 'أُضيف للسلة' : 'added to basket'}`);
  }
  function changeQty(pid, qty) {
    setCart(prev => prev.map(l => l.pid === pid ? { ...l, qty } : l));
  }
  function removeFromCart(pid) {
    setCart(prev => prev.filter(l => l.pid !== pid));
  }

  // Navigation helpers
  function openProduct(id) { setOverlay({ kind: 'product', id }); }
  function openCart()      { setTab('cart'); setOverlay(null); }
  function openBrowse(catId) {
    setTab('browse');
    setBrowseCat(catId || null);
    setOverlay(null);
  }
  function openOrder(id)   { setOverlay({ kind: 'tracking', id }); }
  function back()          { setOverlay(null); }
  function toggleLang()    { setTweak('lang', lang === 'en' ? 'ar' : 'en'); }

  function checkout() {
    setCart([]);
    setOverlay({ kind: 'placed', orderId: 'ORD-2026-' + String(Math.floor(Math.random() * 9000) + 1000), eta: '2026-05-22' });
  }

  // ────── Render screen for tab ──────
  let tabScreen;
  if (tab === 'home') {
    tabScreen = <HomeScreen
      t={dict} lang={lang}
      onOpenProduct={openProduct}
      onAdd={addToCart}
      onOpenCart={openCart}
      onOpenCat={(c) => openBrowse(c)}
      onOpenBrowse={() => openBrowse(null)}
      cartCount={cartCount}
    />;
  } else if (tab === 'browse') {
    tabScreen = <BrowseScreen
      t={dict} lang={lang}
      initialCat={browseCat || 'all'}
      onOpenProduct={openProduct}
      onAdd={addToCart}
    />;
  } else if (tab === 'cart') {
    tabScreen = <CartScreen
      t={dict} lang={lang}
      cart={cart}
      onChangeQty={changeQty}
      onRemove={removeFromCart}
      onOpenProduct={openProduct}
      onCheckout={checkout}
      onOpenBrowse={() => openBrowse(null)}
    />;
  } else if (tab === 'orders') {
    tabScreen = <OrdersScreen
      t={dict} lang={lang}
      orders={ORDERS}
      onOpenOrder={openOrder}
    />;
  } else if (tab === 'account') {
    tabScreen = <AccountScreen
      t={dict} lang={lang}
      onSignOut={() => { setSignedIn(false); setTweak('showWelcome', true); }}
      onToggleLang={toggleLang}
    />;
  }

  // ────── Render overlay (full-screen modals) ──────
  let overlayScreen = null;
  if (overlay?.kind === 'product') {
    overlayScreen = <ProductDetailScreen
      productId={overlay.id}
      onBack={back}
      onAdd={(p, q) => { addToCart(p, q); back(); openCart(); }}
      onOpenCart={openCart}
      cartCount={cartCount}
      t={dict} lang={lang}
    />;
  } else if (overlay?.kind === 'placed') {
    overlayScreen = <OrderPlacedScreen
      orderId={overlay.orderId}
      eta={overlay.eta}
      onHome={() => { setTab('home'); setOverlay(null); }}
      onTrack={() => setOverlay({ kind: 'tracking', id: 'ORD-2026-0418' })}
      t={dict} lang={lang}
    />;
  } else if (overlay?.kind === 'tracking') {
    overlayScreen = <OrderTrackingScreen
      orderId={overlay.id}
      onBack={() => { setOverlay(null); setTab('orders'); }}
      t={dict} lang={lang}
    />;
  }

  // Sign-in gate
  if (!signedIn) {
    return (
      <div className="app">
        <SplashScreen
          t={dict}
          lang={lang}
          onSignIn={() => { setSignedIn(true); setTweak('showWelcome', false); }}
        />
        {/* Lang toggle on splash */}
        <button
          onClick={toggleLang}
          style={{
            position: 'absolute', top: 60, insetInlineEnd: 20, zIndex: 10,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            fontSize: 12, fontWeight: 700,
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <Icon name="globe" size={14} color="#fff" stroke={2} />
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
    );
  }

  const showTabs = !overlayScreen || overlay?.kind === 'placed' ? false : false;
  // Actually: show tabs always EXCEPT when an overlay is up
  const tabsVisible = !overlay;

  return (
    <div className="app">
      {/* Active tab content (live, not unmounted, but visually hidden behind overlay) */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {tabScreen}
        {/* Overlay over content */}
        {overlayScreen && (
          <div style={{
            position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 100,
          }}>
            {overlayScreen}
          </div>
        )}
      </div>

      {tabsVisible && (
        <BottomTabs active={tab} onTab={setTab} cartCount={cartCount} t={dict} />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'absolute', bottom: 110, left: 16, right: 16,
          padding: '12px 16px',
          background: 'rgba(11,24,39,0.92)',
          color: '#fff',
          borderRadius: 14,
          fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 10,
          zIndex: 200,
          animation: 'screenIn .22s ease',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name="check" size={14} color="#fff" stroke={3} />
          </div>
          <span style={{ flex: 1 }}>{toast}</span>
          <button onClick={openCart} style={{ fontSize: 12, color: 'var(--cyan-400)', fontWeight: 700 }}>
            {lang === 'ar' ? 'عرض' : 'View'}
          </button>
        </div>
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Language" />
        <TweakRadio
          label="Direction"
          value={t.lang}
          options={[{ value: 'en', label: 'English' }, { value: 'ar', label: 'العربية' }]}
          onChange={(v) => setTweak('lang', v)}
        />

        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakColor
          label="Header"
          value={t.navy}
          options={['#021c4d', '#001234', '#0d3d92', '#0a2342', '#1a1a2e']}
          onChange={(v) => setTweak('navy', v)}
        />

        <TweakSection label="Demo" />
        <TweakToggle
          label="Start at sign-in"
          value={t.showWelcome}
          onChange={(v) => { setTweak('showWelcome', v); setSignedIn(!v); }}
        />
      </TweaksPanel>
    </div>
  );
}

// ────── Mount inside iOS frame ──────
function Root() {
  // Auto-scale the device to fit the viewport
  const [scale, setScale] = uS(1);
  uE(() => {
    function update() {
      const padding = 32;
      const W = 402, H = 874;
      const sw = (window.innerWidth - padding) / W;
      const sh = (window.innerHeight - padding) / H;
      setScale(Math.min(1, sw, sh));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#eef0f5',
      overflow: 'hidden',
    }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <IOSDevice width={402} height={874}>
          <App />
        </IOSDevice>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
