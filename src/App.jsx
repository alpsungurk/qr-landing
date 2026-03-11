import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  Menu,
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
} from 'lucide-react'

const viewport = { once: false, margin: '-60px' }

function App() {
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

  return (
    <div className="bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${navScrolled ? 'bg-white/95 border-slate-200 shadow-sm' : 'bg-white/80 border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center">
                <img src="/qrkapi.png" alt="QRKAPI" className="h-10 sm:h-11 w-auto object-contain" />
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#ozellikler" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors tracking-tight">Özellikler</a>
              <a href="#nasil-calisir" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors tracking-tight">Nasıl Çalışır</a>
              <a href="#panel" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors tracking-tight">Panel</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Giriş Yap</a>
              <a href="#" className="font-display text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">Demo Talep Et</a>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-slate-500 hover:text-slate-900" type="button" aria-label="Menü">
                <Menu strokeWidth={1.5} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-slate-50/50">
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[250px] h-[250px] bg-slate-400/10 rounded-full blur-3xl pointer-events-none" />
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
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full pl-3 pr-4 py-2 text-[0.8125rem] font-semibold tracking-wide uppercase text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/80 shadow-sm mb-8 font-display">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                Yeni Nesil Personel Takibi
              </motion.div>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.08]">
                QR Kod ile Personel Takibini <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text">Kolaylaştırın</span>
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="mt-6 text-lg sm:text-xl text-slate-600 leading-[1.65] max-w-xl">
                Çalışan giriş çıkışlarını saniyeler içinde kaydedin ve tüm personel hareketlerini tek bir akıllı panelden güvenle yönetin.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#" className="inline-flex justify-center items-center gap-2 font-display text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white px-7 py-3.5 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30">
                  Hemen Başla
                  <ArrowRight strokeWidth={2} className="w-4 h-4" />
                </a>
                <a href="#" className="inline-flex justify-center items-center gap-2 font-display text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 px-7 py-3.5 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-blue-400/20 rounded-full blur-3xl" />
              <div className="mockup-wrapper-with-reflection inline-block relative min-h-[460px] sm:min-h-[520px] flex justify-center items-center">
              <div className="relative z-20 w-56 h-[460px] sm:w-60 sm:h-[520px] bg-white border-[6px] border-slate-900 rounded-[2.75rem] shadow-2xl transform rotate-3 overflow-hidden hero-float">
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
                  <div className="w-24 h-5 bg-slate-900 rounded-b-xl" />
                </div>
                <div className="h-full w-full bg-slate-50 flex flex-col pt-12 relative">
                  <div className="px-6 pb-4">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">Giriş Yap</h3>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Kamerayı QR koda hizalayın</p>
                  </div>
                  <div className="flex-1 bg-slate-800 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border-2 border-white/50 rounded-2xl">
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
                  <div className="h-24 bg-white rounded-t-3xl -mt-4 relative z-10 flex items-center justify-center px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <Camera strokeWidth={1.5} className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mockup-reflection mockup-reflection-phone" aria-hidden="true">
                <div className="w-56 h-[460px] sm:w-60 sm:h-[520px] bg-slate-100 rounded-[2.75rem] border border-slate-200" />
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features with UI Mockups — her satırda metin + mockup hizalı */}
      <section id="ozellikler" className="pt-32 pb-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-24 md:space-y-32">
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
                <div className="h-6 border-b border-slate-50 flex items-center px-3 gap-1.5 bg-slate-50/50">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                <div className="flex flex-1 p-3 gap-3">
                  <div className="w-14 space-y-2.5 pt-1 border-r border-slate-50 pr-3">
                    <div className="h-2 w-full bg-blue-100 rounded-sm" />
                    <div className="h-2 w-4/5 bg-slate-100 rounded-sm" />
                    <div className="h-2 w-full bg-slate-100 rounded-sm" />
                  </div>
                  <div className="flex-1 space-y-3 pt-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="h-2.5 w-16 bg-slate-200 rounded-sm" />
                      <div className="h-3 w-8 bg-blue-500 rounded-sm" />
                    </div>
                    <div className="h-16 w-full bg-slate-50 rounded-lg border border-slate-100 p-2 flex items-end gap-1.5">
                      <div className="flex-1 bg-blue-200 rounded-t-sm" style={{ height: '40%' }} />
                      <div className="flex-1 bg-blue-300 rounded-t-sm" style={{ height: '70%' }} />
                      <div className="flex-1 bg-blue-400 rounded-t-sm" style={{ height: '50%' }} />
                      <div className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: '90%' }} />
                      <div className="flex-1 bg-blue-600 rounded-t-sm" style={{ height: '60%' }} />
                    </div>
                    <div className="flex gap-2.5">
                      <div className="h-8 flex-1 bg-slate-50 rounded-md border border-slate-100" />
                      <div className="h-8 flex-1 bg-slate-50 rounded-md border border-slate-100" />
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
                <p className="text-slate-600 mb-10 max-w-2xl mx-auto">Mobil uygulama ile terminaldeki QR kodu okutarak anında giriş yapın. Her iki platformda da aynı güvenli akış.</p>
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
                            <div className="w-3 h-2 border border-slate-700 rounded-sm" />
                            <div className="flex gap-px">
                              <span className="w-0.5 h-2 bg-slate-700 rounded-sm" />
                              <span className="w-0.5 h-2.5 bg-slate-700 rounded-sm" />
                              <span className="w-0.5 h-3 bg-slate-700 rounded-sm" />
                              <span className="w-0.5 h-3.5 bg-slate-700 rounded-sm" />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 pt-2 pb-1 text-center bg-white shrink-0">
                          <p className="font-display font-semibold text-slate-800 text-xs">QR ile giriş</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Kodu okutun</p>
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
                            <div className="w-3.5 h-2 border-2 border-zinc-800 rounded-sm" />
                            <div className="flex gap-px">
                              <span className="w-0.5 h-1.5 bg-zinc-800 rounded-px" />
                              <span className="w-0.5 h-2 bg-zinc-800 rounded-px" />
                              <span className="w-0.5 h-2.5 bg-zinc-800 rounded-px" />
                              <span className="w-0.5 h-3 bg-zinc-800 rounded-px" />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 pt-2 pb-1 text-center bg-white shrink-0">
                          <p className="font-display font-semibold text-slate-800 text-xs">QR ile giriş</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Kodu okutun</p>
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
                    <p className="mt-1 text-sm text-slate-500 text-center max-w-[240px]">iPhone ve iPad’de aynı akış; Face ID / Touch ID ile ek güvenlik seçeneği.</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Security Focus Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
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

      {/* CTA Section */}
      <section className="py-32 bg-white bg-gradient-to-b from-slate-50/50 to-white">
        <motion.div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Personel takibini dijitalleştirin ve işletmenizi daha verimli yönetin.
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Eski nesil sistemlerin bakım maliyetlerinden ve operasyonel yükünden kurtulun. Hemen bugün QRKAPI'ya geçiş yapın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#" className="font-display w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white text-base font-semibold rounded-full hover:bg-slate-800 transition-all duration-200 shadow-lg shadow-slate-900/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-900/25">
              Ücretsiz Demo Talep Et
            </a>
            <a href="#" className="font-display w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 text-base font-semibold border-2 border-slate-200 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
              Fiyatlandırmayı İncele
            </a>
      </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/qrkapi.png" alt="QRKAPI" className="h-8 w-auto object-contain" />
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors tracking-tight">Gizlilik Politikası</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors tracking-tight">Kullanım Şartları</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors tracking-tight">İletişim</a>
          </div>
          <div className="text-sm font-medium text-slate-400">
            &copy; {new Date().getFullYear()} QRKAPI. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
      </div>
  )
}

export default App
