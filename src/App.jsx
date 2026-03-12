import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowRight,
  PlayCircle,
  RefreshCcw,
  Camera,
  Users,
  Tablet,
  Database,
  History,
  FileText,
  Calendar,
  ShieldCheck,
  Clock,
  MapPin,
  Server,
  CheckCircle2,
  Volume2,
  VolumeX,
  CalendarCheck,
  Settings,
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GizlilikPolitikasi from './pages/GizlilikPolitikasi'
import KullanimSartlari from './pages/KullanimSartlari'
import Iletisim from './pages/Iletisim'

const viewport = { once: false, margin: '-60px' }

const LOADING_DURATION_MS = 5000

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const [qrShowInfo, setQrShowInfo] = useState(false)
  // Android ayrı state
  const [qrHoveringAndroid, setQrHoveringAndroid] = useState(false)
  const [qrProgressAndroid, setQrProgressAndroid] = useState(0)
  const [qrScannedAndroid, setQrScannedAndroid] = useState(false)
  // iOS ayrı state
  const [qrHoveringIOS, setQrHoveringIOS] = useState(false)
  const [qrProgressIOS, setQrProgressIOS] = useState(0)
  const [qrScannedIOS, setQrScannedIOS] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const videoSectionRef = useRef(null)
  const videoRef = useRef(null)

  const scanDurationMs = 1200
  useEffect(() => {
    if (!qrHoveringAndroid) return
    const start = performance.now()
    let rafId
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(100, (elapsed / scanDurationMs) * 100)
      setQrProgressAndroid(progress)
      if (progress >= 100) {
        setQrScannedAndroid(true)
        setQrHoveringAndroid(false)
        return
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [qrHoveringAndroid])

  useEffect(() => {
    if (!qrHoveringAndroid && !qrScannedAndroid) setQrProgressAndroid(0)
  }, [qrHoveringAndroid, qrScannedAndroid])

  useEffect(() => {
    if (!qrHoveringIOS) return
    const start = performance.now()
    let rafId
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(100, (elapsed / scanDurationMs) * 100)
      setQrProgressIOS(progress)
      if (progress >= 100) {
        setQrScannedIOS(true)
        setQrHoveringIOS(false)
        return
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [qrHoveringIOS])

  useEffect(() => {
    if (!qrHoveringIOS && !qrScannedIOS) setQrProgressIOS(0)
  }, [qrHoveringIOS, qrScannedIOS])

  // Bilgi paneli sadece taranan cihaz tamamlanınca açılsın
  useEffect(() => {
    if (!qrScannedAndroid && !qrScannedIOS) return
    const t = setTimeout(() => setQrShowInfo(true), 520)
    return () => clearTimeout(t)
  }, [qrScannedAndroid, qrScannedIOS])

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Video: viewport'a girince otomatik oynat (sessiz)
  useEffect(() => {
    const el = videoSectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setVideoPlaying(entry.isIntersecting)
      },
      { threshold: 0.25, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!videoPlaying || !videoRef.current) return
    const v = videoRef.current
    v.muted = true
    v.play().catch(() => {})
  }, [videoPlaying])

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.muted = videoMuted
  }, [videoMuted])

  // Nav logo: sayfayı ilk haline getir (scroll + state sıfırla)
  const resetPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setQrScannedAndroid(false)
    setQrScannedIOS(false)
    setQrShowInfo(false)
    setQrProgressAndroid(0)
    setQrProgressIOS(0)
    setVideoPlaying(false)
    setVideoMuted(true)
  }

  // Loading: 5 sn sonra kapat ve reset
  useEffect(() => {
    if (!showLoading) return
    const t = setTimeout(() => {
      setShowLoading(false)
      resetPage()
    }, LOADING_DURATION_MS)
    return () => clearTimeout(t)
  }, [showLoading])

  return (
    <BrowserRouter>
      <div className="bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        {showLoading && (
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 px-6 bg-[#eef0f7]"
          >
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80">
                <img src="/qrkapicon2.png" alt="QR" className="w-full h-full object-contain" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
                <div className="scanner-line" />
              </div>
            </motion.div>
            <motion.p
              className="text-slate-600 font-medium text-lg tracking-wide animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Yükleniyor
            </motion.p>
          </div>
        )}
        {!showLoading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="min-h-full"
          >
            <Navbar navScrolled={navScrolled} resetPage={resetPage} onLogoClick={() => setShowLoading(true)} />
            <Routes>
          <Route path="/" element={
            <>
      {/* Hero Section — mavi reflection (özellikler ile aynı ton) + hafif animasyon */}
      <section
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[80vh]"
        style={{
          background: [
            'radial-gradient(ellipse 100% 80% at 85% 20%, rgba(147, 197, 253, 0.5), transparent 55%)',
            'radial-gradient(ellipse 90% 70% at 10% 80%, rgba(96, 165, 250, 0.35), transparent 50%)',
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(191, 219, 254, 0.4), transparent 60%)',
            'linear-gradient(180deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 70%, #93c5fd 100%)',
          ].join(', '),
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_30%,rgba(147,197,253,0.25),transparent_50%)] pointer-events-none hero-bg-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_70%,rgba(191,219,254,0.3),transparent_50%)] pointer-events-none hero-bg-glow hero-bg-glow-delay" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="max-w-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                hidden: {},
              }}
            >
              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.08]">
                QR ile güvenli giriş, <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text">tek ekrandan</span> takip
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="mt-6 text-lg sm:text-xl text-slate-600 leading-[1.65] max-w-xl">
                Mobil uygulama ile terminaldeki QR kodu okutun; giriş çıkışlar anında kaydedilsin. Raporlar ve geçmiş tek yerden yönetilsin.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#demo-form" className="inline-flex justify-center items-center gap-2 text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 px-6 py-3.5 rounded-lg transition-colors shadow-sm">
                  Hemen Başla
                  <ArrowRight strokeWidth={2} className="w-4 h-4" />
                </a>
                <a href="#video" className="inline-flex justify-center items-center gap-2 text-base font-semibold text-slate-700 bg-white border border-slate-200 px-6 py-3.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <PlayCircle strokeWidth={1.5} className="w-5 h-5 text-slate-500" />
                  Demo İzle
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative lg:min-h-[540px] flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-blue-300/35 rounded-full blur-3xl pointer-events-none hero-orb" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none hero-orb hero-orb-delay" />
              <div className="mockup-wrapper-with-reflection inline-block relative min-h-[460px] sm:min-h-[520px] flex justify-center items-center">
              <div className="relative z-20 w-56 h-[460px] sm:w-60 sm:h-[520px] bg-slate-900 border-[6px] border-slate-800 rounded-[2.75rem] shadow-2xl transform rotate-3 overflow-hidden hero-float">
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
                  <div className="w-24 h-5 bg-black rounded-b-xl" />
                </div>
                <div className="h-full w-full bg-slate-900 flex flex-col pt-12 relative">
                  <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col">
                    <div className="px-4 pt-3 pb-1 text-center shrink-0">
                      <p className="text-xs font-semibold text-white">QR ile giriş</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Kodu okutun</p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border-2 border-slate-600 rounded-2xl">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-xl" />
                      <div className="scanner-line" />
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <img src="/qrkapicon2.png" alt="QR" className="w-20 h-20 object-contain bg-white rounded-lg p-1.5" />
                      </div>
                    </div>
                  </div>
                  <div className="h-24 bg-slate-800 rounded-t-3xl -mt-4 relative z-10 flex items-center justify-center px-6 border-t border-slate-700/50">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center ring-2 ring-slate-600">
                      <Camera strokeWidth={1.5} className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mockup-reflection mockup-reflection-phone" aria-hidden="true">
                <div className="w-56 h-[460px] sm:w-60 sm:h-[520px] bg-slate-800 rounded-[2.75rem] border border-slate-700" />
              </div>
              </div>
            </motion.div>
          </div>
          {/* Scroll göstergesi — dikey çizgi + Kaydır metni */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 pointer-events-none">
            <div className="scroll-track">
              <div className="scroll-track-dot" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
              Kaydır
            </span>
          </div>
        </div>
      </section>

      {/* Features with UI Mockups — mavi reflection tarzı arka plan */}
      <section
        id="ozellikler"
        className="pt-32 pb-16 overflow-hidden relative"
        style={{
          background: [
            'radial-gradient(ellipse 100% 80% at 85% 20%, rgba(147, 197, 253, 0.5), transparent 55%)',
            'radial-gradient(ellipse 90% 70% at 10% 80%, rgba(96, 165, 250, 0.35), transparent 50%)',
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(191, 219, 254, 0.4), transparent 60%)',
            'linear-gradient(180deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 70%, #93c5fd 100%)',
          ].join(', '),
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_30%,rgba(147,197,253,0.25),transparent_50%)] pointer-events-none hero-bg-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_70%,rgba(191,219,254,0.3),transparent_50%)] pointer-events-none hero-bg-glow hero-bg-glow-delay" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-24 md:space-y-32 relative z-10">
          {/* 1. Güvenli QR: metin sol, terminal sağ */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.5 }} className="text-center md:text-left order-2 md:order-1">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">Güvenli QR kod.</h3>
              <p className="text-lg text-slate-600 leading-relaxed">Her 10 saniyede bir yenilenen dinamik QR kod teknolojisi ile ekstra güvenlik ve sahtecilik koruması sağlayın.</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.5 }} className="flex justify-center md:justify-start group order-1 md:order-2">
              <div className="mockup-wrapper-with-reflection inline-block">
              <div className="w-64 h-64 bg-white rounded-3xl shadow-[0_-12px_28px_-8px_rgba(0,0,0,0.1),0_12px_28px_-8px_rgba(0,0,0,0.1),0_28px_56px_-14px_rgba(0,0,0,0.15)] border border-slate-100 p-6 flex flex-col relative transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex justify-between items-center mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-16 h-1.5 rounded-full bg-slate-100" />
                </div>
                <div className="flex-1 rounded-2xl bg-white flex items-center justify-center relative overflow-hidden border border-slate-200 shadow-inner">
                  <img src="/qrkapicon.png" alt="QR" className="w-24 h-24 object-contain" />
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-[scan_2s_ease-in-out_infinite_alternate]" />
                </div>
              </div>
              <div className="mockup-reflection mockup-reflection-box" aria-hidden="true"><div className="w-64 h-64 bg-slate-100 rounded-3xl" /></div>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Mobil kolaylığı: telefon sol, metin sağ */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.5 }} className="flex justify-center md:justify-end group">
              <div className="mockup-wrapper-with-reflection inline-block">
              <div className="w-52 h-[420px] sm:w-52 sm:h-[460px] bg-white border-[6px] border-slate-900 rounded-[2.5rem] shadow-[0_-12px_28px_-8px_rgba(0,0,0,0.1),0_12px_28px_-8px_rgba(0,0,0,0.1),0_28px_56px_-14px_rgba(0,0,0,0.15)] relative flex flex-col transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-4 flex justify-center z-20">
                  <div className="w-16 h-3 bg-slate-900 rounded-b-lg" />
                </div>
                <div className="flex-1 bg-slate-50 pt-8 px-4 pb-4 flex flex-col relative">
                  <div className="w-20 h-2 bg-slate-200 rounded-full mb-6 mx-auto" />
                  <div className="flex-1 bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center relative shadow-sm">
                    <div className="w-24 h-24 border-2 border-slate-100 rounded-lg relative flex items-center justify-center bg-white p-1">
                      <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-blue-500 rounded-tl" />
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-blue-500 rounded-tr" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-blue-500 rounded-bl" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-blue-500 rounded-br" />
                      <img src="/qrkapicon2.png" alt="QR" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Camera strokeWidth={1.5} className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mockup-reflection mockup-reflection-phone" aria-hidden="true"><div className="w-52 h-[420px] sm:h-[460px] bg-slate-100 rounded-[2.5rem]" /></div>
              </div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.5 }} className="text-center md:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">Mobil kolaylığı.</h3>
              <p className="text-lg text-slate-600 leading-relaxed">Çalışanlar, özel mobil uygulama sayesinde terminal ekranındaki QR kodu saniyeler içinde okutarak işlemlerini tamamlar.</p>
            </motion.div>
          </motion.div>

          {/* 3. Web panel: metin sol, dashboard sağ */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.5 }} className="text-center md:text-left order-2 md:order-1">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">Web panel.</h3>
              <p className="text-lg text-slate-600 leading-relaxed">Tüm giriş-çıkış hareketleri, personel detayları, puantaj hesaplamaları ve gelişmiş raporlar tek bir modern panelde.</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.5 }} className="flex justify-center md:justify-start group order-1 md:order-2">
              <div className="mockup-wrapper-with-reflection inline-block">
              <div className="w-72 h-48 bg-white rounded-xl shadow-[0_-12px_28px_-8px_rgba(0,0,0,0.1),0_12px_28px_-8px_rgba(0,0,0,0.1),0_28px_56px_-14px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                <div className="h-6 border-b border-slate-100 flex items-center px-3 gap-1.5 bg-slate-50/50 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                <div className="flex flex-1 p-3 gap-3 min-h-0">
                  <div className="w-14 space-y-2.5 pt-1 border-r border-slate-100 pr-3 shrink-0">
                    <p className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide">Menü</p>
                    <div className="h-2 w-full bg-blue-100 rounded-sm" />
                    <div className="h-2 w-4/5 bg-slate-100 rounded-sm" />
                    <div className="h-2 w-full bg-slate-100 rounded-sm" />
                  </div>
                  <div className="flex-1 space-y-2 pt-0.5 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Dashboard</span>
                      <div className="h-3 w-8 bg-blue-500 rounded-sm flex items-center justify-center"><span className="text-[8px] text-white font-medium">Yeni</span></div>
                    </div>
                    <div className="h-14 w-full bg-slate-50 rounded-lg border border-slate-100 p-2 flex items-end gap-1.5">
                      <div className="flex-1 bg-blue-200 rounded-t-sm" style={{ height: '40%' }} />
                      <div className="flex-1 bg-blue-300 rounded-t-sm" style={{ height: '70%' }} />
                      <div className="flex-1 bg-blue-400 rounded-t-sm" style={{ height: '50%' }} />
                      <div className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: '90%' }} />
                      <div className="flex-1 bg-blue-600 rounded-t-sm" style={{ height: '60%' }} />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 flex-1 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-center"><span className="text-[8px] text-slate-500 font-medium">Son girişler</span></div>
                      <div className="h-7 flex-1 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-center"><span className="text-[8px] text-slate-500 font-medium">Puantaj özeti</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mockup-reflection mockup-reflection-dashboard" aria-hidden="true"><div className="w-72 h-48 bg-slate-100 rounded-xl" /></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nasıl Çalışır — tek blok, sadece 4 adım */}
      <section id="nasil-calisir" className="bg-slate-50 pt-24 pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-20" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Nasıl Çalışır?</h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">Karmaşık kurulumlara gerek yok. Sisteminizi dakikalar içinde aktif edin.</p>
          </motion.div>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-slate-200 z-0" />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-16 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center text-center cursor-default"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative"
                  whileHover={{ scale: 1.08, boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center justify-center translate-x-1/4 -translate-y-1/4">1</div>
                  <motion.span whileHover={{ rotate: 5 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Tablet strokeWidth={1.5} className="w-8 h-8 text-slate-700" />
                  </motion.span>
                </motion.div>
                <h4 className="font-display text-lg font-semibold tracking-tight text-slate-900 mb-3">Cihazı Konumlandırın</h4>
                <p className="text-base text-slate-600 leading-relaxed">Giriş kapısına bir tablet veya telefon yerleştirin.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center text-center cursor-default"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative"
                  whileHover={{ scale: 1.08, boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center justify-center translate-x-1/4 -translate-y-1/4">2</div>
                  <motion.span whileHover={{ rotate: 180 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
                    <RefreshCcw strokeWidth={1.5} className="w-8 h-8 text-blue-600" />
                  </motion.span>
                </motion.div>
                <h4 className="font-display text-lg font-semibold tracking-tight text-slate-900 mb-3">Dinamik QR Kodu</h4>
                <p className="text-base text-slate-600 leading-relaxed">Ekranda sürekli yenilenen güvenli QR kod gösterilir.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center text-center cursor-default"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative"
                  whileHover={{ scale: 1.08, boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center justify-center translate-x-1/4 -translate-y-1/4">3</div>
                  <motion.span whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Camera strokeWidth={1.5} className="w-8 h-8 text-slate-700" />
                  </motion.span>
                </motion.div>
                <h4 className="font-display text-lg font-semibold tracking-tight text-slate-900 mb-3">Uygulama ile Okutun</h4>
                <p className="text-base text-slate-600 leading-relaxed">Çalışanlar mobil cihazlarıyla ekrandaki kodu okutur.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center text-center cursor-default"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 relative"
                  whileHover={{ scale: 1.08, boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center justify-center translate-x-1/4 -translate-y-1/4">4</div>
                  <motion.span whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Database strokeWidth={1.5} className="w-8 h-8 text-slate-700" />
                  </motion.span>
                </motion.div>
                <h4 className="font-display text-lg font-semibold tracking-tight text-slate-900 mb-3">Otomatik Kayıt</h4>
                <p className="text-base text-slate-600 leading-relaxed">Sistem kişiyi tanır ve saati anında panele kaydeder.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Panel — İnteraktif QR (hover ile okut) */}
      <section id="panel" className="py-24 sm:py-32 bg-white overflow-hidden min-h-[32rem] flex flex-col justify-center">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${qrShowInfo ? 'max-w-[90rem]' : 'max-w-4xl'} text-center transition-all duration-300`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {qrShowInfo && (
              <>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">Giriş Özeti</h2>
                <p className="text-lg text-slate-600 mb-8">QR okutma tamamlandı. Oturum detayları aşağıda.</p>
              </>
            )}

            {qrShowInfo ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                }}
                className="rounded-2xl bg-white border border-slate-200 shadow-lg text-left origin-center overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 p-10 sm:p-12 lg:py-14 lg:px-16">
                  <div className="flex flex-col">
                    <div className="text-blue-500 mb-4">
                      <CheckCircle2 strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-lg mb-2">Giriş başarılı</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">QR kod başarıyla okundu ve oturum açıldı.</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-blue-500 mb-4">
                      <Clock strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-lg mb-2">Zaman damgası</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Giriş saati panele kaydedildi.</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-blue-500 mb-4">
                      <MapPin strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-lg mb-2">Konum kaydı</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Okutma konumu isteğe bağlı olarak kaydedildi.</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-blue-500 mb-4">
                      <ShieldCheck strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-lg mb-2">Güvenli doğrulama</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Dinamik kod ile güvenli giriş yapıldı.</p>
                  </div>
                  <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                    <div className="text-blue-500 mb-4">
                      <Server strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-lg mb-2">Anlık senkron</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Veriler yönetim paneli ile eşitlendi.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">Android & iOS ile QR Giriş</h2>
                <p className="text-slate-600 mb-2 max-w-2xl mx-auto">Mobil uygulama ile terminaldeki QR kodu okutarak anında giriş yapın. Her iki platformda da aynı güvenli akış.</p>
                <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start max-w-4xl mx-auto px-4">
                  {/* Ortak boyut: uzun ince telefon — w-[232px] h-[500px] ekran oranı */}
                  {/* Sol: Android — punch-hole, status bar, gesture bar */}
                  <div className="flex flex-col items-center">
                    <div
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setQrHoveringAndroid(true)}
                      onMouseLeave={() => setQrHoveringAndroid(false)}
                      onFocus={() => setQrHoveringAndroid(true)}
                      onBlur={() => setQrHoveringAndroid(false)}
                      className="relative w-[232px] rounded-[1.75rem] bg-black p-1.5 cursor-pointer select-none transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 h-[500px] flex flex-col shadow-lg"
                    >
                      {/* Android: sağ kenar — 2 ince fiziksel tuş (ses + güç) */}
                      <div className="absolute right-0 top-[28%] w-1 h-8 rounded-l bg-zinc-800 border border-zinc-700/50 z-10" />
                      <div className="absolute right-0 top-[42%] w-1 h-12 rounded-l bg-zinc-800 border border-zinc-700/50 z-10" />
                      <div className="rounded-[1.4rem] bg-white overflow-hidden flex-1 flex flex-col min-h-0">
                        {/* Punch-hole üst orta (ilk foto) */}
                        <div className="h-10 pt-0.5 px-3 flex items-center justify-between bg-white shrink-0 relative">
                          <span className="text-[10px] font-medium text-slate-900">9:41</span>
                          <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black" />
                          <div className="flex items-center gap-0.5">
                            <div className="flex gap-px items-end">
                              <span className="w-0.5 h-2 bg-slate-700 rounded-sm" />
                              <span className="w-0.5 h-2.5 bg-slate-700 rounded-sm" />
                              <span className="w-0.5 h-3 bg-slate-700 rounded-sm" />
                              <span className="w-0.5 h-3.5 bg-slate-700 rounded-sm" />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 pt-2 pb-1 text-center bg-white shrink-0">
                          <p className="font-display font-semibold text-slate-800 text-xs">QR ile giriş</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Fareyi QR üzerine getirin</p>
                        </div>
                        <div className="relative bg-white flex-1 min-h-[180px] flex items-center justify-center">
                          <motion.div
                            className="relative w-40 h-40 rounded-xl border-2 border-green-500 flex items-center justify-center overflow-hidden"
                            animate={{ rotate: qrScannedAndroid ? 350 : 0 }}
                            transition={{ duration: qrScannedAndroid ? 0.58 : 0, ease: 'easeInOut' }}
                            onAnimationComplete={() => { if (qrScannedAndroid) { setQrScannedAndroid(false); setQrProgressAndroid(0); } }}
                          >
                            <div className="bg-white rounded-lg p-1.5"><img src="/qrkapicon.png" alt="QR" className="w-28 h-28 object-contain" /></div>
                            {qrHoveringAndroid && !qrScannedAndroid && (
                              <>
                                <div className="absolute left-0 right-0 h-0.5 bg-green-400 rounded-full z-10 shadow-[0_0_6px_#4ade80]" style={{ top: `${qrProgressAndroid}%`, transform: 'translateY(-50%)' }} />
                                <div className="absolute inset-0 bg-green-400/10 pointer-events-none" />
                              </>
                            )}
                          </motion.div>
                        </div>
                        <motion.div className="pb-2 pt-1.5 flex justify-center bg-white shrink-0" initial={false} animate={{ opacity: qrScannedAndroid ? 0 : 1 }} transition={{ duration: 0.3 }}>
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Camera strokeWidth={1.5} className="w-4 h-4 text-green-700" />
                          </div>
                        </motion.div>
                        <div className="h-1.5 flex justify-center bg-white pb-0.5 shrink-0">
                          <div className="w-24 h-0.5 rounded-full bg-slate-300" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-xl font-bold text-slate-800 font-display">Android</p>
                    <p className="mt-1 text-sm text-slate-500 text-center max-w-[240px]">Terminaldeki QR kodu uygulama ile okutun; giriş otomatik kaydedilir.</p>
                  </div>

                  {/* Sağ: iOS — QR ile giriş (Android ile aynı akış, mavi renk); alt çubuk yok */}
                  <div className="flex flex-col items-center">
                    <div
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setQrHoveringIOS(true)}
                      onMouseLeave={() => setQrHoveringIOS(false)}
                      onFocus={() => setQrHoveringIOS(true)}
                      onBlur={() => setQrHoveringIOS(false)}
                      className="relative w-[232px] h-[500px] rounded-[2rem] bg-zinc-900 p-1.5 shadow-xl border border-zinc-700/50 flex flex-col cursor-pointer select-none transition-all hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                    >
                      {/* iOS: sol kenar — 2 ses tuşu; sağ kenar — 1 güç tuşu */}
                      <div className="absolute left-0 top-[22%] w-0.5 h-10 rounded-r bg-zinc-700 z-10" />
                      <div className="absolute left-0 top-[30%] w-0.5 h-10 rounded-r bg-zinc-700 z-10" />
                      <div className="absolute right-0 top-[38%] w-0.5 h-14 rounded-l bg-zinc-700 z-10" />
                      <div className="rounded-[1.6rem] bg-white overflow-hidden flex-1 flex flex-col min-h-0">
                        <div className="h-11 pt-1 px-4 flex items-center justify-between bg-white relative shrink-0">
                          <span className="text-[11px] font-semibold text-black">9:41</span>
                          <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-20 h-6 rounded-full bg-black" />
                          <div className="flex items-center gap-0.5">
                            <div className="flex gap-px items-end">
                              <span className="w-0.5 h-1.5 bg-zinc-800 rounded-px" />
                              <span className="w-0.5 h-2 bg-zinc-800 rounded-px" />
                              <span className="w-0.5 h-2.5 bg-zinc-800 rounded-px" />
                              <span className="w-0.5 h-3 bg-zinc-800 rounded-px" />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 pt-2 pb-1 text-center bg-white shrink-0">
                          <p className="font-display font-semibold text-slate-800 text-xs">QR ile giriş</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Fareyi QR üzerine getirin</p>
                        </div>
                        <div className="relative bg-white flex-1 min-h-[180px] flex items-center justify-center">
                          <motion.div
                            className="relative w-40 h-40 rounded-xl border-2 border-blue-500 flex items-center justify-center overflow-hidden"
                            animate={{ rotate: qrScannedIOS ? 350 : 0 }}
                            transition={{ duration: qrScannedIOS ? 0.58 : 0, ease: 'easeInOut' }}
                            onAnimationComplete={() => { if (qrScannedIOS) { setQrScannedIOS(false); setQrProgressIOS(0); } }}
                          >
                            <div className="bg-white rounded-lg p-1.5"><img src="/qrkapicon.png" alt="QR" className="w-28 h-28 object-contain" /></div>
                            {qrHoveringIOS && !qrScannedIOS && (
                              <>
                                <div className="absolute left-0 right-0 h-0.5 bg-blue-400 rounded-full z-10 shadow-[0_0_6px_#60a5fa]" style={{ top: `${qrProgressIOS}%`, transform: 'translateY(-50%)' }} />
                                <div className="absolute inset-0 bg-blue-400/10 pointer-events-none" />
                              </>
                            )}
                          </motion.div>
                        </div>
                        <motion.div className="pb-2 pt-1.5 flex justify-center bg-white shrink-0" initial={false} animate={{ opacity: qrScannedIOS ? 0 : 1 }} transition={{ duration: 0.3 }}>
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Camera strokeWidth={1.5} className="w-4 h-4 text-blue-700" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    <p className="mt-4 text-xl font-bold text-slate-800 font-display">iOS</p>
                    <p className="mt-1 text-sm text-slate-500 text-center max-w-[240px]">iPhone ve iPad’de aynı QR ile giriş; terminaldeki kodu okutun, anında kayıt.</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Security Focus Section */}
      <section id="guvenlik" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5 }}>
            <ShieldCheck strokeWidth={1.5} className="w-14 h-14 text-blue-400 mb-8 mx-auto opacity-90" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">Üst Düzey Güvenlik</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">Sistem, geleneksel QR kod okutma açıklarını kapatmak üzere tasarlanmıştır.</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-left"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className="border-l border-slate-800 pl-8">
              <div className="text-blue-400 mb-4">
                <Clock strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h4 className="font-display text-lg font-semibold tracking-tight text-white mb-2">10 Saniyelik Ömür</h4>
              <p className="text-slate-300 leading-relaxed">QR kodlar her 10 saniyede bir değiştirilerek ekran görüntüsü ile giriş yapılmasını engeller.</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className="border-l border-slate-800 pl-8">
              <div className="text-blue-400 mb-4">
                <MapPin strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h4 className="font-display text-lg font-semibold tracking-tight text-white mb-2">Konum Doğrulama</h4>
              <p className="text-slate-300 leading-relaxed">İsteğe bağlı olarak mobil uygulamadan okutma anında lokasyon teyidi alınabilir.</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className="border-l border-slate-800 pl-8">
              <div className="text-blue-400 mb-4">
                <Server strokeWidth={1.5} className="w-7 h-7" />
              </div>
              <h4 className="font-display text-lg font-semibold tracking-tight text-white mb-2">Gerçek Zamanlı İletişim</h4>
              <p className="text-slate-300 leading-relaxed">Terminal ve sunucu arasındaki veri akışı şifrelenir ve manipülasyona kapalıdır.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Section — kapak videodan (ilk kare) */}
      <section id="video" ref={videoSectionRef} className="py-20 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-video bg-slate-900 min-h-[280px]">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={`${import.meta.env.BASE_URL}video.mp4`}
                muted={videoMuted}
                playsInline
                loop
                controls
                preload="metadata"
              />
              {!videoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-none">
                    <PlayCircle className="w-12 h-12 text-slate-800 ml-1" strokeWidth={2} fill="currentColor" />
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => setVideoMuted(!videoMuted)}
                className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label={videoMuted ? 'Sesi aç' : 'Sesi kapat'}
              >
                {videoMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white bg-gradient-to-b from-slate-50/50 to-white">
        <motion.div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Personel takibini dijitalleştirin ve işletmenizi daha verimli yönetin.
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Eski nesil sistemlerin bakım maliyetlerinden ve operasyonel yükünden kurtulun. Hemen bugün QR KAPI'ya geçiş yapın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#demo-form" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-slate-800 text-white text-base font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-sm">
              Ücretsiz Demo Talep Et
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500 max-w-md mx-auto">
            Ücretsiz deneme. Kredi kartı gerekmez — uzman ekibimiz sizinle iletişime geçer.
          </p>
        </motion.div>
      </section>

      {/* Demo Talep Form — koyu lacivert arka plan #1F2332 */}
      <section id="demo-form" className="relative py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: '#1F2332' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">Demo talebi</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                QR KAPI ile tanışın
              </h2>
              <p className="mt-4 text-slate-400 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Ücretsiz demo için formu doldurun. Uzman ekibimiz 24 saat içinde sizinle iletişime geçecek.
              </p>
              <ul className="mt-8 space-y-3 text-slate-300 text-left max-w-sm mx-auto lg:mx-0">
            
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                  </span>
                  Kişiye özel demo
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                  </span>
                  Ücretsiz danışmanlık
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              className="form-float rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-black/10 bg-slate-100/90 backdrop-blur-sm"
            >
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 text-slate-800 placeholder:text-slate-500 border border-slate-200/80 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="E-posta"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 text-slate-800 placeholder:text-slate-500 border border-slate-200/80 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Şirket / Kurum"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 text-slate-800 placeholder:text-slate-500 border border-slate-200/80 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                />
                <textarea
                  rows={4}
                  placeholder="Mesajınız (isteğe bağlı)"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 text-slate-800 placeholder:text-slate-500 border border-slate-200/80 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-slate-800 text-white font-semibold text-base flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors shadow-lg border border-slate-700/50"
                >
                  Talebi Gönder
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </form>
            </motion.div>
          </div>
          {/* 3 kart — formun altında */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-30px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-2xl bg-indigo-900/20 backdrop-blur-md border border-indigo-500/25 p-5 text-center shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center mx-auto mb-3 border border-indigo-400/30">
                <CalendarCheck className="w-6 h-6 text-indigo-200" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-white text-sm">Demo Sürüm</h3>
              <p className="text-indigo-200/90 text-xs mt-1">Tüm özellikleri keşfedin</p>
            </div>
            <div className="rounded-2xl bg-indigo-900/20 backdrop-blur-md border border-indigo-500/25 p-5 text-center shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center mx-auto mb-3 border border-indigo-400/30">
                <Users className="w-6 h-6 text-indigo-200" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-white text-sm">Uzman Destek</h3>
              <p className="text-indigo-200/90 text-xs mt-1">7/24 teknik destek ekibi</p>
            </div>
            <div className="rounded-2xl bg-indigo-900/20 backdrop-blur-md border border-indigo-500/25 p-5 text-center shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center mx-auto mb-3 border border-indigo-400/30">
                <Settings className="w-6 h-6 text-indigo-200" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-white text-sm">Kişisel Kurulum</h3>
              <p className="text-indigo-200/90 text-xs mt-1">İşletmenize özel yapılandırma</p>
            </div>
          </motion.div>
        </div>
      </section>
            </>
          } />
          <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
          <Route path="/kullanim-sartlari" element={<KullanimSartlari />} />
          <Route path="/iletisim" element={<Iletisim />} />
            </Routes>
            <Footer />
          </motion.div>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
