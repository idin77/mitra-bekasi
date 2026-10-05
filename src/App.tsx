/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  alt: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    image: 'https://z-cdn-media.chatglm.cn/files/8b35c692-dce0-460e-9c8c-12dc2dd28a67.jpg?auth_key=1891145358-528231c042254e76abb0a2a5a1e99a0b-0-6ba9fa9ff84c63ed8b7413f69005a108',
    title: 'Penyedotan Septic Tank',
    description: 'Tim petugas membersihkan septic tank dengan truk sedot profesional.',
    alt: 'Petugas membersihkan septic tank dengan truk sedot',
  },
  {
    id: 2,
    image: 'https://z-cdn-media.chatglm.cn/files/93764afb-0b78-41ec-9859-1723b7981014.jpg?auth_key=1891145358-e3036d2346f44ddab499d0ee91780c1a-0-4b5f27c73cf2fce784eeb806d23ef6e8',
    title: 'Tim Teknisi Siaga',
    description: 'Tiga teknisi berseragam lengkap bersiap melakukan penanganan pipa.',
    alt: 'Teknisi sedot WC berdiri di depan truk Isuzu',
  },
  {
    id: 3,
    image: 'https://z-cdn-media.chatglm.cn/files/33748952-6a43-47b0-920c-c6cbbceeb719.jpg?auth_key=1891145358-97889be3a24546a2a9f0271e61e6a9a9-0-52fcb6d86bb0c9f1115d1978a78abc83',
    title: 'Pelancaran Saluran',
    description: 'Pengerjaan pelancaran saluran tersumbat di area pemukiman.',
    alt: 'Pekerja membersihkan saluran di area perkotaan',
  },
  {
    id: 4,
    image: 'https://z-cdn-media.chatglm.cn/files/c701d28f-9ce6-410f-9af1-5bdf6bd82fe4.jpg?auth_key=1891145358-f10d651607cc4ebcb600e88f06f3eda9-0-cadac15e64fade2d6e42565a9da55f4d',
    title: 'Operasi Armada Sedot',
    description: 'Petugas mengoperasikan pompa penyedot pada truk tangki kami.',
    alt: 'Petugas mengoperasikan truk sedot limbah',
  },
  {
    id: 5,
    image: 'https://z-cdn-media.chatglm.cn/files/55d24ab3-1d3c-4736-beb5-0371dc813146.jpg?auth_key=1891145358-c43c6073058c4960a42f5ce7d7cbd58b-0-dc68fbb11a48f6e16eedbe80d17bb7bd',
    title: 'Inspeksi Saluran',
    description: 'Technisi memeriksa kondisi saluran limbah di area perumahan.',
    alt: 'Pengecekan saluran pipa oleh teknisi',
  },
  {
    id: 6,
    image: 'https://z-cdn-media.chatglm.cn/files/7efc89d8-0f13-443c-b203-82f00182f517.jpg?auth_key=1891145358-ac532b14e237478a9e2694802c0403b7-0-9e00006dc0a7880924b28ad916f7fb47',
    title: 'Pembukaan Manhole',
    description: 'Proses aman membuka tutup bak kontrol untuk inspeksi lebih lanjut.',
    alt: 'Petugas membuka tutup septic tank',
  },
  {
    id: 7,
    image: 'https://z-cdn-media.chatglm.cn/files/ea99f8ec-d5af-4248-ac08-f9e15af12faf.jpg?auth_key=1891145358-f34e05e963b846bfb3a011ad42d52dd8-0-41fecceb77c1fcf170cfb796fe654b60',
    title: 'Operasi Selang Sedot',
    description: 'Menjalankan selang penyedot limbah cair secara hati-hati dan terukur.',
    alt: 'Pekerja mengoperasikan selang sedot',
  },
  {
    id: 8,
    image: 'https://z-cdn-media.chatglm.cn/files/dca59c1c-5058-4fc6-8a6a-b9eef25523d9.jpg?auth_key=1891145358-8db531af9f664f438a0ec864ebb08085-0-365027590c53c23da998bea53eecf486',
    title: 'Armada Mitra Bersih',
    description: 'Truk penyedot kuning kami siaga di lokasi untuk mengerjakan tugas.',
    alt: 'Truk sedot limbah truk kuning Mitra Bersih',
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'layanan', 'tentang', 'faq', 'galeri', 'kontak'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Handle ESC key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImg) {
        setLightboxImg(null);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  const openLightbox = (src: string) => {
    setLightboxImg(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    document.body.style.overflow = '';
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      const top = (target as HTMLElement).offsetTop - 75;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="logo">
            <div className="logo-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="logo-text">
              <strong>SEDOT WC</strong>
              <span>MITRA BERSIH 24JAM</span>
            </div>
          </a>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li>
              <a
                href="#home"
                onClick={(e) => scrollTo(e, '#home')}
                className={activeSection === 'home' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#layanan"
                onClick={(e) => scrollTo(e, '#layanan')}
                className={activeSection === 'layanan' ? 'active' : ''}
              >
                Layanan
              </a>
            </li>
            <li>
              <a
                href="#tentang"
                onClick={(e) => scrollTo(e, '#tentang')}
                className={activeSection === 'tentang' ? 'active' : ''}
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => scrollTo(e, '#faq')}
                className={activeSection === 'faq' ? 'active' : ''}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#galeri"
                onClick={(e) => scrollTo(e, '#galeri')}
                className={activeSection === 'galeri' ? 'active' : ''}
              >
                Galeri
              </a>
            </li>
            <li>
              <a
                href="#kontak"
                onClick={(e) => scrollTo(e, '#kontak')}
                className={activeSection === 'kontak' ? 'active' : ''}
              >
                Kontak
              </a>
            </li>
          </ul>

          <a
            href="https://wa.me/6285715654183"
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dot"></span>
            <span>Layanan 24 Jam</span>
            <span className="phone-text">· +62 857-1565-4183</span>
          </a>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <span className="decoration bubble bubble-1"></span>
        <span className="decoration bubble bubble-2"></span>
        <span className="decoration bubble bubble-3"></span>
        <i className="fas fa-plus decoration cross-icon"></i>
        <span className="decoration triangle"></span>
        <span className="decoration diamond"></span>
        <span className="decoration circle-outline"></span>
        <span className="decoration dot-pattern"></span>

        <div className="container">
          <div className="hero-content fade-in visible">
            <div className="hero-badge">
              <span className="dot"></span>
              Online Sekarang · Siap Datang Ke Lokasi Anda
            </div>
            <h1>
              SEDOT WC<br />MITRA BERSIH 24JAM
              <span className="highlight">
                Layanan Cepat & Profesional 24 Jam – Solusi Tuntas Septic Tank & WC Mampet Anda!
              </span>
            </h1>
            <a
              href="https://wa.me/6285715654183"
              className="hero-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-phone-alt"></i>
              HUBUNGI KAMI SEKARANG · +62 857-1565-4183
            </a>
            <div className="hero-stats">
              <div className="stat">
                <strong>24/7</strong>
                <span>Layanan Siaga</span>
              </div>
              <div className="stat">
                <strong>15+</strong>
                <span>Tahun Pengalaman</span>
              </div>
              <div className="stat">
                <strong>5000+</strong>
                <span>Pelanggan Puas</span>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-in fade-in-delay-1 visible">
            <div className="truck-card">
              {/* Truck Illustration SVG */}
              <svg className="truck-svg" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
                {/* Ground shadow */}
                <ellipse cx="250" cy="320" rx="200" ry="12" fill="rgba(255,214,10,0.15)" />

                {/* House Background */}
                <g opacity="0.4">
                  <rect x="20" y="120" width="100" height="100" fill="#FFD60A" rx="4" />
                  <polygon points="20,120 70,80 120,120" fill="#FFD60A" />
                  <rect x="40" y="150" width="20" height="20" fill="#111111" opacity="0.6" />
                  <rect x="80" y="150" width="20" height="20" fill="#111111" opacity="0.6" />
                  <rect x="55" y="185" width="30" height="35" fill="#111111" opacity="0.6" />

                  <rect x="380" y="100" width="90" height="120" fill="#FFD60A" opacity="0.5" rx="4" />
                  <polygon points="380,100 425,70 470,100" fill="#FFD60A" opacity="0.5" />
                  <rect x="395" y="130" width="15" height="15" fill="#111111" opacity="0.4" />
                  <rect x="425" y="130" width="15" height="15" fill="#111111" opacity="0.4" />
                  <rect x="395" y="160" width="15" height="15" fill="#111111" opacity="0.4" />
                  <rect x="425" y="160" width="15" height="15" fill="#111111" opacity="0.4" />
                </g>

                {/* Truck Body Main Tank */}
                <rect x="80" y="140" width="240" height="110" fill="#FFD60A" rx="20" stroke="#111111" strokeWidth="3" />

                {/* Tank Details */}
                <rect x="95" y="155" width="210" height="50" fill="rgba(17,17,17,0.1)" rx="8" />

                {/* MITRA BERSIH Text */}
                <text x="200" y="185" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="900" fill="#111111">
                  MITRA BERSIH
                </text>
                <text x="200" y="205" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fontWeight="600" fill="#111111" opacity="0.7">
                  24 JAM SERVICE
                </text>

                {/* Flame/Drop Logo on Tank */}
                <g transform="translate(200, 225)">
                  <circle cx="0" cy="0" r="14" fill="#111111" />
                  <path d="M -6,-2 Q -6,-8 0,-10 Q 6,-8 6,-2 Q 6,4 0,6 Q -6,4 -6,-2 Z" fill="#FFD60A" />
                </g>

                {/* Truck Cab */}
                <rect x="320" y="170" width="100" height="80" fill="#111111" rx="12" />
                <rect x="332" y="180" width="76" height="40" fill="#FFD60A" rx="6" />
                <rect x="340" y="188" width="60" height="24" fill="rgba(17,17,17,0.3)" rx="3" />

                {/* Cab Details */}
                <rect x="335" y="225" width="20" height="20" fill="#FFD60A" rx="3" />
                <text x="345" y="240" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="8" fontWeight="700" fill="#111111">
                  24J
                </text>

                {/* Headlight */}
                <circle cx="415" cy="220" r="6" fill="#FFD60A" />
                <circle cx="415" cy="220" r="3" fill="#FFFFFF" />

                {/* Wheels */}
                <circle cx="130" cy="260" r="24" fill="#111111" />
                <circle cx="130" cy="260" r="12" fill="#FFD60A" />
                <circle cx="130" cy="260" r="6" fill="#111111" />

                <circle cx="220" cy="260" r="24" fill="#111111" />
                <circle cx="220" cy="260" r="12" fill="#FFD60A" />
                <circle cx="220" cy="260" r="6" fill="#111111" />

                <circle cx="370" cy="260" r="24" fill="#111111" />
                <circle cx="370" cy="260" r="12" fill="#FFD60A" />
                <circle cx="370" cy="260" r="6" fill="#111111" />

                {/* Hose from truck */}
                <path d="M 90 230 Q 50 240 30 270" stroke="#111111" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M 90 230 Q 50 240 30 270" stroke="#FFD60A" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="6,4" />

                {/* Worker 1 (left, holding hose) */}
                <g transform="translate(30, 240)">
                  <rect x="-12" y="0" width="24" height="40" fill="#111111" rx="4" />
                  <rect x="-12" y="14" width="24" height="4" fill="#FFD60A" />
                  <circle cx="0" cy="-8" r="10" fill="#FFD60A" />
                  <path d="M -12 -10 Q -12 -22 0 -22 Q 12 -22 12 -10 L 12 -8 L -12 -8 Z" fill="#111111" />
                  <rect x="-18" y="6" width="12" height="6" fill="#FFD60A" rx="2" transform="rotate(20)" />
                  <rect x="-10" y="40" width="8" height="20" fill="#111111" />
                  <rect x="2" y="40" width="8" height="20" fill="#111111" />
                </g>

                {/* Worker 2 (right, holding hose) */}
                <g transform="translate(450, 240)">
                  <rect x="-12" y="0" width="24" height="40" fill="#111111" rx="4" />
                  <rect x="-12" y="14" width="24" height="4" fill="#FFD60A" />
                  <circle cx="0" cy="-8" r="10" fill="#FFD60A" />
                  <path d="M -12 -10 Q -12 -22 0 -22 Q 12 -22 12 -10 L 12 -8 L -12 -8 Z" fill="#111111" />
                  <rect x="6" y="6" width="12" height="6" fill="#FFD60A" rx="2" transform="rotate(-20)" />
                  <rect x="-10" y="40" width="8" height="20" fill="#111111" />
                  <rect x="2" y="40" width="8" height="20" fill="#111111" />
                </g>

                {/* Sparkles/Clean indicators */}
                <g opacity="0.8">
                  <g transform="translate(150, 100)">
                    <path d="M 0,-8 L 2,-2 L 8,0 L 2,2 L 0,8 L -2,2 L -8,0 L -2,-2 Z" fill="#FFD60A" />
                  </g>
                  <g transform="translate(280, 90)">
                    <path d="M 0,-6 L 1.5,-1.5 L 6,0 L 1.5,1.5 L 0,6 L -1.5,1.5 L -6,0 L -1.5,-1.5 Z" fill="#FFD60A" />
                  </g>
                  <g transform="translate(350, 130)">
                    <path d="M 0,-5 L 1,-1 L 5,0 L 1,1 L 0,5 L -1,1 L -5,0 L -1,-1 Z" fill="#FFD60A" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="hero-tags tag-1">
              <i className="fas fa-shield-alt"></i>
              <span>Bergaransi</span>
            </div>
            <div className="hero-tags tag-2">
              <i className="fas fa-bolt"></i>
              <span>Respon 15 Menit</span>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C240,100 480,20 720,40 C960,60 1200,100 1440,60 L1440,120 L0,120 Z" fill="#F0F7FA" />
          </svg>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="layanan" id="layanan">
        <div className="container">
          <div className="section-header fade-in visible">
            <span className="section-badge">LAYANAN KAMI</span>
            <h2 className="section-title">
              Solusi Tuntas untuk<br />Setiap Masalah Saluran
            </h2>
            <p className="section-subtitle">
              Layanan profesional dengan armada modern dan tim berpengalaman untuk menangani semua kebutuhan saluran dan limbah Anda.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card fade-in visible">
              <div className="service-icon">
                <i className="fas fa-truck-loading"></i>
              </div>
              <h3>Sedot WC Lengkap</h3>
              <p>
                Penyedotan septic tank & WC mampet dengan armada modern. Proses cepat, bersih, dan tanpa bau tidak sedap. Cocok untuk rumah, ruko, dan kantor.
              </p>
              <a
                href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20pesan%20layanan%20Sedot%20WC%20Lengkap"
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pelajari <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-card fade-in fade-in-delay-1 visible">
              <div className="service-icon">
                <i className="fas fa-faucet"></i>
              </div>
              <h3>Pelancaran Saluran Mampet</h3>
              <p>
                Membersihkan saluran pipa dan wastafel yang tersumbat dengan teknologi modern. Atasi mampet tanpa bongkar, hemat biaya dan waktu Anda.
              </p>
              <a
                href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20pesan%20layanan%20Pelancaran%20Saluran%20Mampet"
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pelajari <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-card fade-in fade-in-delay-2 visible">
              <div className="service-icon">
                <i className="fas fa-industry"></i>
              </div>
              <h3>Sedot Limbah STP</h3>
              <p>
                Penyedotan limbah STP untuk rumah, ruko, dan industri. Penanganan profesional dengan standar kebersihan dan keamanan lingkungan yang tinggi.
              </p>
              <a
                href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20pesan%20layanan%20Sedot%20Limbah%20STP"
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pelajari <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us" id="tentang">
        <div className="container">
          <div className="section-header fade-in visible">
            <span className="section-badge">KEUNGGULAN</span>
            <h2 className="section-title">Mengapa Memilih Kami?</h2>
            <p className="section-subtitle">
              Kami berkomitmen memberikan layanan terbaik dengan keunggulan yang tidak akan Anda temukan di tempat lain.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card fade-in visible">
              <div className="why-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="why-content">
                <h3>24/7 Tersedia</h3>
                <p>
                  Tim kami siap melayani Anda 24 jam penuh, 7 hari seminggu. Baik siang, malam, hari kerja, akhir pekan, atau hari libur — kami selalu siap datang ke lokasi Anda.
                </p>
              </div>
            </div>

            <div className="why-card fade-in fade-in-delay-1 visible">
              <div className="why-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="why-content">
                <h3>Tim Ahli & Profesional</h3>
                <p>
                  Ditangani oleh tim berpengalaman dengan pelatihan khusus. Setiap petugas berseragam rapi, ramah, dan menjaga kebersihan lokasi kerja Anda.
                </p>
              </div>
            </div>

            <div className="why-card fade-in fade-in-delay-2 visible">
              <div className="why-icon">
                <i className="fas fa-truck-moving"></i>
              </div>
              <div className="why-content">
                <h3>Armada Modern & Bersih</h3>
                <p>
                  Truk tangki modern dengan kapasitas besar dan sistem penyedot berteknologi tinggi. Semua kendaraan dirawat rutin dan selalu dalam kondisi bersih.
                </p>
              </div>
            </div>

            <div className="why-card fade-in fade-in-delay-3 visible">
              <div className="why-icon">
                <i className="fas fa-tags"></i>
              </div>
              <div className="why-content">
                <h3>Harga Transparan</h3>
                <p>
                  Tidak ada biaya tersembunyi. Harga jelas di awal sebelum pekerjaan dimulai. Sesuai kapasitas dan jarak lokasi, dengan harga yang kompetitif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header fade-in visible">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            <p className="section-subtitle">
              Temukan jawaban cepat seputar estimasi tarif harga, cakupan wilayah operasional, dan teknis pengerjaan layanan kami.
            </p>
          </div>

          <div className="faq-container">
            <div className="faq-list">
              {/* FAQ Item 1 */}
              <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(0)}
                  aria-expanded={openFaq === 0}
                >
                  <span className="faq-question-text">
                    <span className="faq-badge-num">01</span>
                    Berapa estimasi biaya atau harga jasa sedot WC & pelancaran di Mitra Bersih?
                  </span>
                  <span className="faq-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                {openFaq === 0 && (
                  <div className="faq-answer">
                    <p>
                      Estimasi tarif sedot WC dan pelancaran saluran kami sangat terjangkau, transparan, dan kompetitif mulai dari <strong>Rp 300.000 – Rp 450.000</strong> tergantung jenis pekerjaan (penyedotan septic tank per kubik / sistem borongan per rit tangki penuh, atau pelancaran pipa wastafel tersumbat), kapasitas septic tank, serta panjang selang yang dibutuhkan. Kami selalu memberikan konfirmasi total biaya di awal sebelum teknisi mulai bekerja — <strong>100% tanpa biaya tersembunyi</strong> atau kenaikan biaya mendadak di lapangan.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 2 */}
              <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(1)}
                  aria-expanded={openFaq === 1}
                >
                  <span className="faq-question-text">
                    <span className="faq-badge-num">02</span>
                    Wilayah mana saja yang dicakup oleh layanan Sedot WC Mitra Bersih?
                  </span>
                  <span className="faq-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                {openFaq === 1 && (
                  <div className="faq-answer">
                    <p>
                      Kami melayani seluruh wilayah <strong>Kota dan Kabupaten Bekasi</strong> secara komprehensif, meliputi: Bantargebang, Bekasi Barat, Bekasi Selatan, Bekasi Timur, Bekasi Utara, Jatiasih, Jatisampurna, Medan Satria, Mustikajaya, Pondok Gede, Pondok Melati, Rawalumbu, Cikarang (Barat, Timur, Selatan, Utara, Pusat), Tambun, Cibitung, Babelan, Tarumajaya, hingga kawasan perbatasan Jakarta Timur, Depok, dan Bogor. Armada kami disiagakan di pos-pos strategis agar dapat menjangkau lokasi Anda secepat mungkin.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 3 */}
              <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(2)}
                  aria-expanded={openFaq === 2}
                >
                  <span className="faq-question-text">
                    <span className="faq-badge-num">03</span>
                    Apakah armada truk bisa menjangkau lokasi rumah di dalam gang sempit?
                  </span>
                  <span className="faq-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                {openFaq === 2 && (
                  <div className="faq-answer">
                    <p>
                      <strong>Tentu bisa!</strong> Kami memiliki unit armada berukuran kompak (truk engkel lincah) serta sambungan selang sedot ekstra panjang hingga <strong>50 sampai 100+ meter</strong>. Rumah, kontrakan, ruko, ataupun kos-kosan di gang padat yang tidak dapat dilalui truk besar tetap dapat kami tangani dengan bersih, rapi, dan tanpa mengganggu aktivitas warga sekitar.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 4 */}
              <div className={`faq-item ${openFaq === 3 ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(3)}
                  aria-expanded={openFaq === 3}
                >
                  <span className="faq-question-text">
                    <span className="faq-badge-num">04</span>
                    Berapa lama estimasi waktu kedatangan armada setelah saya memesan?
                  </span>
                  <span className="faq-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                {openFaq === 3 && (
                  <div className="faq-answer">
                    <p>
                      Tim kami memiliki respon super cepat, rata-rata tiba di lokasi dalam waktu <strong>15 hingga 45 menit</strong> setelah konfirmasi alamat (menyesuaikan jarak tempuh dan kondisi arus lalu lintas). Layanan kami siaga penuh <strong>24 jam sehari, 7 hari seminggu</strong>, baik pagi, siang, larut malam, hari kerja, akhir pekan, maupun hari libur nasional.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 5 */}
              <div className={`faq-item ${openFaq === 4 ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(4)}
                  aria-expanded={openFaq === 4}
                >
                  <span className="faq-question-text">
                    <span className="faq-badge-num">05</span>
                    Apakah pelancaran pipa mampet memerlukan pembongkaran lantai atau keramik?
                  </span>
                  <span className="faq-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                {openFaq === 4 && (
                  <div className="faq-answer">
                    <p>
                      <strong>Sama sekali tanpa bongkar!</strong> Kami menggunakan teknologi modern berupa mesin *drain cleaning* berkekuatan tinggi serta kawat spiral baja elastis (rodding system) yang bekerja secara presisi menembus dan menghancurkan sumbatan lemak, kotoran, atau endapan kerak di dalam saluran tanpa merusak ubin lantai ataupun instalasi pipa bangunan Anda.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 6 */}
              <div className={`faq-item ${openFaq === 5 ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(5)}
                  aria-expanded={openFaq === 5}
                >
                  <span className="faq-question-text">
                    <span className="faq-badge-num">06</span>
                    Apakah ada garansi setelah pengerjaan selesai?
                  </span>
                  <span className="faq-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                {openFaq === 5 && (
                  <div className="faq-answer">
                    <p>
                      <strong>Ya, kami memberikan garansi tuntas!</strong> Setelah pengerjaan sedot septic tank atau pelancaran selesai dilakukan, teknisi kami wajib melakukan uji coba siram (test flush) bersama Anda guna memastikan aliran air dan kotoran sudah kembali normal 100%. Pembayaran baru dilakukan setelah Anda benar-benar puas dengan hasil kerja kami.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Call to Action Banner */}
            <div className="faq-cta-box fade-in visible">
              <div className="faq-cta-content">
                <h4>Punya Pertanyaan Lain Seputar Layanan & Harga?</h4>
                <p>Konsultasikan kendala WC dan saluran air Anda dengan tim teknisi kami secara gratis 24 jam.</p>
              </div>
              <a
                href="https://wa.me/6285715654183?text=Halo%20Mitra%20Bersih,%20saya%20ingin%20tanya%20estimasi%20harga%20dan%20jadwal%20layanan"
                className="faq-cta-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
                Tanya Kami via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / TESTIMONI */}
      <section className="trust">
        <div className="container">
          <div className="section-header fade-in visible">
            <span className="section-badge">TESTIMONI</span>
            <h2 className="section-title">Kepercayaan Pelanggan</h2>
            <p className="section-subtitle">
              Ribuan pelanggan telah mempercayai layanan kami. Berikut adalah beberapa keunggulan dan testimoni dari mereka.
            </p>
          </div>

          <div className="badges-row fade-in visible">
            <div className="badge-pill">
              <i className="fas fa-star"></i>
              <span>98% Kepuasan</span>
            </div>
            <div className="badge-pill">
              <i className="fas fa-bolt"></i>
              <span>Respon Cepat</span>
            </div>
            <div className="badge-pill">
              <i className="fas fa-shield-alt"></i>
              <span>Layanan Terjamin</span>
            </div>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card fade-in visible">
              <i className="fas fa-quote-right quote-icon"></i>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "Pelayanannya sangat cepat dan profesional. Saya telepon malam, kurang dari 30 menit langsung datang. WC saya yang mampet langsung beres. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">B</div>
                <div className="author-info">
                  <strong>Budi Santoso</strong>
                  <span>Pondok Gede, Bekasi</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card fade-in fade-in-delay-1 visible">
              <i className="fas fa-quote-right quote-icon"></i>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "Harga transparan, tidak menaikkan harga di tengah pekerjaan. Petugasnya ramah dan bersih. Septic tank penuh langsung teratasi. Terima kasih Mitra Bersih!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <strong>Siti Rahayu</strong>
                  <span>Jatiasih, Bekasi</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card fade-in fade-in-delay-2 visible">
              <i className="fas fa-quote-right quote-icon"></i>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "Sudah langganan untuk sedot limbah STP di ruko saya. Selalu tepat waktu, armada bersih, dan pelayanan ramah. Sangat membantu kelancaran usaha saya."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <strong>Ahmad Hidayat</strong>
                  <span>Bekasi Selatan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="galeri" id="galeri">
        <div className="container">
          <div className="section-header fade-in visible">
            <span className="section-badge">DOKUMENTASI</span>
            <h2 className="section-title">Galeri Aktivitas Kami</h2>
            <p className="section-subtitle">
              Bukti nyata pengerjaan tim profesional kami di lapangan dengan armada modern dan standar keselamatan kerja.
            </p>
          </div>

          <div className="gallery-grid fade-in visible">
            {galleryData.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => openLightbox(item.image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openLightbox(item.image);
                }}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <div className="gallery-icon">
                  <i className="fas fa-expand"></i>
                </div>
                <div className="gallery-overlay">
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREA LAYANAN */}
      <section className="area" id="kontak">
        <div className="container">
          <div className="section-header fade-in visible">
            <span className="section-badge">WILAYAH LAYANAN</span>
            <h2 className="section-title">Area Layanan Kami</h2>
            <p className="section-subtitle">
              Kami melayani seluruh wilayah Kota Bekasi dan sekitarnya dengan respon cepat.
            </p>
          </div>

          <div className="area-content">
            <div className="area-illustration fade-in visible">
              <i className="fas fa-map-marked-alt icon-big"></i>
              <h3>Kota Bekasi & Sekitarnya</h3>
              <p>
                Cakupan area layanan kami meliputi seluruh kecamatan di Kota Bekasi dengan waktu tempuh tercepat.
              </p>
            </div>

            <div className="area-list fade-in fade-in-delay-1 visible">
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Bantargebang
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Bekasi Barat
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Bekasi Selatan
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Bekasi Timur
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Bekasi Utara
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Jatiasih
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Jatisampurna
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Medan Satria
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Mustikajaya
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Pondok Gede
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Pondok Melati
              </div>
              <div className="area-item">
                <i className="fas fa-check-circle"></i> Rawalumbu
              </div>
              <div className="area-more">
                <i className="fas fa-location-arrow"></i> Dan kecamatan sekitarnya
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Informasi Kontak</h4>
              <div className="footer-contact-item">
                <i className="fas fa-phone-alt"></i>
                <div className="info">
                  <span>Telepon / WhatsApp</span>
                  <strong>+62 857-1565-4183</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fab fa-whatsapp"></i>
                <div className="info">
                  <span>WhatsApp</span>
                  <strong>+62 857-1565-4183</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <div className="info">
                  <span>Email</span>
                  <strong>info@mitraberih24.com</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info">
                  <span>Alamat</span>
                  <strong>Kota Bekasi, Jawa Barat</strong>
                </div>
              </div>

              <div className="social-row">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/6285715654183" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Layanan</h4>
              <ul className="footer-links">
                <li>
                  <a href="#layanan" onClick={(e) => scrollTo(e, '#layanan')}>
                    <i className="fas fa-chevron-right"></i> Sedot WC Lengkap
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollTo(e, '#layanan')}>
                    <i className="fas fa-chevron-right"></i> Pelancaran Saluran Mampet
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollTo(e, '#layanan')}>
                    <i className="fas fa-chevron-right"></i> Sedot Limbah STP
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollTo(e, '#layanan')}>
                    <i className="fas fa-chevron-right"></i> Sedot Septic Tank
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollTo(e, '#layanan')}>
                    <i className="fas fa-chevron-right"></i> Perawatan Saluran Pipa
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Lainnya</h4>
              <ul className="footer-links">
                <li>
                  <a href="#tentang" onClick={(e) => scrollTo(e, '#tentang')}>
                    <i className="fas fa-chevron-right"></i> Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => scrollTo(e, '#faq')}>
                    <i className="fas fa-chevron-right"></i> FAQ (Tanya Jawab)
                  </a>
                </li>
                <li>
                  <a href="#galeri" onClick={(e) => scrollTo(e, '#galeri')}>
                    <i className="fas fa-chevron-right"></i> Galeri
                  </a>
                </li>
                <li>
                  <a href="#kontak" onClick={(e) => scrollTo(e, '#kontak')}>
                    <i className="fas fa-chevron-right"></i> Kontak
                  </a>
                </li>
                <li>
                  <a href="#home" onClick={(e) => scrollTo(e, '#home')}>
                    <i className="fas fa-chevron-right"></i> Beranda
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="brand">SEDOT WC MITRA BERSIH 24JAM</div>
            <div className="copyright">&copy; 2024 Mitra Bersih 24Jam. All Rights Reserved.</div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/6285715654183"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div className="lightbox active" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Tutup"
          >
            <i className="fas fa-times"></i>
          </button>
          <img
            src={lightboxImg}
            alt="Gambar Galeri Besar"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
