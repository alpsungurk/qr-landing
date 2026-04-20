export default function GizlilikPolitikasi() {
  return (
    <main className="pt-28 pb-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Gizlilik Politikası</h1>
          <p className="text-slate-600 mt-3 max-w-3xl">
            Bu politika, QRKapi (QR KAPI) hizmetlerini kullanırken toplanan verilerin hangi amaçlarla işlendiğini, nasıl korunduğunu
            ve haklarınızı açıklar.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">1) Toplanan veriler</h2>
            <ul className="mt-3 space-y-2 text-slate-600 list-disc pl-5">
              <li>Kimlik ve iletişim bilgileri (demo/teklif taleplerinde ilettiğiniz bilgiler)</li>
              <li>Giriş-çıkış kayıtları (tarih/saat, kullanıcı/rol, terminal bilgisi gibi operasyonel kayıtlar)</li>
              <li>Cihaz ve kullanım verileri (oturum, tarayıcı/cihaz türü, hata kayıtları gibi teknik veriler)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">2) İşleme amaçları</h2>
            <ul className="mt-3 space-y-2 text-slate-600 list-disc pl-5">
              <li>Hizmetin sunulması, işletilmesi ve geliştirilmesi</li>
              <li>Güvenliğin sağlanması, yetkilendirme ve kötüye kullanımın önlenmesi</li>
              <li>Destek süreçlerinin yürütülmesi ve taleplerin yanıtlanması</li>
              <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">3) Paylaşım ve üçüncü taraflar</h2>
            <p className="text-slate-600 mt-2">
              Veriler; hizmetin sağlanması için gerekli olan altyapı sağlayıcılarıyla (barındırma, e-posta, analiz gibi) sınırlı şekilde
              paylaşılabilir. Yalnızca işin gerektirdiği ölçüde ve uygun güvenlik önlemleriyle işlem yapılır.
              Yasal zorunluluklar dışında veriler, izniniz olmadan üçüncü taraflara satılmaz.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">4) Saklama süreleri</h2>
            <p className="text-slate-600 mt-2">
              Veriler; işleme amaçları için gerekli süre boyunca ve ilgili mevzuatta öngörülen süreler kapsamında saklanır.
              Saklama süresi dolduğunda silme, yok etme veya anonimleştirme uygulanır.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">5) Güvenlik</h2>
            <p className="text-slate-600 mt-2">
              Verilerin gizliliğini ve bütünlüğünü korumak için teknik ve idari tedbirler uygulanır. Buna erişim kontrolleri,
              yetkilendirme, iz kayıtları ve güvenlik izleme uygulamaları dahil olabilir.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">6) Haklarınız</h2>
            <p className="text-slate-600 mt-2">
              KVKK kapsamında; verilerinize erişim, düzeltilmesini isteme, silinmesini/yok edilmesini talep etme, işleme itiraz etme
              ve diğer yasal haklara sahipsiniz. Başvuru için <a className="underline underline-offset-4" href="/iletisim">iletişim</a> sayfasını kullanabilirsiniz.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">7) Değişiklikler</h2>
            <p className="text-slate-600 mt-2">
              Bu politika zaman zaman güncellenebilir. Güncel metin web sitesinde yayımlandığı tarihten itibaren geçerlidir.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
