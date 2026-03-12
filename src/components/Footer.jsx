import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src="/qrkapi.png" alt="QR KAPI" className="h-8 w-auto object-contain" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center md:justify-center gap-8 md:gap-10">
          <Link to="/gizlilik-politikasi" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-tight">Gizlilik Politikası</Link>
          <Link to="/kullanim-sartlari" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-tight">Kullanım Şartları</Link>
          <Link to="/iletisim" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-tight">İletişim</Link>
        </div>
        <div className="text-sm font-medium text-slate-400">
          &copy; {new Date().getFullYear()} QR KAPI. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
