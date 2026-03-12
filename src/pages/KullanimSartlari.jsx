export default function KullanimSartlari() {
  return (
    <main className="pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-6">Kullanım Şartları</h1>
        <p className="text-slate-600 mb-4">
          QR KAPI hizmetlerini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Lütfen bu metni dikkatle okuyun.
        </p>
        <h2 className="font-display text-xl font-semibold text-slate-800 mt-8 mb-2">Hizmet Kapsamı</h2>
        <p className="text-slate-600 mb-4">
          QR KAPI, personel giriş ve takip çözümleri sunar. Hizmete erişim, abonelik ve kullanım koşullarına tabidir.
        </p>
        <h2 className="font-display text-xl font-semibold text-slate-800 mt-8 mb-2">Kullanıcı Yükümlülükleri</h2>
        <p className="text-slate-600 mb-4">
          Sistemi yalnızca meşru amaçlarla kullanmalı, erişim bilgilerinizi üçüncü kişilerle paylaşmamalı ve platformu kötüye kullanmaktan kaçınmalısınız.
        </p>
        <h2 className="font-display text-xl font-semibold text-slate-800 mt-8 mb-2">Fikri Mülkiyet</h2>
        <p className="text-slate-600 mb-4">
          QR KAPI’ya ait yazılım, arayüz ve markalar korunmaktadır. İzinsiz kopyalama veya kullanım yasaktır.
        </p>
        <p className="text-slate-500 text-sm mt-8">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
      </div>
    </main>
  )
}
