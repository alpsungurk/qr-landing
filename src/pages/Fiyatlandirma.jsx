import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Gift, Minus, Plus, Users, LifeBuoy, Phone } from 'lucide-react'
import {
  FIRST_YEAR_SUPPORT_FREE,
  MAX_SLIDER_USERS,
  MAX_USERS_INPUT,
  PRICE_TIERS,
  SUPPORT_RATE,
  VAT_RATE,
  calculatePrice,
  formatTRY,
  getTier,
} from '../config/pricing'

function tierRangeLabel(tier) {
  if (tier.maxUsers === null) return `${tier.minUsers - 1}'den fazla`
  if (tier.minUsers === tier.maxUsers) return `${tier.minUsers} kullanıcı`
  return `${tier.minUsers}–${tier.maxUsers} kullanıcı`
}

function Row({ label, value, muted = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
      <span className={`text-sm ${muted ? 'text-slate-500' : 'text-slate-600'}`}>{label}</span>
      <span className="text-sm font-semibold text-slate-900 tabular-nums text-right">{value}</span>
    </div>
  )
}

export default function Fiyatlandirma() {
  const navigate = useNavigate()
  const [rawUsers, setRawUsers] = useState('10')
  const [includeVat, setIncludeVat] = useState(false)

  useEffect(() => {
    const previous = document.title
    document.title = 'Fiyatlandırma | QRKapi — Kullanıcı Başı QR Kapı Geçiş Sistemi'
    window.scrollTo({ top: 0 })
    return () => {
      document.title = previous
    }
  }, [])

  const parsed = rawUsers === '' ? NaN : Number(rawUsers)
  const users = Number.isFinite(parsed) ? Math.floor(parsed) : NaN
  const result = calculatePrice(users, { includeVat })
  const activeTier = getTier(users)

  const setUsers = (next) => {
    const n = Math.min(MAX_USERS_INPUT, Math.max(1, Math.floor(next)))
    setRawUsers(String(n))
  }

  const handleInput = (e) => {
    const digits = e.target.value.replace(/\D/g, '').replace(/^0+/, '')
    if (digits === '') return setRawUsers('')
    setRawUsers(String(Math.min(MAX_USERS_INPUT, Number(digits))))
  }

  const goToContact = () => navigate('/iletisim')
  const goToDemo = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const sliderValue = Number.isFinite(users) ? Math.min(Math.max(users, 1), MAX_SLIDER_USERS) : 1
  const sliderPct = ((sliderValue - 1) / (MAX_SLIDER_USERS - 1)) * 100

  return (
    <main>
      {/* Üst başlık */}
      <section
        className="pt-28 sm:pt-32 pb-14 relative overflow-hidden"
        style={{
          background: [
            'radial-gradient(ellipse 100% 80% at 85% 20%, rgba(147, 197, 253, 0.5), transparent 55%)',
            'radial-gradient(ellipse 90% 70% at 10% 80%, rgba(96, 165, 250, 0.3), transparent 50%)',
            'linear-gradient(180deg, #eff6ff 0%, #dbeafe 60%, #ffffff 100%)',
          ].join(', '),
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Fiyatlandırma</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Kullandığınız kadar öde, <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text">sürpriz yok</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Kullanıcı sayınızı girin, ödeyeceğiniz tutarı anında görün. Kullanıcı sayısı arttıkça kullanıcı başı fiyat düşer.
          </p>
        </div>
      </section>

      {/* Hesaplayıcı */}
      <section className="bg-white pt-4 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Sol: girişler */}
          <div className="min-w-0 lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <label htmlFor="user-count" className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
                <Users strokeWidth={1.75} className="w-5 h-5 text-blue-600" />
                Kaç kullanıcı (personel) olacak?
              </label>

              <div className="mt-5 flex items-stretch gap-3">
                <button
                  type="button"
                  aria-label="Kullanıcı sayısını azalt"
                  onClick={() => setUsers((Number.isFinite(users) ? users : 1) - 1)}
                  disabled={Number.isFinite(users) && users <= 1}
                  className="w-12 shrink-0 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center"
                >
                  <Minus strokeWidth={2} className="w-5 h-5" />
                </button>
                <input
                  id="user-count"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={rawUsers}
                  onChange={handleInput}
                  placeholder="0"
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-center font-display text-3xl font-bold text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  aria-label="Kullanıcı sayısını artır"
                  onClick={() => setUsers((Number.isFinite(users) ? users : 0) + 1)}
                  className="w-12 shrink-0 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-95 transition flex items-center justify-center"
                >
                  <Plus strokeWidth={2} className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6">
                <input
                  type="range"
                  min={1}
                  max={MAX_SLIDER_USERS}
                  step={1}
                  value={sliderValue}
                  onChange={(e) => setUsers(Number(e.target.value))}
                  aria-label="Kullanıcı sayısı kaydırıcısı"
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${sliderPct}%, #e2e8f0 ${sliderPct}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 tabular-nums">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100+</span>
                </div>
              </div>

              {/* KDV seçeneği */}
              <div className="mt-8 flex items-center justify-between gap-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">+ KDV (%{VAT_RATE}) ekle</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {includeVat ? 'Tutarlar KDV dahil gösteriliyor.' : 'Tutarlar KDV hariç gösteriliyor.'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeVat}
                  aria-label="KDV ekle"
                  onClick={() => setIncludeVat((v) => !v)}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${includeVat ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${includeVat ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Kademeler */}
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900 mb-3">Kullanıcı başı aylık fiyat</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRICE_TIERS.map((tier) => {
                  const active = activeTier?.id === tier.id
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setUsers(tier.minUsers)}
                      aria-pressed={active}
                      className={`text-left rounded-xl border p-4 transition-all ${
                        active
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <p className="text-xs font-semibold text-slate-500">{tierRangeLabel(tier)}</p>
                      {tier.unitPrice === null ? (
                        <p className="mt-2 font-display text-base font-bold text-slate-900 leading-tight">İletişime geçin</p>
                      ) : (
                        <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
                          {formatTRY(tier.unitPrice)}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {tier.unitPrice === null ? 'size özel teklif' : 'kullanıcı / ay'}
                      </p>
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Kullanıcı sayınız hangi kademeye düşüyorsa tüm kullanıcılar o kademenin fiyatından hesaplanır. Fiyatlara KDV dahil değildir.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
              <LifeBuoy strokeWidth={1.75} className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Yıllık bakım ve destek: yıllık lisans bedelinin %{SUPPORT_RATE}'u <span className="font-normal text-slate-500">(+ KDV)</span>
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Güncellemeler, bakım ve teknik destek bu kalemde yer alır.
                </p>
                {FIRST_YEAR_SUPPORT_FREE && (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Gift strokeWidth={2} className="w-3.5 h-3.5" />
                    Kampanya: İlk yıl bakım ve destek ücretsiz (0 ₺)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sağ: özet */}
          <aside className="min-w-0 lg:col-span-2 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">Tahmini ödeme</p>
                <p className="text-sm text-slate-300 mt-1">
                  {Number.isFinite(users) && users > 0 ? (
                    <>
                      {users.toLocaleString('tr-TR')} kullanıcı
                      {activeTier && <> · {activeTier.label}</>}
                    </>
                  ) : (
                    'Kullanıcı sayısı girin'
                  )}
                </p>
              </div>

              <div className="px-6 py-5" aria-live="polite">
                {!result && (
                  <p className="py-8 text-center text-sm text-slate-500">
                    Fiyatı görmek için en az 1 kullanıcı girin.
                  </p>
                )}

                {result?.contactRequired && (
                  <div className="py-4 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                      <Phone strokeWidth={1.75} className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-display text-xl font-bold text-slate-900">Size özel teklif hazırlayalım</p>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      100 kullanıcının üzerindeki kurulumlar için fiyatlandırma işletmenize göre belirlenir. Bizimle iletişime geçin.
                    </p>
                    <button
                      type="button"
                      onClick={goToContact}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-3.5 rounded-xl transition-colors shadow-sm"
                    >
                      İletişime geç
                      <ArrowRight strokeWidth={2} className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {result && !result.contactRequired && (
                  <>
                    <Row label="Kullanıcı başı (aylık)" value={formatTRY(result.unitPrice)} muted />
                    <Row label={`Aylık lisans (${result.users.toLocaleString('tr-TR')} × ${formatTRY(result.unitPrice)})`} value={formatTRY(result.monthlyLicense)} />
                    <Row label="Yıllık lisans (12 ay)" value={formatTRY(result.annualLicense)} />
                    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-slate-100">
                      <span className="text-sm text-slate-600">
                        Yıllık bakım & destek
                        <span className="block text-xs text-slate-400">lisans bedelinin %{SUPPORT_RATE}'u</span>
                      </span>
                      <span className="text-right tabular-nums">
                        {result.campaignActive ? (
                          <>
                            <span className="block text-xs text-slate-400 line-through">{formatTRY(result.supportFeeStandard)}</span>
                            <span className="block text-sm font-semibold text-emerald-600">{formatTRY(0)}</span>
                            <span className="mt-0.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">İlk yıl ücretsiz</span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-slate-900">{formatTRY(result.supportFee)}</span>
                        )}
                      </span>
                    </div>
                    {includeVat ? (
                      <>
                        <Row label="Ara toplam (KDV hariç)" value={formatTRY(result.annualSubtotal)} muted />
                        <Row label={`KDV (%${VAT_RATE})`} value={formatTRY(result.vat)} muted />
                      </>
                    ) : null}

                    <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-4">
                      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                        {result.campaignActive ? 'İlk yıl toplam' : 'Yıllık toplam'} {includeVat ? '(KDV dahil)' : '(+ KDV)'}
                      </p>
                      <p className="mt-1 font-display text-4xl font-bold text-slate-900 tabular-nums break-words">
                        {formatTRY(result.annualTotal)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 tabular-nums">
                        Aylık ortalama {formatTRY(result.monthlyEquivalent)}
                        {includeVat ? ' (KDV dahil)' : ' (+ KDV)'}
                      </p>
                    </div>

                    {result.campaignActive && (
                      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-xs font-semibold text-slate-700">2. yıldan itibaren yıllık</p>
                        <p className="mt-0.5 font-display text-xl font-bold text-slate-900 tabular-nums">
                          {formatTRY(result.renewalTotal)}{' '}
                          <span className="text-xs font-medium text-slate-500">{includeVat ? '(KDV dahil)' : '(+ KDV)'}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1 tabular-nums">
                          Lisans {formatTRY(result.annualLicense)} + bakım & destek {formatTRY(result.supportFeeStandard)}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={goToDemo}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-3.5 rounded-xl transition-colors shadow-sm active:scale-[0.99]"
                    >
                      Demo / teklif talep et
                      <ArrowRight strokeWidth={2} className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              <ul className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 space-y-2">
                {['Dinamik QR kod ile güvenli giriş-çıkış', 'Web panel ve mobil uygulama (Android & iOS)', 'Yıllık bakım ve teknik destek'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check strokeWidth={2.25} className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-slate-500 mt-4 px-1 leading-relaxed">
              Hesaplanan tutar bilgi amaçlıdır. Kesin teklif için{' '}
              <Link to="/iletisim" className="font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-600">
                bizimle iletişime geçin
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}
