/**
 * Yasal metinlerde kullanılan şirket ve politika sabitleri.
 * Güncelleme: üç yasal sayfa (Gizlilik, KVKK, Kullanım Koşulları) bu dosyayı kullanır.
 * crossBorderTransfer: Supabase proje bölgesi netleşince güncellenmelidir.
 */
export const LEGAL = {
  lastUpdated: '19 Haziran 2026',
  companyName: 'İlk Yatırım Grup Turizm A.Ş.',
  address: 'Ehlibeyt Mahallesi, Tekstilciler Caddesi No:15/10, Balgat, Çankaya/Ankara',
  mersisNo: '0271006322400018',
  kvkkEmail: 'ilkyatirimgrupostim@ilkyatirimgrup.com.tr',
  kvkkAddress: 'Ehlibeyt Mahallesi, Tekstilciler Caddesi No:15/10, Balgat, Çankaya/Ankara',
  kepAddress: null,
  supportContact: 'ilkyatirimgrupostim@ilkyatirimgrup.com.tr',
  dataRetention: {
    qrLogs: '1 yıl',
    sessionLogs: '1 yıl',
    leaveRecords: '1 yıl',
  },
  crossBorderTransfer:
    'Yukarıdaki sağlayıcıların sunucuları yurt içinde veya yurt dışında bulunabilir. Supabase proje bölgesi netleşince bu bölüm güncellenmelidir. Yurt dışı aktarım söz konusuysa, KVKK m.9 kapsamında yeterli korumaya sahip ülkeye veya Kurul tarafından onaylanan standart sözleşme hükümleriyle aktarım yapılmaktadır.',
  jurisdictionCity: 'Ankara',
}

export const DATA_CATEGORIES = [
  {
    category: 'Kimlik ve iletişim',
    scope: 'Hesap sahibinin temel bilgileri',
    examples: 'Ad-soyad, kurumsal e-posta, telefon numarası',
  },
  {
    category: 'Yetkilendirme ve organizasyon',
    scope: 'Hesap rolü ve kurum içi konum',
    examples: 'Rol (yönetici, müdür, personel), departman ataması',
  },
  {
    category: 'Konum verisi',
    scope: 'Departman/giriş noktası için tanımlanan coğrafi konum ve geofence yarıçapı; mobil/tarayıcı izinleri verildiğinde cihaz konumu',
    examples: 'Enlem/boylam, yarıçap (metre)',
  },
  {
    category: 'QR erişim kayıtları',
    scope: 'Her giriş/çıkış işlemine ait kayıt',
    examples: 'QR token, kayıt türü (giriş/çıkış), zaman damgası, QR değişiklik geçmişi',
  },
  {
    category: 'Oturum ve güvenlik logları',
    scope: 'Hesaba giriş/çıkışla ilgili teknik kayıtlar',
    examples: 'IP adresi, tarayıcı kimliği (user-agent), platform (web/mobil), oturum başlangıç ve bitiş zamanı, kimlik doğrulama belirteci',
  },
  {
    category: 'İK/operasyon verisi',
    scope: 'İzin ve çalışma süresi yönetimi',
    examples: 'İzin başlangıç/bitiş tarihi, açıklama, hesaplanan çalışma süresi',
  },
  {
    category: 'Tercih/onay verisi',
    scope: 'Yasal metin onayı',
    examples: 'Tarayıcıda saklanan onay durumu (yerel depolama)',
  },
]

export const THIRD_PARTY_PROCESSORS = [
  {
    name: 'Supabase',
    role: 'Veritabanı, kimlik doğrulama (Auth), oturum yönetimi',
    data: 'Tüm uygulama verisi, kimlik bilgileri, oturum belirteçleri',
  },
  {
    name: 'Sentry',
    role: 'Hata/performans izleme, oturum tekrar oynatma (session replay)',
    data: 'Hata kayıtları, teknik performans verisi; oturum tekrarında etkileşim verisi (kişisel veri maskeleme etkin olmalıdır)',
  },
  {
    name: 'Vercel Analytics',
    role: 'Kullanım/trafik analitiği',
    data: 'Sayfa görüntüleme, anonim/agregasyona dayalı kullanım verisi',
  },
  {
    name: 'OpenStreetMap / Leaflet (tile sağlayıcı)',
    role: 'Harita görselleştirme',
    data: 'Harita karoları yüklenirken tarayıcı IP\'si tile sunucusuna ulaşabilir',
  },
]

export const PROCESSING_PURPOSES = [
  'Hesabınızla web paneline güvenli erişimin sağlanması ve kimlik doğrulama',
  'QR ile giriş/çıkış (geçiş) süreçlerinin yürütülmesi, kayıt altına alınması, raporlanması ve denetlenebilirliğinin sağlanması',
  'Geofencing ile bildirilen konumun, tanımlı departman/giriş noktası sınırları içinde olup olmadığının doğrulanması',
  'Harita ve operasyon ekranlarında departman/konum bilgisinin gösterilmesi',
  'Kurum içi yetki, rol ve departman yönetimi',
  'İzin taleplerinin ve çalışma süresi hesaplamalarının yönetilmesi',
  'Hizmetin güvenliğinin sağlanması, hata/performans izleme ve kötüye kullanımın önlenmesi',
  'Yasal yükümlülüklerin yerine getirilmesi ve meşru menfaatlerin korunması',
]

export const KVKK_RIGHTS = [
  'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
  'İşlenmişse buna ilişkin bilgi talep etme',
  'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
  'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
  'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
  'KVKK\'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme',
  'Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme',
  'Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
  'Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme',
]
