import { useNavigate } from 'react-router-dom'

export default function Iletisim() {
  const navigate = useNavigate()

  const goToDemoForm = (e) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <main className="pt-28 pb-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">İletişim</h1>
          <p className="text-slate-600 mt-3 max-w-2xl">
            QR KAPI hakkında soru, demo talebi veya teklif için bize yazın. En kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">E-posta</h2>
            <p className="text-slate-600 mt-2">
              Genel iletişim ve teklif talepleri:
            </p>
            <a
              className="mt-4 inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
              href="mailto:ilkyatirimgrupostim@ilkyatirimgrup.com.tr"
            >
              ilkyatirimgrupostim@ilkyatirimgrup.com.tr
            </a>
            <p className="text-xs text-slate-500 mt-3">
              Not: E-postanızda işletme adı, personel sayısı ve kullanım senaryonuzu yazmanız süreci hızlandırır.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-900">Demo / Teklif</h2>
            <p className="text-slate-600 mt-2">
              En hızlı yol: ana sayfadaki demo formunu doldurun.
            </p>
            <a
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800 transition-colors"
              href="/#demo-form"
              onClick={goToDemoForm}
            >
              Demo formuna git
            </a>
            <p className="text-xs text-slate-500 mt-3">
              Form ulaşmazsa e-posta ile iletişime geçebilirsiniz.
            </p>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-slate-900">Destek</h2>
          <p className="text-slate-600 mt-2">
            Mevcut müşterilerimiz panel üzerinden destek kaydı açabilir veya e-posta ile destek alabilir.
          </p>
        </section>
      </div>
    </main>
  )
}
