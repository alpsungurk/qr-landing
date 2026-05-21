import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  Menu,
  X,
  Sparkles,
  ListOrdered,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Özellikler', hash: '#ozellikler', icon: Sparkles },
  { label: 'Nasıl Çalışır', hash: '#nasil-calisir', icon: ListOrdered },
  { label: 'Özet', hash: '#panel', icon: LayoutDashboard },
  { label: 'Güvenlik', hash: '#guvenlik', icon: ShieldCheck },
]

const menuIconClass =
  'bg-white text-slate-700 shadow-sm ring-slate-200/90 group-hover:text-slate-900 group-hover:ring-slate-300/90'

const panelSpring = { type: 'spring', stiffness: 380, damping: 36 }

function MobileSidebar({ open, onClose, goToHash, handleDemoClick }) {
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[120] bg-slate-900/45 backdrop-blur-md md:hidden"
            aria-label="Menüyü kapat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed top-0 right-0 z-[130] flex h-dvh w-[min(90vw,340px)] flex-col overflow-hidden rounded-l-[1.75rem] bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.1)] border-l border-slate-200/80 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={panelSpring}
          >
            <div className="relative flex items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 shrink-0 bg-white border-b border-slate-100">
              <img src="/qrkapi.png" alt="QRKapi" className="h-9 w-auto object-contain" />
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-slate-600 shadow-sm ring-1 ring-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all"
                aria-label="Menüyü kapat"
                onClick={onClose}
              >
                <X strokeWidth={2} className="w-5 h-5" />
              </button>
            </div>

            <nav className="relative flex-1 min-h-0 overflow-y-auto px-4 pb-4 bg-white">
              <p className="px-2 mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Menü
              </p>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map(({ label, hash, icon: Icon }, index) => (
                  <motion.li
                    key={hash}
                    initial={{ opacity: 1, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => goToHash(hash)}
                      className="group w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl text-left font-semibold bg-slate-100/95 hover:bg-slate-200/70 border border-slate-200/80 shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_4px_14px_rgba(15,23,42,0.09)] hover:border-slate-300/90 active:scale-[0.98] transition-all duration-200"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-200 ${menuIconClass}`}
                      >
                        <Icon strokeWidth={1.85} className="w-5 h-5" />
                      </span>
                      <span className="flex-1 text-[15px] tracking-tight text-slate-800">{label}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-200">
                        <ArrowRight strokeWidth={2.25} className="w-4 h-4" />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="relative shrink-0 p-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-100">
              <button
                type="button"
                onClick={handleDemoClick}
                className="w-full inline-flex items-center justify-center gap-2.5 text-[15px] font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-4 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
              >
                Demo Talep Et
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  <ArrowRight strokeWidth={2.25} className="w-4 h-4" />
                </span>
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-3">QR kapı geçiş sistemleri</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default function Navbar({ navScrolled, resetPage, onLogoClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  const handleLogoClick = (e) => {
    e.preventDefault()
    closeMobile()
    if (!isHome) navigate('/')
    onLogoClick?.()
  }

  const goToHash = (hash) => {
    closeMobile()
    if (isHome) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate('/')
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const handleDemoClick = (e) => {
    e?.preventDefault()
    closeMobile()
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
      return
    }
    document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 ${navScrolled ? 'bg-white/60 border-slate-200/80 shadow-sm' : 'bg-white/50 border-slate-100/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={handleLogoClick} className="flex items-center cursor-pointer" aria-label="Ana sayfaya dön">
              <img src="/qrkapi.png" alt="QR KAPI" className="h-9 sm:h-11 w-auto object-contain" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                {NAV_ITEMS.map(({ label, hash }) => (
                  <a
                    key={hash}
                    href={hash}
                    className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)]"
                  >
                    {label}
                  </a>
                ))}
              </>
            ) : (
              <>
                {NAV_ITEMS.map(({ label, hash }) => (
                  <Link
                    key={hash}
                    to={`/${hash}`}
                    className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </>
            )}
          </div>
          <div className="hidden md:flex items-center">
            {isHome ? (
              <a href="#demo-form" className="inline-flex items-center justify-center text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg transition-colors shadow-sm">Demo Talep Et</a>
            ) : (
              <Link to="/#demo-form" onClick={handleDemoClick} className="inline-flex items-center justify-center text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg transition-colors shadow-sm">Demo Talep Et</Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X strokeWidth={1.5} className="w-6 h-6" /> : <Menu strokeWidth={1.5} className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileSidebar
        open={mobileOpen}
        onClose={closeMobile}
        goToHash={goToHash}
        handleDemoClick={handleDemoClick}
      />
    </nav>
  )
}
