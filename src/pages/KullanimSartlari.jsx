export default function KullanimSartlari() {
  return (
    <main className="pt-28 pb-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Kullanım Şartları</h1>
          <p className="text-slate-600 mt-3 max-w-3xl">
            Bu metin, QRKapi (QR KAPI) web sitesi ve hizmetlerinin kullanımına ilişkin şartları açıklar. Hizmeti
            kullanarak bu şartları kabul etmiş olursunuz.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">1) Tanımlar</h2>
            <p className="text-slate-600 mt-2">
              “Hizmet” QRKapi tarafından sunulan QR kapı geçiş sistemleri, web paneli ve ilgili yazılımları ifade eder.
              “Müşteri” hizmeti iş amaçlı kullanan kurum/işletmeyi, “Kullanıcı” ise müşteri adına sistemi kullanan kişiyi ifade eder.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">2) Hizmet kapsamı</h2>
            <ul className="mt-3 space-y-2 text-slate-600 list-disc pl-5">
              <li>QR kod ile giriş/çıkış kayıtlarının tutulması ve raporlanması</li>
              <li>Yetkilendirme ve kullanıcı yönetimi</li>
              <li>Demo, deneme ve ücretli paketlerin sunulması</li>
            </ul>
            <p className="text-slate-600 mt-3">
              Özellikler ve paket içerikleri zaman zaman güncellenebilir.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">3) Hesap ve güvenlik</h2>
            <ul className="mt-3 space-y-2 text-slate-600 list-disc pl-5">
              <li>Giriş bilgilerinizi gizli tutmak ve yetkisiz kullanım şüphesini derhal bildirmek sizin sorumluluğunuzdadır.</li>
              <li>Hizmete erişim yetkileri rol bazlı olmalı; paylaşımlı hesap kullanımı önerilmez.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">4) Kabul edilebilir kullanım</h2>
            <p className="text-slate-600 mt-2">
              Hizmet; hukuka aykırı, yanıltıcı, kötüye kullanım teşkil eden veya sistem güvenliğini riske atan amaçlarla kullanılamaz.
              Yetkisiz erişim denemeleri, tersine mühendislik ve hizmeti engelleme girişimleri yasaktır.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">5) Ödeme, paketler ve iptal</h2>
            <p className="text-slate-600 mt-2">
              Ücretli paketlerde fiyatlandırma, faturalandırma periyodu ve kapsam; teklif/abonelik sözleşmesi veya ilgili sayfada belirtilen şartlara tabidir.
              Deneme sürümleri süre ve özellik bakımından sınırlı olabilir.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">6) Fikri mülkiyet</h2>
            <p className="text-slate-600 mt-2">
              QRKapi’ye ait yazılım, arayüz, marka ve içerikler ilgili mevzuatla korunur. Yazılı izin olmadan kopyalama, çoğaltma,
              dağıtma veya ticari kullanıma konu edilmesi yasaktır.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">7) Sorumluluğun sınırlandırılması</h2>
            <p className="text-slate-600 mt-2">
              Hizmet, “olduğu gibi” sunulabilir. Yasal zorunluluklar saklı kalmak üzere; dolaylı zararlar, kâr kaybı veya veri kaybından
              doğan taleplerde sorumluluk, yürürlükteki mevzuatın izin verdiği ölçüde sınırlandırılabilir.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">8) Değişiklikler</h2>
            <p className="text-slate-600 mt-2">
              Bu şartlar zaman zaman güncellenebilir. Güncel metin web sitesinde yayımlandığı tarihten itibaren geçerlidir.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">9) İletişim</h2>
            <p className="text-slate-600 mt-2">
              Sorularınız için <a className="underline underline-offset-4" href="/iletisim">iletişim</a> sayfasını kullanabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
