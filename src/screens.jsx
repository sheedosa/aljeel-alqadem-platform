// Screens — Jeel Qadem mobile storefront
const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

// ─────────────────────────────────────────────────────────────
// SPLASH / LOGIN
// ─────────────────────────────────────────────────────────────
function SplashScreen({ onSignIn, t, lang }) {
  return (
    <div className="screen" style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(160deg, var(--navy-900) 0%, var(--navy-700) 100%)`,
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative shapes */}
      <div style={{ position: 'absolute', top: -120, insetInlineEnd: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,181,217,0.35) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: 220, insetInlineStart: -100, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,181,217,0.18) 0%, transparent 70%)' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        <img
          src="assets/jeel-qadem-login-transparent.png"
          alt="Jeel Qadem"
          style={{ width: 200, height: 'auto', display: 'block' }}
        />
        <h1 style={{
          fontSize: 36, fontWeight: 800, lineHeight: 1.05,
          margin: '40px 0 12px',
          letterSpacing: '-0.02em',
          textWrap: 'balance',
        }}>{t.welcome}</h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.4 }}>{t.signInSub}</p>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="input" placeholder={t.email}
            defaultValue="purchasing@almadina.ly"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }} />
          <input className="input" type="password" placeholder={t.password}
            defaultValue="••••••••"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }} />
          <button className="btn accent lg full" onClick={onSignIn} style={{ marginTop: 8 }}>
            {t.signIn}
            <Icon name="chev" size={18} color="#fff" stroke={2.4} />
          </button>
          <button style={{ marginTop: 4, padding: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t.forgot}</button>
        </div>
      </div>

      <div style={{
        padding: '24px 28px 56px',
        textAlign: 'center',
        fontSize: 13, color: 'rgba(255,255,255,0.65)',
        position: 'relative', zIndex: 1,
      }}>
        {t.noAccount} <span style={{ color: 'var(--cyan-400)', fontWeight: 700 }}>{t.register}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function HomeScreen({ onOpenProduct, onAdd, onOpenCart, onOpenCat, onOpenBrowse, t, lang, cartCount }) {
  // Refresh featured to skip food items now
  const featured = PRODUCTS.filter(p => p.tag === 'best' || p.tag === 'new').slice(0, 6);
  const deals = PRODUCTS.filter(p => p.tag === 'deal').slice(0, 6);

  return (
    <div className="screen" style={{
      height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: 100,
    }}>
      {/* ───── Hero header (taller, brand-statement zone) — scrolls with the page ───── */}
      <div style={{
        background: 'linear-gradient(180deg, var(--navy-900) 0%, var(--navy-800) 100%)',
        color: '#fff',
        paddingTop: 56, paddingBottom: 22, paddingInline: 16,
        borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
      }}>
        {/* Utility row: logo · credit pill · bell */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={36} dark />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'center', minWidth: 0 }}>
            <CreditPill label={t.creditLabel} value={t.creditValue} />
            <button onClick={onOpenCart} aria-label="Notifications" style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', flexShrink: 0,
            }}>
              <Icon name="bell" size={18} color="#fff" />
              <span style={{
                position: 'absolute', top: 6, insetInlineEnd: 6,
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--cyan-400)', border: '2px solid var(--navy-800)',
              }} />
            </button>
          </div>
        </div>

        {/* Hero headline */}
        <div style={{
          marginTop: 22,
          fontSize: 28, fontWeight: 800, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: '#fff', textWrap: 'balance',
        }}>{t.heroTitle}</div>

        {/* Search */}
        <div style={{ marginTop: 16 }}>
          <SearchBar value="" onChange={() => {}} placeholder={t.searchPh} onSubmit={onOpenBrowse} />
        </div>

        {/* Quick-action chips */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <QuickActionTile icon="grid" label={t.qaCategories} onClick={onOpenBrowse} />
          <QuickActionTile icon="tag"  label={t.qaBrands}     onClick={onOpenBrowse} />
          <QuickActionTile icon="spark" label={t.qaDeals}     onClick={onOpenBrowse} />
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        {/* ───── Hero promo carousel ───── */}
        <div style={{ padding: '0 16px' }}>
          <PromoCarousel slides={PROMOS} lang={lang} onSlideClick={onOpenBrowse} />
        </div>

        {/* ───── Special Offers (horizontal-scroll featured) ───── */}
        <div style={{ marginTop: 28 }}>
          <SectionHead title={t.specialOffers} action={{ label: t.seeAll, onClick: onOpenBrowse }} />
          <div style={{
            display: 'flex', gap: 12, overflowX: 'auto',
            padding: '12px 16px 4px', scrollSnapType: 'x mandatory',
          }}>
            {featured.map(p => (
              <div key={p.id} style={{ width: 220, flexShrink: 0, scrollSnapAlign: 'start' }}>
                <ProductCard product={p} lang={lang} t={t}
                  onClick={() => onOpenProduct(p.id)}
                  onAdd={() => onAdd(p, 1)} />
              </div>
            ))}
          </div>
        </div>

        {/* ───── Shop by category (4-col grid, tighter) ───── */}
        <div style={{ marginTop: 24 }}>
          <SectionHead title={t.shopByCat} action={{ label: t.seeAll, onClick: onOpenBrowse }} />
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6, padding: '10px 16px 0',
        }}>
          {CATEGORIES.map(cat => (
            <CategoryTile key={cat.id} cat={cat} lang={lang} onClick={() => onOpenCat(cat.id)} compact />
          ))}
        </div>

        {/* ───── Our Brands (moved back below Shop by category) ───── */}
        <div style={{ marginTop: 28 }}>
          <SectionHead title={t.ourBrands} action={{ label: t.seeAll, onClick: onOpenBrowse }} />
          <div style={{ padding: '12px 16px 0' }}>
            <BrandCarousel
              brands={[...BRANDS].reverse()}
              lang={lang}
              onPickBrand={() => onOpenBrowse()}
            />
          </div>
        </div>

        {/* ───── Volume Deals (existing horizontal scroll) ───── */}
        <div style={{ marginTop: 28 }}>
          <SectionHead title={t.deals} action={{ label: t.seeAll, onClick: onOpenBrowse }} />
          <div style={{
            display: 'flex', gap: 12, overflowX: 'auto',
            padding: '12px 16px 4px', scrollSnapType: 'x mandatory',
          }}>
            {deals.map(p => (
              <div key={p.id} style={{ width: 200, flexShrink: 0, scrollSnapAlign: 'start' }}>
                <ProductCard product={p} lang={lang} t={t}
                  onClick={() => onOpenProduct(p.id)}
                  onAdd={() => onAdd(p, 1)} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BROWSE / SEARCH
// ─────────────────────────────────────────────────────────────
function BrowseScreen({ initialCat, onOpenProduct, onAdd, t, lang }) {
  const [q, setQ] = useS('');
  const [cat, setCat] = useS(initialCat || 'all');
  const [sort, setSort] = useS('popular');

  useE(() => { if (initialCat) setCat(initialCat); }, [initialCat]);

  const filtered = useM(() => {
    let list = PRODUCTS;
    if (cat !== 'all') list = list.filter(p => p.cat === cat);
    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(p => p.en.toLowerCase().includes(ql) || p.ar.includes(q) || p.brand.toLowerCase().includes(ql));
    }
    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [q, cat, sort]);

  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        title={t.browse}
        sub={`${filtered.length} ${t.results}`}
        right={<IconButton name="filter" dark />}
      />
      <div style={{ padding: '0 16px 12px', background: 'var(--bg)' }}>
        <SearchBar value={q} onChange={setQ} placeholder={t.searchPh} autoFocus={false} />
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 12px', background: 'var(--bg)' }}>
        <button className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>{t.allCategories}</button>
        {CATEGORIES.map(c => (
          <button key={c.id} className={`chip ${cat === c.id ? 'active' : ''}`} onClick={() => setCat(c.id)}>
            {lang === 'ar' ? c.ar : c.en}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div style={{
        display: 'flex', gap: 8, padding: '0 16px 12px',
        background: 'var(--bg)', alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600 }}>{t.sortBy}:</span>
        {[
          { id: 'popular', label: t.popular },
          { id: 'priceAsc', label: t.priceAsc },
          { id: 'priceDesc', label: t.priceDesc },
        ].map(opt => (
          <button key={opt.id} className={`chip ${sort === opt.id ? 'tinted' : ''}`} onClick={() => setSort(opt.id)}
            style={sort === opt.id ? {} : { background: 'transparent', border: '1px solid var(--border-strong)' }}>
            {opt.label}
          </button>
        ))}
      </div>

      <div className="scroll-area">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12, padding: '8px 16px 32px',
        }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} lang={lang} t={t}
              onClick={() => onOpenProduct(p.id)}
              onAdd={() => onAdd(p, 1)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
            <Icon name="search" size={32} color="var(--ink-300)" />
            <div style={{ marginTop: 12, fontSize: 14 }}>No results</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRODUCT DETAIL
// ─────────────────────────────────────────────────────────────
function ProductDetailScreen({ productId, onBack, onAdd, onOpenCart, cartCount, t, lang }) {
  const product = findProduct(productId);
  const [qty, setQty] = useS(1);
  const currentPrice = tieredPriceFor(product, qty);
  const total = currentPrice * qty;
  const baseTotal = product.price * qty;
  const saved = baseTotal - total;
  const nt = nextTier(product, qty);

  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar
        left={<IconButton name="chev-l" onClick={onBack} ariaLabel="back" dark />}
        right={<IconButton name="bag" onClick={onOpenCart} badge={cartCount} dark />}
      />

      <div className="scroll-area" style={{ paddingBottom: 110 }}>
        {/* Hero image */}
        <div style={{ padding: '0 16px' }}>
          <ProductImage product={product} size="xl" lang={lang} />
        </div>

        {/* Info block */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{product.brand}</div>
          <h1 style={{
            fontSize: 24, fontWeight: 800, lineHeight: 1.2,
            margin: '6px 0 0', color: 'var(--ink-900)',
            letterSpacing: '-0.02em',
            textWrap: 'balance',
          }}>{lang === 'ar' ? product.ar : product.en}</h1>

          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {product.tag === 'best' && <span className="pill warn">{t.bestSeller}</span>}
            {product.tag === 'new' && <span className="pill info">{t.newTag}</span>}
            {product.tag === 'deal' && <span className="pill accent">{t.dealTag}</span>}
            <span className={`pill ${product.stock === 'low' ? 'danger' : 'success'}`}>
              {product.stock === 'low' ? t.lowStock : t.inStock}
            </span>
            <span className="pill neutral">
              <Icon name="truck" size={11} color="var(--ink-500)" stroke={2} />
              {t.deliverIn}
            </span>
          </div>
        </div>

        {/* Spec & current price block */}
        <div style={{ padding: '16px 16px 0' }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div className="tabular" style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, color: 'var(--ink-900)' }}>
                  {fmtLYD(currentPrice, lang)} <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-500)' }}>{t.currency}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>{t.perCase} · {product.pack}</div>
              </div>
              {saved > 0 && (
                <div style={{
                  background: 'var(--success-bg)', color: 'var(--success)',
                  padding: '6px 10px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                }}>
                  {t.youSave} <span className="tabular">{fmtLYD(saved, lang)}</span>
                </div>
              )}
            </div>

            <div className="divider" style={{ margin: '14px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{t.casePack}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)', marginTop: 4 }}>{product.pack}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{t.minOrder}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)', marginTop: 4 }} className="tabular">{product.moq} {t.casesAbbr}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier pricing */}
        <div style={{ padding: '12px 16px 0' }}>
          <TierPricingCard product={product} qty={qty} t={t} lang={lang} />
          {nt && (
            <div style={{
              marginTop: 8, padding: '10px 14px',
              borderRadius: 12, background: 'var(--accent-tint)',
              fontSize: 12.5, color: 'var(--accent-strong)', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name="spark" size={16} color="var(--accent-strong)" />
              <span style={{ textWrap: 'pretty' }}>
                {lang === 'ar'
                  ? `أضف ${nt.minQty - qty} كرتون لتوفير ${fmtLYD(nt.savePerCase, lang)} ${t.currency} لكل كرتون`
                  : `Add ${nt.minQty - qty} more case${nt.minQty - qty > 1 ? 's' : ''} to save ${fmtLYD(nt.savePerCase, lang)} ${t.currency}/case`
                }
              </span>
            </div>
          )}
        </div>

        {/* Quantity */}
        <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{lang === 'ar' ? 'الكمية' : 'Quantity'}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{lang === 'ar' ? 'كم كرتون؟' : 'How many cases?'}</div>
          </div>
          <QtyStepper qty={qty} onChange={setQty} size="lg" min={product.moq} />
        </div>

        {/* Description */}
        <div style={{ padding: '24px 16px 0' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: 'var(--ink-900)' }}>{t.description}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-500)', margin: 0, textWrap: 'pretty' }}>
            {lang === 'ar'
              ? `${product.brand} ${product.ar}. منتج جملة عالي الجودة معبأ ${product.pack}. مثالي لتجار التجزئة والمطاعم وأصحاب الأعمال في ليبيا. يتم التوصيل المباشر إلى متجرك أو مستودعك خلال 2-4 أيام عمل.`
              : `${product.brand} ${product.en} — premium wholesale stock, packed ${product.pack}. Ideal for retailers, restaurants, and businesses across Libya. Direct delivery to your shop or warehouse within 2–4 business days.`
            }
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 24px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        display: 'flex', gap: 10, alignItems: 'center',
        zIndex: 40,
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontSize: 10.5, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{t.total}</div>
          <div className="tabular" style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink-900)', lineHeight: 1 }}>
            {fmtLYD(total, lang)} <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>{t.currency}</span>
          </div>
        </div>
        <button className="btn accent" style={{ flex: 1, height: 52, borderRadius: 14 }} onClick={() => onAdd(product, qty)}>
          <Icon name="bag" size={18} color="#fff" stroke={2.2} />
          {t.addToBasket}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────────────────────
function CartScreen({ cart, onChangeQty, onRemove, onOpenProduct, onCheckout, onOpenBrowse, t, lang }) {
  const lines = cart.map(line => {
    const p = findProduct(line.pid);
    const unit = tieredPriceFor(p, line.qty);
    return { product: p, qty: line.qty, unit, total: unit * line.qty };
  });
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const vat = subtotal * 0.05; // mock 5%
  const grand = subtotal + vat;
  const empty = cart.length === 0;

  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        title={t.yourBasket}
        sub={empty ? '' : `${cart.length} ${cart.length === 1 ? t.item : t.items}`}
      />

      {empty ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="bag" size={36} color="var(--ink-300)" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 18, color: 'var(--ink-900)' }}>{t.empty}</div>
          <div style={{ fontSize: 14, color: 'var(--ink-500)', marginTop: 6, maxWidth: 240, textWrap: 'pretty' }}>{t.emptyHint}</div>
          <button className="btn primary" style={{ marginTop: 24 }} onClick={onOpenBrowse}>{t.browse}</button>
        </div>
      ) : (
        <>
          <div className="scroll-area" style={{ paddingBottom: 220 }}>
            {/* Line items */}
            <div style={{ padding: '8px 16px 0' }}>
              {lines.map(({ product, qty, unit, total }) => (
                <div key={product.id} className="card" style={{
                  padding: 12, display: 'flex', gap: 12, marginBottom: 10,
                }}>
                  <div style={{ width: 80, flexShrink: 0, cursor: 'pointer' }} onClick={() => onOpenProduct(product.id)}>
                    <ProductImage product={product} size="sm" lang={lang} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{product.brand}</div>
                    <div style={{
                      fontSize: 14, fontWeight: 600, color: 'var(--ink-900)',
                      lineHeight: 1.25, marginTop: 2,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{lang === 'ar' ? product.ar : product.en}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{product.pack}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <QtyStepper qty={qty} onChange={(q) => onChangeQty(product.id, q)} size="md" min={1} />
                      <div style={{ textAlign: 'end' }}>
                        <div className="tabular" style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-900)' }}>
                          {fmtLYD(total, lang)} <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-500)' }}>{t.currency}</span>
                        </div>
                        <div className="tabular" style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 1 }}>
                          {fmtLYD(unit, lang)} × {qty}
                        </div>
                      </div>
                    </div>
                    {unit < product.price && (
                      <div style={{ marginTop: 8, fontSize: 11.5, color: 'var(--success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="tag" size={12} color="var(--success)" stroke={2} />
                        {t.youSave} <span className="tabular">{fmtLYD((product.price - unit) * qty, lang)} {t.currency}</span>
                      </div>
                    )}
                  </div>
                  <button onClick={() => onRemove(product.id)} style={{ alignSelf: 'flex-start', color: 'var(--ink-400)', padding: 4 }} aria-label={t.remove}>
                    <Icon name="close" size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Delivery + payment */}
            <div style={{ padding: '12px 16px 0' }}>
              <div className="card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="location" size={18} color="var(--accent-strong)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{t.deliveryTo}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)', marginTop: 2 }}>{lang === 'ar' ? 'سوق المدينة، شارع الجمهورية، طرابلس' : 'Al Madina Market, Al-Jumhuriya St, Tripoli'}</div>
                  </div>
                  <Icon name="chev" size={16} color="var(--ink-400)" />
                </div>
                <div className="divider" style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="card" size={18} color="var(--ink-700)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{t.paymentMethod}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)', marginTop: 2 }}>{t.payOnDelivery}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div style={{ padding: '12px 16px 0' }}>
              <textarea className="input" placeholder={t.notePh} style={{ height: 64, padding: 12, resize: 'none' }} />
            </div>

            <div style={{ height: 12 }} />
          </div>

          {/* Sticky checkout */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border)',
            padding: '14px 16px 28px',
            zIndex: 40,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-500)', marginBottom: 4 }}>
              <span>{t.subtotal}</span>
              <span className="tabular">{fmtLYD(subtotal, lang)} {t.currency}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-500)', marginBottom: 4 }}>
              <span>{t.estVAT} (5%)</span>
              <span className="tabular">{fmtLYD(vat, lang)} {t.currency}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--success)', marginBottom: 10, fontWeight: 600 }}>
              <span>{t.deliveryFee}</span>
              <span>{t.free}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{t.total}</span>
              <span className="tabular" style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink-900)' }}>
                {fmtLYD(grand, lang)} <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-500)' }}>{t.currency}</span>
              </span>
            </div>
            <button className="btn accent lg full" onClick={onCheckout}>
              {t.placeOrder}
              <Icon name="chev" size={18} color="#fff" stroke={2.4} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ORDER PLACED (confirmation)
// ─────────────────────────────────────────────────────────────
function OrderPlacedScreen({ orderId, eta, onHome, onTrack, t, lang }) {
  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: 'var(--success-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: -8,
            borderRadius: '50%',
            border: '1px dashed var(--success)',
            opacity: 0.5,
            animation: 'screenIn .6s ease',
          }} />
          <Icon name="check" size={48} color="var(--success)" stroke={3} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '24px 0 8px', color: 'var(--ink-900)', letterSpacing: '-0.02em' }}>{t.orderPlaced}</h1>
        <p style={{ fontSize: 14.5, color: 'var(--ink-500)', margin: 0, lineHeight: 1.5, textWrap: 'pretty', maxWidth: 280 }}>{t.orderPlacedSub}</p>

        <div className="card" style={{ marginTop: 32, padding: 16, width: '100%', maxWidth: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>{t.orderRef}</span>
            <span className="tabular" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{orderId}</span>
          </div>
          <div className="divider" style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>{t.estDelivery}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{eta}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn accent lg full" onClick={onTrack}>{t.trackOrder}</button>
        <button className="btn ghost lg full" onClick={onHome}>{t.backToHome}</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ORDERS LIST
// ─────────────────────────────────────────────────────────────
function OrdersScreen({ orders, onOpenOrder, t, lang }) {
  const [filter, setFilter] = useS('all');
  const list = useM(() => {
    if (filter === 'open') return orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
    if (filter === 'delivered') return orders.filter(o => o.status === 'delivered');
    return orders;
  }, [filter, orders]);

  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t.allOrders} sub={`${list.length} ${list.length === 1 ? t.item : t.items}`} />

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, background: 'var(--bg)' }}>
        {[
          { id: 'all', label: t.filterAll },
          { id: 'open', label: t.filterOpen },
          { id: 'delivered', label: t.filterDelivered },
        ].map(f => (
          <button key={f.id} className={`chip ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="scroll-area">
        <div style={{ padding: '4px 16px 0' }}>
          {list.map(order => {
            const totalUnits = order.items.reduce((s, it) => s + it.qty, 0);
            const preview = order.items.slice(0, 4).map(it => findProduct(it.pid));
            return (
              <button key={order.id} onClick={() => onOpenOrder(order.id)}
                className="card" style={{ display: 'block', width: '100%', padding: 14, marginBottom: 10, textAlign: 'start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="tabular" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{order.id}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>
                      {order.placed} · {totalUnits} {t.casesAbbr}
                    </div>
                  </div>
                  <OrderStatusPill status={order.status} t={t} />
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  {preview.map((p, i) => (
                    <div key={i} style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden' }}>
                      <ProductImage product={p} size="sm" lang={lang} />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div style={{
                      width: 44, height: 44, borderRadius: 8,
                      background: 'var(--surface-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: 'var(--ink-500)',
                    }} className="tabular">+{order.items.length - 4}</div>
                  )}
                </div>
                <div className="divider" style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{t.total}</div>
                    <div className="tabular" style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink-900)' }}>
                      {fmtLYD(order.total, lang)} <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>{t.currency}</span>
                    </div>
                  </div>
                  <Icon name="chev" size={20} color="var(--ink-400)" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ORDER TRACKING (detail)
// ─────────────────────────────────────────────────────────────
function OrderTrackingScreen({ orderId, onBack, t, lang }) {
  const order = ORDERS.find(o => o.id === orderId) || ORDERS[0];
  const steps = [
    { id: 'received', label: t.status_received,  date: order.placed },
    { id: 'confirmed', label: t.status_confirmed, date: order.placed },
    { id: 'packed', label: t.status_packed,       date: order.status === 'delivered' || order.status === 'in_transit' ? '2026-05-13' : null },
    { id: 'intransit', label: t.status_intransit, date: order.status === 'delivered' || order.status === 'in_transit' ? '2026-05-14' : null },
    { id: 'delivered', label: t.status_delivered, date: order.status === 'delivered' ? order.eta : null },
  ];

  // determine progress
  const statusToIdx = { placed: 1, confirmed: 1, processing: 2, in_transit: 3, delivered: 4, cancelled: 0 };
  const activeIdx = statusToIdx[order.status] ?? 0;
  const lines = order.items.map(it => ({ product: findProduct(it.pid), qty: it.qty }));

  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar
        left={<IconButton name="chev-l" onClick={onBack} dark />}
        title={order.id}
        sub={order.placed}
        right={<IconButton name="chat" dark />}
      />
      <div className="scroll-area">
        {/* Status hero */}
        <div style={{ padding: '8px 16px 0' }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{order.status === 'delivered' ? t.delivered : t.expected}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink-900)', marginTop: 4, letterSpacing: '-0.01em' }}>
                  {order.eta}
                </div>
              </div>
              <OrderStatusPill status={order.status} t={t} />
            </div>
            <div className="divider" style={{ margin: '16px 0' }} />
            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {steps.map((s, i) => {
                const done = i < activeIdx;
                const active = i === activeIdx;
                return (
                  <div key={s.id} style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                      <div className={`timeline-dot ${done ? 'done' : ''} ${active ? 'active' : ''}`} />
                      {i < steps.length - 1 && <div className={`timeline-line ${done ? 'done' : ''}`} />}
                    </div>
                    <div style={{ paddingBottom: 14, flex: 1 }}>
                      <div style={{
                        fontSize: 14,
                        fontWeight: active ? 700 : 600,
                        color: done || active ? 'var(--ink-900)' : 'var(--ink-400)',
                      }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{s.date || (lang === 'ar' ? 'قيد الانتظار' : 'Pending')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={{ padding: '16px 16px 0' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>
            {order.items.length} {order.items.length === 1 ? t.item : t.items}
          </h3>
          <div className="card" style={{ padding: 4 }}>
            {lines.map((l, i) => (
              <div key={l.product.id} style={{
                display: 'flex', gap: 10, alignItems: 'center', padding: 10,
                borderBottom: i < lines.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <ProductImage product={l.product} size="sm" lang={lang} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{l.product.brand}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-900)', marginTop: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{lang === 'ar' ? l.product.ar : l.product.en}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{l.product.pack}</div>
                </div>
                <div className="tabular" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>×{l.qty}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ padding: 14, borderRadius: 12, background: 'var(--warn-bg)', borderInlineStart: '3px solid var(--warn)' }}>
              <div style={{ fontSize: 11, color: 'var(--warn)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{t.note}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-800)', marginTop: 4 }}>{order.notes}</div>
            </div>
          </div>
        )}

        {/* Total */}
        <div style={{ padding: '16px 16px 0' }}>
          <div className="card" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{t.total}</span>
            <span className="tabular" style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink-900)' }}>
              {fmtLYD(order.total, lang)} <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-500)' }}>{t.currency}</span>
            </span>
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', gap: 10 }}>
          <button className="btn ghost" style={{ flex: 1 }}>{t.help}</button>
          <button className="btn primary" style={{ flex: 1 }}>{t.reorderBtn}</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ACCOUNT
// ─────────────────────────────────────────────────────────────
function AccountScreen({ onSignOut, onToggleLang, lang, t }) {
  const creditUsed = 18420;
  const creditLimit = 50000;
  const pct = (creditUsed / creditLimit) * 100;
  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t.account} />

      <div className="scroll-area">
        {/* Business card */}
        <div style={{ padding: '0 16px' }}>
          <div style={{
            position: 'relative',
            padding: 18,
            borderRadius: 'var(--r-lg)',
            background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
            color: '#fff', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', insetInlineEnd: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,181,217,0.4) 0%, transparent 70%)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: '#fff', color: 'var(--navy-800)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 800,
              }}>AM</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{t.business}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{t.businessNo}</div>
              </div>
            </div>
            {/* Credit bar */}
            <div style={{ marginTop: 16, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                <span>{t.creditUsed}</span>
                <span><span className="tabular" style={{ color: '#fff', fontWeight: 700 }}>{fmtLYD(creditUsed, lang)}</span> {t.creditOf} <span className="tabular">{fmtLYD(creditLimit, lang)}</span> {t.currency}</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--cyan-400)', borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div style={{ padding: '20px 16px 0' }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            {[
              { icon: 'user', label: t.profileBiz },
              { icon: 'location', label: t.addresses },
              { icon: 'card', label: t.creditSettings },
              { icon: 'bell', label: t.notifs },
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 14px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={row.icon} size={18} color="var(--ink-700)" />
                </div>
                <div style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: 'var(--ink-900)' }}>{row.label}</div>
                <Icon name="chev" size={16} color="var(--ink-400)" />
              </div>
            ))}
          </div>
        </div>

        {/* Language + help */}
        <div style={{ padding: '12px 16px 0' }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            <button onClick={onToggleLang} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '14px 14px', textAlign: 'start',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="globe" size={18} color="var(--accent-strong)" />
              </div>
              <div style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: 'var(--ink-900)' }}>{lang === 'ar' ? 'English' : 'العربية'}</div>
              <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600 }}>{lang === 'ar' ? 'AR' : 'EN'} →</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="info" size={18} color="var(--ink-700)" />
              </div>
              <div style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: 'var(--ink-900)' }}>{t.help}</div>
              <Icon name="chev" size={16} color="var(--ink-400)" />
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div style={{ padding: '20px 16px 8px' }}>
          <button className="btn ghost full" onClick={onSignOut} style={{ color: 'var(--danger)' }}>{t.signOut}</button>
        </div>

        <div style={{ padding: '12px 16px', textAlign: 'center', fontSize: 11, color: 'var(--ink-400)' }}>
          {t.appName} · v1.0
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SplashScreen, HomeScreen, BrowseScreen, ProductDetailScreen,
  CartScreen, OrderPlacedScreen, OrdersScreen, OrderTrackingScreen, AccountScreen,
});
