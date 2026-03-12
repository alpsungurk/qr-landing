export default function GizlilikPolitikasi() {
  return (
    <main className="pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-6">Gizlilik Politikası</h1>
        <p className="text-slate-600 mb-4">
          QR KAPI olarak kişisel verilerinizin güvenliği bizim için önceliklidir. Bu politika, hizmetlerimizi kullanırken toplanan bilgilerin nasıl işlendiğini açıklar.
        </p>
        <h2 className="font-display text-xl font-semibold text-slate-800 mt-8 mb-2">Toplanan Veriler</h2>
        <p className="text-slate-600 mb-4">
          Giriş kayıtları, cihaz bilgileri ve kullanım verileri yalnızca hizmetin sunulması ve güvenliğin sağlanması amacıyla işlenir.
        </p>
        <h2 className="font-display text-xl font-semibold text-slate-800 mt-8 mb-2">Verilerin Kullanımı</h2>
        <p className="text-slate-600 mb-4">
          Toplanan veriler yalnızca belirtilen amaçlarla kullanılır; üçüncü taraflarla paylaşılmaz ve yasal saklama süreleri dışında tutulmaz.
        </p>
        <h2 className="font-display text-xl font-semibold text-slate-800 mt-8 mb-2">Haklarınız</h2>
        <p className="text-slate-600 mb-4">
          KVKK kapsamında verilerinize erişim, düzeltme ve silme talebinde bulunma hakkınız vardır. Talepleriniz için iletişim sayfamızı kullanabilirsiniz.
        </p>
        <p className="text-slate-500 text-sm mt-8">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
      </div>
    </main>
  )
}
