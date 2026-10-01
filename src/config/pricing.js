// QRKapi fiyatlandırma ayarları — fiyatları değiştirmek için sadece bu dosyayı düzenleyin.

// Kullanıcı başı AYLIK fiyat (TL, KDV hariç). Kademeler "toplam kullanıcı sayısına göre":
// kullanıcı sayısı hangi kademeye düşüyorsa TÜM kullanıcılar o kademenin fiyatından hesaplanır.
// maxUsers: kademenin üst sınırı (dahil). Son kademe (null) = üstü için iletişim.
export const PRICE_TIERS = [
  { id: 'baslangic', label: 'Başlangıç', minUsers: 1, maxUsers: 10, unitPrice: 45 },
  { id: 'standart', label: 'Standart', minUsers: 11, maxUsers: 50, unitPrice: 40 },
  { id: 'profesyonel', label: 'Profesyonel', minUsers: 51, maxUsers: 100, unitPrice: 35 },
  { id: 'kurumsal', label: 'Kurumsal', minUsers: 101, maxUsers: null, unitPrice: null },
]

// Yıllık bakım + destek ücreti: yıllık lisans bedelinin (KDV hariç) yüzdesi
export const SUPPORT_RATE = 10

// Kampanya: ilk yıl bakım + destek ücreti alınmaz (0 TL). Kapatmak için false yapın.
export const FIRST_YEAR_SUPPORT_FREE = true

// KDV oranı (%)
export const VAT_RATE = 20

export const MAX_SLIDER_USERS = 100
export const MAX_USERS_INPUT = 100000

export function getTier(users) {
  if (!Number.isFinite(users) || users < 1) return null
  return PRICE_TIERS.find((t) => t.maxUsers === null || users <= t.maxUsers) ?? null
}

// Kullanıcı sayısına göre tüm tutarları hesaplar. Geçersiz giriş → null.
// Kurumsal kademede (100+) fiyat verilmez → { contactRequired: true }.
export function calculatePrice(users, { includeVat = false } = {}) {
  const count = Math.floor(Number(users))
  const tier = getTier(count)
  if (!tier) return null
  if (tier.unitPrice === null) return { users: count, tier, contactRequired: true }

  const monthlyLicense = count * tier.unitPrice
  const annualLicense = monthlyLicense * 12

  // Normal (kampanyasız) bakım + destek: yıllık lisansın %10'u
  const supportFeeStandard = (annualLicense * SUPPORT_RATE) / 100
  // İlk yıl: kampanya açıksa 0 TL
  const supportFee = FIRST_YEAR_SUPPORT_FREE ? 0 : supportFeeStandard

  const withVat = (subtotal) => {
    const vat = includeVat ? (subtotal * VAT_RATE) / 100 : 0
    return { subtotal, vat, total: subtotal + vat }
  }

  // İlk yıl
  const first = withVat(annualLicense + supportFee)
  // 2. yıl ve sonrası (bakım + destek normal fiyatından)
  const renewal = withVat(annualLicense + supportFeeStandard)

  return {
    users: count,
    tier,
    contactRequired: false,
    unitPrice: tier.unitPrice,
    monthlyLicense,
    annualLicense,
    supportFeeStandard,
    supportFee,
    campaignActive: FIRST_YEAR_SUPPORT_FREE,
    annualSubtotal: first.subtotal,
    vat: first.vat,
    annualTotal: first.total,
    // KDV dahil/hariç seçimine göre aylık karşılık (bilgi amaçlı)
    monthlyEquivalent: first.total / 12,
    renewalSubtotal: renewal.subtotal,
    renewalVat: renewal.vat,
    renewalTotal: renewal.total,
  }
}

const tryOptions = { style: 'currency', currency: 'TRY' }
const tryInteger = new Intl.NumberFormat('tr-TR', { ...tryOptions, minimumFractionDigits: 0, maximumFractionDigits: 0 })
const tryDecimal = new Intl.NumberFormat('tr-TR', { ...tryOptions, minimumFractionDigits: 2, maximumFractionDigits: 2 })

// Tam sayıysa ₺1.540, kuruşlu ise ₺712,80
export const formatTRY = (value) => (Number.isInteger(value) ? tryInteger : tryDecimal).format(value)
