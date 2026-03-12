import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Navbar({ navScrolled, resetPage }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 ${navScrolled ? 'bg-white/60 border-slate-200/80 shadow-sm' : 'bg-white/50 border-slate-100/80'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={resetPage} className="flex items-center cursor-pointer" aria-label="Ana sayfaya dön">
              <img src="/qrkapi.png" alt="QR KAPI" className="h-10 sm:h-11 w-auto object-contain" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                <a href="#ozellikler" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)]">Özellikler</a>
                <a href="#nasil-calisir" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)]">Nasıl Çalışır</a>
                <a href="#guvenlik" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)]">Güvenlik</a>
                <a href="#panel" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)]">Özet</a>
              </>
            ) : (
              <>
                <Link to="/#ozellikler" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">Özellikler</Link>
                <Link to="/#nasil-calisir" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">Nasıl Çalışır</Link>
                <Link to="/#guvenlik" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">Güvenlik</Link>
                <Link to="/#panel" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">Özet</Link>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/#demo-form" className="inline-flex items-center justify-center text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg transition-colors shadow-sm">Demo Talep Et</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-slate-500 hover:text-slate-900" type="button" aria-label="Menü">
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
