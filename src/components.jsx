// Shared components — Jeel Qadem mobile

const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Brand mark — Jeel Qadem Q monogram on navy
// ─────────────────────────────────────────────────────────────
function Logo({ size = 32, dark = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.22,
      background: 'var(--navy-800)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, overflow: 'hidden',
      boxShadow: dark ? '0 0 0 1px rgba(255,255,255,0.10)' : '0 1px 2px rgba(0,0,0,0.10)',
    }}>
      <img src="assets/jq-mono-white.png" alt="Jeel Qadem"
           style={{ width: size * 0.62, height: size * 0.78, objectFit: 'contain', display: 'block' }} />
    </div>
  );
}

// Full horizontal lockup with the wordmark image
function FullLogo({ dark = false, height = 64 }) {
  return (
    <img src="assets/jeel-qadem-logo.jpg" alt="Jeel Qadem"
         style={{
           height, width: 'auto', display: 'block',
           borderRadius: 6,
         }} />
  );
}

// ─────────────────────────────────────────────────────────────
// Icon library — line icons, consistent stroke
// ─────────────────────────────────────────────────────────────
function Icon({ name, size = 22, color = 'currentColor', stroke = 1.8 }) {
  const p = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path {...p} d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z"/></>,
    'home-fill': <><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" fill={color}/></>,
    search: <><circle {...p} cx="11" cy="11" r="7"/><path {...p} d="M20 20l-3.5-3.5"/></>,
    grid: <><rect {...p} x="3" y="3" width="7" height="7" rx="1.5"/><rect {...p} x="14" y="3" width="7" height="7" rx="1.5"/><rect {...p} x="3" y="14" width="7" height="7" rx="1.5"/><rect {...p} x="14" y="14" width="7" height="7" rx="1.5"/></>,
    'grid-fill': <><rect x="3" y="3" width="7" height="7" rx="1.5" fill={color}/><rect x="14" y="3" width="7" height="7" rx="1.5" fill={color}/><rect x="3" y="14" width="7" height="7" rx="1.5" fill={color}/><rect x="14" y="14" width="7" height="7" rx="1.5" fill={color}/></>,
    bag: <><path {...p} d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 8z"/><path {...p} d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    'bag-fill': <><path fill={color} d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 8z"/><path {...p} d="M9 8V6a3 3 0 0 1 6 0v2" stroke="#fff"/></>,
    box: <><path {...p} d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path {...p} d="M3 8l9 5 9-5M12 13v8"/></>,
    'box-fill': <><path fill={color} d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path stroke="#fff" {...p} fill="none" d="M3 8l9 5 9-5M12 13v8"/></>,
    user: <><circle {...p} cx="12" cy="8" r="4"/><path {...p} d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    'user-fill': <><circle fill={color} cx="12" cy="8" r="4"/><path fill={color} d="M4 21c0-4 4-7 8-7s8 3 8 7z"/></>,
    chev: <><path {...p} d="M9 6l6 6-6 6"/></>,
    'chev-l': <><path {...p} d="M15 6l-6 6 6 6"/></>,
    'chev-d': <><path {...p} d="M6 9l6 6 6-6"/></>,
    plus: <><path {...p} d="M12 5v14M5 12h14"/></>,
    minus: <><path {...p} d="M5 12h14"/></>,
    close: <><path {...p} d="M6 6l12 12M18 6L6 18"/></>,
    filter: <><path {...p} d="M3 6h18M6 12h12M10 18h4"/></>,
    star: <><path {...p} d="M12 3l2.6 6 6.4.6-4.8 4.4 1.4 6.4L12 17l-5.6 3.4 1.4-6.4L3 9.6 9.4 9z"/></>,
    truck: <><rect {...p} x="2" y="6" width="13" height="10" rx="1.5"/><path {...p} d="M15 9h4l3 3v4h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></>,
    check: <><path {...p} d="M5 13l4 4 10-10"/></>,
    'check-c': <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M8 12l3 3 5-5"/></>,
    bell: <><path {...p} d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2zM10 21a2 2 0 0 0 4 0"/></>,
    tag: <><path {...p} d="M3 11V4h7l11 11-7 7L3 11z"/><circle fill={color} cx="7.5" cy="7.5" r="1.5"/></>,
    package: <><path {...p} d="M21 8.4l-9 5-9-5M12 13.4V22M21 8.4v8.5L12 22 3 16.9V8.4l9-5 9 5z"/></>,
    location: <><path {...p} d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle {...p} cx="12" cy="9" r="2.5"/></>,
    card: <><rect {...p} x="3" y="6" width="18" height="13" rx="2"/><path {...p} d="M3 11h18M7 16h3"/></>,
    spark: <><path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></>,
    repeat: <><path {...p} d="M3 12a9 9 0 0 1 16-5l2-2v6h-6l2-2a7 7 0 1 0-12 7"/></>,
    chat: <><path {...p} d="M21 12a8 8 0 1 1-3-6.2V3l3 3-1.5 1.5M21 16a8 8 0 0 1-13 6L4 21l1-4"/></>,
    globe: <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></>,
    info: <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 11v6M12 7.5v.5"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Product "image" — two-tone swatch with brand text
// ─────────────────────────────────────────────────────────────
function ProductImage({ product, size = 'md', lang = 'en' }) {
  // sizes
  const sizes = {
    sm: { h: 56,  fs: 9,  pad: 4 },
    md: { h: 132, fs: 12, pad: 8 },
    lg: { h: 240, fs: 16, pad: 14 },
    xl: { h: 320, fs: 18, pad: 18 },
  };
  const s = sizes[size] || sizes.md;
  const name = lang === 'ar' ? product.ar : product.en;
  return (
    <div
      className="swatch"
      style={{
        width: '100%', height: s.h,
        background: `linear-gradient(135deg, ${product.sw2} 0%, ${product.sw1} 100%)`,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', alignItems: 'flex-start',
        padding: s.pad,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: s.fs - 1,
          fontWeight: 800,
          color: 'var(--ink-900)',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}>{product.brand}</div>
      </div>
      {/* Subtle product silhouette using initial letter */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -55%)',
        fontSize: s.h * 0.42,
        fontWeight: 900,
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '-0.05em',
        fontFamily: 'var(--font-en)',
        lineHeight: 1,
        pointerEvents: 'none',
      }}>{product.brand[0]}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Category tile — color-tinted square
// ─────────────────────────────────────────────────────────────
function CategoryTile({ cat, lang, onClick, compact = false }) {
  const label = lang === 'ar' ? cat.ar : cat.en;
  // Mobile-accessory category icons — bolder & illustrative
  const catIcon = (name, color) => {
    const p = { fill: 'none', stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
    const o = {
      charger: (
        <>
          <path {...p} d="M8 4h8a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1z"/>
          <path {...p} d="M10 4V2M14 4V2"/>
          <path {...p} d="M11 11h2v3l-1.5 3-1-3v-3z" fill={color} fillOpacity=".25"/>
        </>
      ),
      cable: (
        <>
          <rect {...p} x="4" y="8" width="5" height="8" rx="1"/>
          <path {...p} d="M9 12h3a4 4 0 0 1 4 4v0a4 4 0 0 0 4 4"/>
          <path {...p} d="M6 8V6M7 8V6"/>
          <circle {...p} cx="20" cy="20" r="1.5" fill={color}/>
        </>
      ),
      powerbank: (
        <>
          <rect {...p} x="5" y="3" width="14" height="18" rx="2.5"/>
          <path {...p} d="M9 8h6M9 13h6M9 17h3"/>
          <path d="M14 8l-3 5h2l-1 4 3-5h-2l1-4z" fill={color}/>
        </>
      ),
      headphone: (
        <>
          <path {...p} d="M4 14v-2a8 8 0 0 1 16 0v2"/>
          <rect {...p} x="3" y="13" width="4" height="7" rx="1.5"/>
          <rect {...p} x="17" y="13" width="4" height="7" rx="1.5"/>
        </>
      ),
      case: (
        <>
          <rect {...p} x="7" y="2" width="10" height="20" rx="2.5"/>
          <circle {...p} cx="12" cy="19" r="0.8" fill={color}/>
          <rect x="10" y="5" width="3" height="3" rx="0.6" fill={color} fillOpacity=".4"/>
          <circle cx="15" cy="6.2" r="0.8" fill={color}/>
        </>
      ),
      screen: (
        <>
          <rect {...p} x="6" y="2" width="12" height="20" rx="2"/>
          <path {...p} d="M9 6l3 3 3-3M9 18h6" opacity=".5"/>
          <path d="M16 2l4 3-2 1 2 1-3 2 1 2-3-1 1 3-3-1" fill={color} fillOpacity=".3" stroke="none"/>
        </>
      ),
      car: (
        <>
          <path {...p} d="M3 14h18l-2-5a2 2 0 0 0-2-1.5H7a2 2 0 0 0-2 1.5l-2 5z"/>
          <path {...p} d="M3 14v4h2v-2M21 14v4h-2v-2"/>
          <circle {...p} cx="7" cy="17" r="1.8" fill={color}/>
          <circle {...p} cx="17" cy="17" r="1.8" fill={color}/>
        </>
      ),
      watch: (
        <>
          <rect {...p} x="6" y="6" width="12" height="12" rx="3.5"/>
          <path {...p} d="M9 6V3h6v3M9 18v3h6v-3"/>
          <path {...p} d="M12 10v3l2 1"/>
        </>
      ),
    };
    return o[name] || null;
  };
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: compact ? 'row' : 'column',
      alignItems: 'center', gap: compact ? 10 : 8,
      padding: compact ? '10px 14px' : '14px 8px 12px',
      background: cat.tint,
      borderRadius: 'var(--r-md)',
      width: '100%',
      textAlign: compact ? 'start' : 'center',
      border: '1px solid rgba(255,255,255,0.5)',
    }}>
      <div style={{
        width: compact ? 38 : 48, height: compact ? 38 : 48,
        borderRadius: compact ? 11 : 14,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}>
        <svg width={compact ? 22 : 26} height={compact ? 22 : 26} viewBox="0 0 24 24">{catIcon(cat.icon, cat.ink)}</svg>
      </div>
      <div style={{ flex: compact ? 1 : 'unset', minWidth: 0, width: '100%' }}>
        <div style={{ fontSize: compact ? 14 : 12.5, fontWeight: 700, color: cat.ink, lineHeight: 1.2, textAlign: compact ? 'start' : 'center', textWrap: 'balance' }}>
          {label}
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Product card — grid item
// ─────────────────────────────────────────────────────────────
function ProductCard({ product, lang, onClick, onAdd, t }) {
  const tag = product.tag;
  const tagLabel = tag === 'best' ? t.bestSeller : tag === 'new' ? t.newTag : tag === 'deal' ? t.dealTag : null;
  const tagClass = tag === 'best' ? 'warn' : tag === 'new' ? 'info' : tag === 'deal' ? 'accent' : 'neutral';
  return (
    <div className="card" onClick={onClick} style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
      <ProductImage product={product} size="md" lang={lang} />
      {tag && (
        <div style={{ position: 'absolute', top: 8, insetInlineStart: 8 }}>
          <span className={`pill ${tagClass}`}>{tagLabel}</span>
        </div>
      )}
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{product.brand}</div>
        <div style={{
          fontSize: 14, fontWeight: 600, color: 'var(--ink-900)',
          marginTop: 2, minHeight: 36,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          textWrap: 'pretty',
        }}>{lang === 'ar' ? product.ar : product.en}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>{product.pack}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10, gap: 6 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink-900)', lineHeight: 1, whiteSpace: 'nowrap' }} className="tabular">
              {fmtLYD(product.price, lang)}<span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)', marginInlineStart: 4 }}>{t.currency}</span>
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 3, whiteSpace: 'nowrap' }}>{t.perCase}</div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAdd && onAdd(product); }} style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'var(--ink-900)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name="plus" size={18} color="#fff" stroke={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Qty stepper — pill with +/-
// ─────────────────────────────────────────────────────────────
function QtyStepper({ qty, onChange, min = 1, max = 999, size = 'md' }) {
  const dec = () => onChange(Math.max(min, qty - 1));
  const inc = () => onChange(Math.min(max, qty + 1));
  const sizes = { md: { h: 36, fs: 15, btn: 32 }, lg: { h: 48, fs: 17, btn: 44 } };
  const s = sizes[size];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: 'var(--surface)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--r-pill)',
      height: s.h, padding: 2,
    }}>
      <button onClick={dec} style={{
        width: s.btn, height: s.btn, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: qty <= min ? 'var(--ink-300)' : 'var(--ink-900)',
      }}>
        <Icon name="minus" size={16} stroke={2.4} />
      </button>
      <div className="qty-input tabular" style={{
        minWidth: 32, textAlign: 'center', fontSize: s.fs, fontWeight: 700,
      }}>{qty}</div>
      <button onClick={inc} style={{
        width: s.btn, height: s.btn, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink-900)',
      }}>
        <Icon name="plus" size={16} stroke={2.4} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tier pricing — the hero B2B feature
// ─────────────────────────────────────────────────────────────
function TierPricingCard({ product, qty, t, lang }) {
  const tiers = [
    { from: 1, to: product.tiers[0][0] - 1, price: product.price },
    ...product.tiers.map((tier, i) => {
      const next = product.tiers[i + 1];
      return { from: tier[0], to: next ? next[0] - 1 : null, price: tier[1] };
    }),
  ];
  const activeIdx = tiers.findIndex(tr => qty >= tr.from && (tr.to == null || qty <= tr.to));
  return (
    <div className="card" style={{ padding: 16, background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'var(--accent-tint)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="tag" size={16} color="var(--accent-strong)" />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{t.pricing}</div>
        <div style={{ marginInlineStart: 'auto', fontSize: 12, color: 'var(--ink-500)' }}>{t.saveVol}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {tiers.map((tr, i) => {
          const active = i === activeIdx;
          const savePct = Math.round(((product.price - tr.price) / product.price) * 100);
          return (
            <div key={i} style={{
              flex: 1, padding: '12px 8px',
              borderRadius: 'var(--r-sm)',
              background: active ? 'var(--navy-800)' : 'var(--surface-2)',
              color: active ? '#fff' : 'var(--ink-900)',
              border: active ? '1px solid var(--navy-800)' : '1px solid transparent',
              transition: 'all .15s',
              textAlign: 'center',
              position: 'relative',
            }}>
              {savePct > 0 && (
                <div style={{
                  position: 'absolute', top: -7, insetInlineEnd: 6,
                  background: 'var(--accent)', color: '#fff',
                  fontSize: 9.5, fontWeight: 800,
                  padding: '2px 6px', borderRadius: 999,
                  letterSpacing: '0.02em',
                }}>−{savePct}%</div>
              )}
              <div style={{ fontSize: 10.5, fontWeight: 700, opacity: active ? 0.7 : 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {tr.to ? `${tr.from}–${tr.to}` : `${tr.from}+`} {t.casesAbbr}
              </div>
              <div className="tabular" style={{ fontSize: 16, fontWeight: 800, marginTop: 4, lineHeight: 1 }}>
                {fmtLYD(tr.price, lang)}
              </div>
              <div style={{ fontSize: 9.5, opacity: 0.6, marginTop: 2 }}>{t.currency}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar — used inside screens (custom, not iOS nav)
// Has a dark (brand-purple) variant for sub-screens
// ─────────────────────────────────────────────────────────────
function TopBar({ left, title, right, sub, dark = true }) {
  const styles = dark ? {
    background: 'linear-gradient(180deg, var(--navy-900) 0%, var(--navy-800) 100%)',
    color: '#fff',
    titleColor: '#fff',
    subColor: 'rgba(255,255,255,0.65)',
  } : {
    background: 'var(--bg)',
    color: 'var(--ink-900)',
    titleColor: 'var(--ink-900)',
    subColor: 'var(--ink-500)',
  };
  return (
    <div style={{
      paddingTop: 56, paddingBottom: 16, paddingInline: 16,
      display: 'flex', alignItems: 'center', gap: 12,
      background: styles.background,
      position: 'relative', zIndex: 5,
      marginBottom: dark ? 8 : 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{left}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 17, fontWeight: 700, color: styles.titleColor, lineHeight: 1.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>{title}</div>}
        {sub && <div style={{ fontSize: 12, color: styles.subColor, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{right}</div>
    </div>
  );
}

function IconButton({ name, onClick, badge, ariaLabel, dark = false }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel} style={{
      width: 40, height: 40, borderRadius: '50%',
      background: dark ? 'rgba(255,255,255,0.12)' : 'var(--surface)',
      border: dark ? '1px solid rgba(255,255,255,0.18)' : '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <Icon name={name} size={20} color={dark ? '#fff' : 'var(--ink-900)'} />
      {badge != null && badge > 0 && (
        <span style={{
          position: 'absolute', top: -2, insetInlineEnd: -2,
          minWidth: 18, height: 18, padding: '0 5px',
          background: 'var(--accent)', color: '#fff',
          fontSize: 10, fontWeight: 800,
          borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: dark ? '2px solid var(--navy-800)' : '2px solid var(--bg)',
        }} className="tabular">{badge}</span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom tab bar
// ─────────────────────────────────────────────────────────────
function BottomTabs({ active, onTab, cartCount, t }) {
  const tabs = [
    { id: 'home',    icon: 'home',  label: t.home },
    { id: 'browse',  icon: 'grid',  label: t.browse },
    { id: 'cart',    icon: 'bag',   label: t.cart, badge: cartCount },
    { id: 'orders',  icon: 'box',   label: t.orders },
    { id: 'account', icon: 'user',  label: t.account },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '1px solid var(--border)',
      paddingTop: 6, paddingBottom: 28, paddingInline: 8,
      display: 'flex',
      zIndex: 50,
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <button key={tab.id} onClick={() => onTab(tab.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 4px', borderRadius: 12,
            color: isActive ? 'var(--navy-800)' : 'var(--ink-400)',
            position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              <Icon name={isActive ? `${tab.icon}-fill` : tab.icon} size={24} color={isActive ? 'var(--navy-800)' : 'var(--ink-400)'} />
              {tab.badge > 0 && (
                <span style={{
                  position: 'absolute', top: -4, insetInlineEnd: -8,
                  minWidth: 16, height: 16, padding: '0 4px',
                  background: 'var(--accent)', color: '#fff',
                  fontSize: 9.5, fontWeight: 800,
                  borderRadius: 999,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                }} className="tabular">{tab.badge}</span>
              )}
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '-0.01em' }}>{tab.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Search bar (used in headers)
// ─────────────────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder, onSubmit, autoFocus }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      height: 44, padding: '0 14px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-pill)',
    }}>
      <Icon name="search" size={18} color="var(--ink-400)" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit && onSubmit()}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 14, color: 'var(--ink-900)',
        }}
      />
      {value && (
        <button onClick={() => onChange('')} style={{ display: 'flex' }}>
          <Icon name="close" size={16} color="var(--ink-400)" />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────
function SectionHead({ title, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '0 16px', gap: 12,
    }}>
      <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: 'var(--ink-900)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{title}</h3>
      {action && <button style={{ fontSize: 13, color: 'var(--accent-strong)', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }} onClick={action.onClick}>{action.label}</button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Status pill mapping for orders
// ─────────────────────────────────────────────────────────────
function OrderStatusPill({ status, t }) {
  const map = {
    placed:     { cls: 'neutral', label: t.placed },
    confirmed:  { cls: 'info',    label: t.confirmed },
    processing: { cls: 'info',    label: t.processing },
    in_transit: { cls: 'warn',    label: t.inTransit },
    delivered:  { cls: 'success', label: t.delivered },
    cancelled:  { cls: 'danger',  label: t.cancelled },
  };
  const m = map[status] || map.placed;
  return <span className={`pill ${m.cls}`}>{m.label}</span>;
}

// ─────────────────────────────────────────────────────────────
// Brand carousel — auto-rotating slideshow of brand logos
// ─────────────────────────────────────────────────────────────
function BrandTile({ brand, lang, onClick, height = 150 }) {
  const tagline = lang === 'ar' ? brand.tag.ar : brand.tag.en;
  return (
    <button onClick={onClick} style={{
      position: 'relative',
      width: '100%', height,
      borderRadius: 'var(--r-lg)',
      background: brand.bg,
      color: brand.fg,
      overflow: 'hidden',
      textAlign: 'start',
      display: 'block',
      boxShadow: '0 8px 24px rgba(11,24,39,.10)',
    }}>
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', insetInlineEnd: -30, top: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', insetInlineEnd: 60, bottom: -50, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ position: 'relative', height: '100%', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: 11, fontWeight: 800,
              color: brand.fg, opacity: 0.75,
              letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>{lang === 'ar' ? 'علامة' : 'Brand'}</div>
            <div style={{
              fontSize: 24, fontWeight: 800, marginTop: 4,
              letterSpacing: '-0.01em', lineHeight: 1.05,
              color: brand.fg,
            }}>{brand.name}</div>
            <div style={{
              fontSize: 12.5, marginTop: 6,
              color: brand.fg, opacity: 0.8,
              maxWidth: 200, textWrap: 'pretty',
            }}>{tagline}</div>
          </div>

          {/* logo / mark */}
          {brand.logo ? (
            <div style={{
              width: 80, height: 80, borderRadius: 16,
              background: brand.id === 'ldnio' ? '#fff' : 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              padding: 10,
              overflow: 'hidden',
            }}>
              <img src={brand.logo} alt={brand.name} style={{
                width: '100%', height: '100%', objectFit: 'contain',
                display: 'block',
              }} />
            </div>
          ) : (
            <div style={{
              width: 80, height: 80, borderRadius: 16,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              fontSize: 38, fontWeight: 900,
              color: brand.fg,
              letterSpacing: '-0.03em',
            }}>{brand.mark}</div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: 11.5, fontWeight: 700,
            color: brand.fg, opacity: 0.7,
          }} className="tabular">
            {brand.count} {lang === 'ar' ? 'منتج' : 'products'}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 12px', borderRadius: 999,
            background: brand.id === 'ldnio' ? brand.accent : 'rgba(255,255,255,0.18)',
            color: brand.id === 'ldnio' ? '#fff' : brand.fg,
            fontSize: 12, fontWeight: 700,
          }}>
            {lang === 'ar' ? 'تسوّق' : 'Shop'}
            <Icon name={lang === 'ar' ? 'chev-l' : 'chev'} size={14} color={brand.id === 'ldnio' ? '#fff' : brand.fg} stroke={2.4} />
          </span>
        </div>
      </div>
    </button>
  );
}

function BrandCarousel({ brands, lang, onPickBrand, autoplayMs = 4000 }) {
  const [i, setI] = useState(0);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!autoplayMs) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setI(prev => (prev + 1) % brands.length);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [brands.length, autoplayMs]);

  // Touch / drag swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0, dx = 0, isDown = false;
    const down = (e) => {
      isDown = true;
      startX = (e.touches?.[0]?.clientX) ?? e.clientX;
      dx = 0;
      pausedRef.current = true;
    };
    const move = (e) => {
      if (!isDown) return;
      const x = (e.touches?.[0]?.clientX) ?? e.clientX;
      dx = x - startX;
    };
    const up = () => {
      if (!isDown) return;
      isDown = false;
      pausedRef.current = false;
      if (Math.abs(dx) > 40) {
        const dir = dx > 0 ? -1 : 1;
        setI(prev => (prev + dir + brands.length) % brands.length);
      }
    };
    el.addEventListener('touchstart', down, { passive: true });
    el.addEventListener('touchmove', move, { passive: true });
    el.addEventListener('touchend', up);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('touchstart', down);
      el.removeEventListener('touchmove', move);
      el.removeEventListener('touchend', up);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [brands.length]);

  // Account for RTL (reverse perceived direction)
  const isRTL = lang === 'ar';
  // Track is N×100% wide; each card is 100/N% of track. To show card i,
  // translate the track by i * (100/N)%, signed by direction.
  const step = 100 / brands.length;
  const offset = isRTL ? `${i * step}%` : `-${i * step}%`;

  return (
    <div style={{ width: '100%' }}>
      <div ref={trackRef} style={{
        position: 'relative', width: '100%', overflow: 'hidden',
        borderRadius: 'var(--r-lg)',
        touchAction: 'pan-y',
        cursor: 'grab',
      }}>
        <div style={{
          display: 'flex', width: `${brands.length * 100}%`,
          transform: `translateX(${offset})`,
          transition: 'transform .5s cubic-bezier(.32,.72,.27,1)',
        }}>
          {brands.map(brand => (
            <div key={brand.id} style={{ width: `${100 / brands.length}%`, padding: '0 1px' }}>
              <BrandTile brand={brand} lang={lang} onClick={() => onPickBrand?.(brand)} />
            </div>
          ))}
        </div>
      </div>
      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
        {brands.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Brand ${idx + 1}`} style={{
            width: idx === i ? 18 : 6, height: 6,
            borderRadius: 999,
            background: idx === i ? 'var(--navy-800)' : 'var(--ink-300)',
            transition: 'width .3s ease, background .3s ease',
            padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  Logo, FullLogo, Icon, ProductImage, CategoryTile, ProductCard, QtyStepper,
  TierPricingCard, TopBar, IconButton, BottomTabs, SearchBar, SectionHead,
  OrderStatusPill, BrandCarousel, BrandTile,
});
