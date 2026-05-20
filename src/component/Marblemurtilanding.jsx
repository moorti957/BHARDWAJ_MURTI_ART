import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView,  } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Star, ChevronDown, Menu, X, Play,
  Award, Shield, Truck, Gem, Users, Heart, ArrowRight, CheckCircle,
   ExternalLink, MessageCircle, Sparkles, Crown,



Globe,
Package
} from "lucide-react";

import {
  Download,
  Share2,
  FolderOpen,
} from "lucide-react";

import { QRCodeCanvas } from "qrcode.react";



import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

import logo from "../assets/img/download.png";

import Shiv from "../assets/img/shiv.jpg";
import Ganesh from "../assets/img/Ganesh..jpg";
import Krishna from "../assets/img/Krishna.jpg";
import Hanuman from "../assets/img/Hanuman.jpg";
import Human from "../assets/img/human.jpg";
import shop1 from "../assets/img/1.jpg";
import shop2 from "../assets/img/2.jpg";
import shop3 from "../assets/img/3.jpg";
import shop4 from "../assets/img/4.jpg";
import shop5 from "../assets/img/5.jpg";
import lu from "../assets/img/lu.webp";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Collection", "Videos", "Reviews", "Contact"];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Customers" },
  { value: "200+", label: "Murti Designs" },
  { value: "98%", label: "Satisfaction Rate" },
];

const SHOP_IMAGES = [
shop1,
shop2,
shop3,
shop4,
shop5,

];

const PRODUCTS = [
  { id: 1, name: "Ganesh Marble Statue", material: " White Makrana Marble",Image:Ganesh,  category: "Ganesh", emoji: "🐘", gradient: "from-amber-50 to-yellow-100", accent: "#B8860B" },
  { id: 2, name: "Krishna Marble Statue", material: "White Marble",Image:Krishna, category: "Krishna", emoji: "🦚", gradient: "from-blue-50 to-indigo-100", accent: "#4B0082" },
  { id: 3, name: "Shiv Marble Statue", material: "White Marble ", Image:Shiv, category: "Shiva", gradient: "from-slate-100 to-gray-200", accent: "#2F4F4F" },
  { id: 4, name: "Lakshmi Ji", material: "Pink Marble",  category: "Lakshmi", Image:lu, gradient: "from-rose-50 to-pink-100", accent: "#8B0000" },
  { id: 5, name: "Human Marble Statue", material: "White Marble ", Image:Human,  category: "Human", emoji: "🎵", gradient: "from-yellow-50 to-amber-100", accent: "#DAA520" },
  { id: 6, name: "Hanuman Marble Statue", material: "Red Agra Marble",Image:Hanuman,   category: "Hanuman", emoji: "🌅", gradient: "from-orange-50 to-red-100", accent: "#8B4513" },
];

const VIDEOS = [

  {
    id: "0gGB6W7oVf8",
    title: "Marble Mahadev shivling",
    duration: "0:32",
    views: "20K",
  },

  {
    id: "P8iNUtIj7-k",
    title: "Marble melody mata",
    duration: "0:28",
    views: "8.4K",
  },

  {
    id: "Osk5-vW0cvM",
    title: "Making marble durga Mata ",
    duration: "0:36",
    views: "6.8K",
  },

  {
    id: "HJpXzuuQ6NM",
    title: "Marble khatu Shyam ji 😍",
    duration: "0:40",
    views: "2.4K",
  },

];

const TESTIMONIALS = [
  { name: "Rajesh Sharma", city: "Jaipur", rating: 5, text: "Absolutely divine craftsmanship. The Ganesh Ji murti I ordered is breathtaking. Every detail is perfect. Highly recommended!", verified: true },
  { name: "Priya Gupta", city: "Delhi", rating: 5, text: "Ordered a Radha Krishna murti for our new home. The quality of marble and the intricate work is beyond expectations. Will order again!", verified: true },
  { name: "Anand Patel", city: "Mumbai", rating: 5, text: "10 years of experience shows in every piece. The Shiva Lingam we got is magnificent. Puja feels more sacred now.", verified: true },
  { name: "Sunita Agarwal", city: "Bangalore", rating: 5, text: "IndiaMART verified seller. Very trustworthy. Packaging was superb, delivery on time. The murti is exactly as shown.", verified: true },
];

const WHY_US = [
  { icon: Gem, title: "Premium Marble", desc: "Only finest Makrana and Italian marble sourced directly", color: "#B8860B" },
  { icon: Heart, title: "Handcrafted Love", desc: "Every piece hand-sculpted by master artisans with decades of experience", color: "#8B0000" },
  { icon: Shield, title: "Trusted Quality", desc: "Justdial verified seller with 10+ years of excellence", color: "#2F4F4F" },
  { icon: Truck, title: "Safe Delivery", desc: "Expert packaging ensuring your sacred murti arrives perfectly", color: "#4B0082" },
  { icon: Users, title: "Custom Orders", desc: "Get your deity sculpted in any size, pose, or specification", color: "#8B4513" },
  { icon: Award, title: "Expert Team", desc: "Team of 25+ skilled artisans trained in traditional Rajasthani craft", color: "#006400" },
];

// ─── UTILITY ────────────────────────────────────────────────────────────────

const WHATSAPP = "918000865883";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=Namaste%21%20I%20am%20interested%20in%20your%20marble%20murtis.`;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

function useCounter(target, duration = 2000, inView) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const step = Math.ceil(num / (duration / 16));
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, num);
      setCount(cur);
      if (cur >= num) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return count;
}

// ─── MARBLE TEXTURE BACKGROUND ─────────────────────────────────────────────

function MarbleBackground({ className = "", opacity = 0.06 }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="marble">
          <feTurbulence type="turbulence" baseFrequency="0.015 0.008" numOctaves="6" seed="2" result="noise" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.5" intercept="-0.2" />
            <feFuncG type="linear" slope="1.3" intercept="-0.1" />
            <feFuncB type="linear" slope="1.2" intercept="-0.05" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#marble)" fill="#d4a96a" />
      </svg>
    </div>
  );
}

// ─── OM SYMBOL ──────────────────────────────────────────────────────────────

function OmSymbol({ size = 40, color = "#B8860B", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
      <text x="50" y="72" textAnchor="middle" fontSize="72" fontFamily="serif" fill={color} opacity="0.9">ॐ</text>
    </svg>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone-950/90 backdrop-blur-xl shadow-2xl border-b border-amber-900/20" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scroll("home")}>
   <img 
  src={logo} 
  className="w-10 h-10 object-cover rounded-full border-2 border-yellow-500 shadow-lg shadow-yellow-500/30"
  alt="logo" 
/>
          
          <div>
            <div className="font-serif text-amber-300 text-lg sm:text-xl leading-none tracking-wide">BHARDWAJ</div>
            <div className="text-amber-600/70 text-xs tracking-widest uppercase">MURTI ART</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scroll(link)} className="text-amber-100/80 hover:text-amber-300 text-sm tracking-wider transition-colors duration-200 font-light uppercase">{link}</button>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
            className="px-5 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 rounded-full text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105">
            Order Now
          </a>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-amber-300 p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-950/95 backdrop-blur-xl border-t border-amber-900/20">
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scroll(link)} className="text-amber-100/80 text-left text-base tracking-wider uppercase border-b border-amber-900/20 pb-3">{link}</button>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                className="w-full text-center py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 rounded-full font-semibold">
                Order Now on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-stone-950">
      {/* Marble texture */}
      <MarbleBackground opacity={0.08} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/60" />

      {/* Floating decorative circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full border border-amber-600/10"
          style={{ width: 200 + i * 120, height: 200 + i * 120, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
          transition={{ duration: 30 + i * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Large Om watermark */}
      <motion.div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block"
        style={{ y }}
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity }}>
        <OmSymbol size={400} color="#D4AF37" />
      </motion.div>

      {/* Floating gold orbs */}
      <motion.div className="absolute top-32 right-1/4 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }} />
      <motion.div className="absolute bottom-32 left-1/4 w-96 h-96 rounded-full bg-yellow-600/8 blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }} />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600/30 bg-amber-600/10 backdrop-blur-sm mb-8">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-amber-300 text-xs tracking-widest uppercase font-medium">Justdial Verified Premium Seller</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-6">
            <span className="block text-amber-300">BHARDWAJ</span>
            <span className="block">MURTI</span>
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">ART</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-amber-100/70 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-xl">
            Handcrafted from the finest Makrana marble — where devotion meets artistry. Each murti is a sacred masterpiece, carved with love and tradition.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-wrap gap-4 mb-16">
            <button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 rounded-full font-semibold text-base tracking-wide hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              View Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="group px-8 py-4 border border-amber-500/40 text-amber-300 rounded-full font-semibold text-base tracking-wide hover:bg-amber-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Stats row */}
         
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-amber-500/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-amber-500/50" />
      </motion.div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function StatCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(target, 2000, inView);
  return <span ref={ref}>{count}{suffix}</span>;
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showCallPopup, setShowCallPopup] = useState(false);
const [showWhatsPopup, setShowWhatsPopup] = useState(false);

  const badges = [
    { icon: Shield, text: "IndiaMART Verified" },
    { icon: Award, text: "Premium Quality" },
    { icon: CheckCircle, text: "GST Registered" },
    { icon: Crown, text: "Master Artisans" },
  ];

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 bg-gradient-to-b from-stone-950 to-stone-900 overflow-hidden">
      <MarbleBackground opacity={0.05} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-amber-600/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <OmSymbol size={28} color="#D4AF37" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Our Sacred <span className="text-amber-300">Legacy</span></h2>
          <p className="text-amber-100/50 text-lg max-w-2xl mx-auto font-light">A decade of devotion crafted into every piece of stone</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}>
            <div className="relative">
              {/* Decorative marble slab visual */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 border border-amber-600/20 p-10">
                <MarbleBackground opacity={0.15} />
                <div className="relative z-10">
                  <OmSymbol size={80} color="#D4AF37" className="mb-6 opacity-80" />
                  <h3 className="font-serif text-3xl text-amber-200 mb-4">BHARDWAJ MURTI ART</h3>
                  <p className="text-amber-100/60 leading-relaxed text-base mb-6">
                    Established with a divine mission, we have been crafting sacred marble murtis for over a decade from the marble capital of India — Ramgarh , Rajasthan. Our artisans carry forward generations of traditional Rajasthani stone-carving heritage.
                  </p>
                  <p className="text-amber-100/60 leading-relaxed text-base">
                    Every murti that leaves our workshop carries with it prayers, precision, and passion. We use only the finest Makrana white marble — the same stone that was used to build the Taj Mahal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right stats + badges */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { n: "10", s: "+", label: "Years of Excellence", color: "from-amber-600/20 to-yellow-600/10" },
                { n: "500", s: "+", label: "Happy Customers", color: "from-rose-900/20 to-red-900/10" },
                { n: "200", s: "+", label: "Murti Designs", color: "from-indigo-900/20 to-purple-900/10" },
                { n: "98", s: "%", label: "Satisfaction Rate", color: "from-green-900/20 to-emerald-900/10" },
              ].map((s, i) => (
                <motion.div key={i} variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
                  whileHover={{ scale: 1.04 }}
                  className={`bg-gradient-to-br ${s.color} border border-amber-600/15 rounded-2xl p-6 text-center backdrop-blur-sm`}>
                  <div className="font-serif text-4xl text-amber-300 font-bold mb-1">
                    <StatCounter target={s.n} suffix={s.s} />
                  </div>
                  <div className="text-amber-100/50 text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {badges.map((b, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 2}
                  className="flex items-center gap-3 bg-white/5 border border-amber-600/15 rounded-xl px-4 py-3">
                  <b.icon size={18} className="text-amber-400 shrink-0" />
                  <span className="text-amber-100/70 text-sm">{b.text}</span>
                </motion.div>
              ))}
            </div>


            
          </div>
        </div>

        {/* Contact Action Cards */}

        {/* Social Media & Brand Presence */}

<motion.div
  variants={fadeUp}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  custom={4}
  className="relative mt-14 mb-6"
>
  {/* Top line */}
  <div className="flex items-center justify-center gap-3 mb-8">
    <div className="w-14 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
    
    <div className="px-4 py-1 rounded-full border border-amber-600/20 bg-amber-500/5 backdrop-blur-sm">
      <span className="text-[11px] tracking-[0.25em] uppercase text-amber-300/70">
        Connect With Us
      </span>
    </div>

    <div className="w-14 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
  </div>

  {/* Cards */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

    {/* Facebook */}
    <motion.a
      whileHover={{ y: -6, scale: 1.03 }}
      href="https://www.facebook.com/bhardwajmurtiart1?mibextid=ZbWKwL"
      className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-stone-900 to-stone-800 p-5 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/10 transition-all duration-500" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-3">
        <FaFacebook className="text-blue-400" size={28} />
      </div>

      <span className="relative z-10 text-amber-100/80 text-sm font-medium">
        Facebook
      </span>

      <span className="relative z-10 text-[11px] text-amber-100/35 mt-1">
        Official Page
      </span>
    </motion.a>

    {/* Instagram */}
    <motion.a
      whileHover={{ y: -6, scale: 1.03 }}
      href="https://www.instagram.com/bhardwajmurtiart1?igsh=MTdld2RtajR3MWU5bA%3D%3D"
      className="group relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-stone-900 to-stone-800 p-5 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-pink-500/10 transition-all duration-500" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-pink-500/15 border border-pink-500/20 flex items-center justify-center mb-3">
        <FaInstagram className="text-pink-400" size={28} />
      </div>

      <span className="relative z-10 text-amber-100/80 text-sm font-medium">
        Instagram
      </span>

      <span className="relative z-10 text-[11px] text-amber-100/35 mt-1">
        Daily Updates
      </span>
    </motion.a>

    {/* YouTube */}
    <motion.a
      whileHover={{ y: -6, scale: 1.03 }}
      href="https://www.youtube.com/@bhardwajmurtiart1?si=WVSWZMAzIHKDyfd9"
      className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-stone-900 to-stone-800 p-5 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-red-500/10 transition-all duration-500" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mb-3">
        <FaYoutube className="text-red-400" size={28} />
      </div>

      <span className="relative z-10 text-amber-100/80 text-sm font-medium">
        YouTube
      </span>

      <span className="relative z-10 text-[11px] text-amber-100/35 mt-1">
        Watch Crafting
      </span>
    </motion.a>

    {/* Google */}
    <motion.a
      whileHover={{ y: -6, scale: 1.03 }}
      href="https://www.google.com/search?client=ms-android-oneplus-rvo3&hs=PuW&sca_esv=7cae0ba7a4b07b45&cs=0&output=search&kgmid=/g/11ng762hxf&q=Bhardwaj+Murti+Art+ramnagar&shem=rimspwouoe&shndl=30&source=sh/x/loc/act/m1/2&kgs=673c84357d8ca716&utm_source=rimspwouoe,sh/x/loc/act/m1/2"
      className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-stone-900 to-stone-800 p-5 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-yellow-500/10 transition-all duration-500" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center mb-3">
        <Globe className="text-yellow-400" size={28} />
      </div>

      <span className="relative z-10 text-amber-100/80 text-sm font-medium">
        Google
      </span>

      <span className="relative z-10 text-[11px] text-amber-100/35 mt-1">
        Reviews & Maps
      </span>
    </motion.a>

    {/* IndiaMart */}
    <motion.a
      whileHover={{ y: -6, scale: 1.03 }}
      href="https://www.justdial.com/Alwar/Bhardwaj-Murti-Arts/9999PX144-X144-230605153433-D8L8_BZDET"
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-stone-900 to-stone-800 p-5 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-500/10 transition-all duration-500" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center mb-3">
        <Shield className="text-cyan-400" size={28} />
      </div>

      <span className="relative z-10 text-amber-100/80 text-sm font-medium">
        Justdial
      </span>

      <span className="relative z-10 text-[11px] text-amber-100/35 mt-1">
        Verified Seller
      </span>
    </motion.a>

    {/* Website */}
    <motion.a
      whileHover={{ y: -6, scale: 1.03 }}
      href=""
      className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-stone-900 to-stone-800 p-5 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-purple-500/10 transition-all duration-500" />
      
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mb-3">
        <ExternalLink className="text-purple-400" size={28} />
      </div>

      <span className="relative z-10 text-amber-100/80 text-sm font-medium">
        Website
      </span>

      <span className="relative z-10 text-[11px] text-amber-100/35 mt-1">
        Visit Store
      </span>
    </motion.a>

  </div>
</motion.div>

{/* ───────── CONTACT ACTION CARDS ───────── */}



<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">

  {/* CALL CARD */}
  <div className="relative">
    <button
      onClick={() => setShowCallPopup(!showCallPopup)}
      className="w-full flex flex-col items-center justify-center bg-white/5 border border-amber-600/20 rounded-2xl p-5 hover:bg-amber-500/10 transition-all duration-300"
    >
      <Phone className="text-amber-400 mb-3" size={24} />

      <span className="text-amber-100 text-sm font-medium text-center leading-tight">
        Pawan Bhardwaj
      </span>

      <span className="text-amber-100/60 text-xs mt-1 text-center">
        Harkesh Bhardwaj
      </span>

      <span className="text-amber-500/70 text-[11px] mt-1">
        + Others
      </span>
    </button>

    {/* POPUP */}
    <AnimatePresence>
      {showCallPopup && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute z-50 left-1/2 -translate-x-1/2 mt-3 w-72 bg-stone-900 border border-amber-600/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
        >

          <div className="space-y-3">

            <a
              href="tel:9166880202"
              className="flex items-center justify-between bg-white/5 hover:bg-amber-500/10 rounded-xl p-3 transition-all"
            >
              <div>
                <div className="text-amber-200 text-sm font-medium">
                  Pawan Bhardwaj
                </div>

                <div className="text-amber-100/50 text-xs">
                  9166880202
                </div>
              </div>

              <Phone size={16} className="text-amber-400" />
            </a>

            <a
              href="tel:9672224698"
              className="flex items-center justify-between bg-white/5 hover:bg-amber-500/10 rounded-xl p-3 transition-all"
            >
              <div>
                <div className="text-amber-200 text-sm font-medium">
                  Harkesh Bhardwaj
                </div>

                <div className="text-amber-100/50 text-xs">
                  9672224698
                </div>
              </div>

              <Phone size={16} className="text-amber-400" />
            </a>

            <a
              href="tel:9166880202"
              className="flex items-center justify-between bg-white/5 hover:bg-amber-500/10 rounded-xl p-3 transition-all"
            >
              <div>
                <div className="text-amber-200 text-sm font-medium">
                  Abhishek Bhardwaj
                </div>

                <div className="text-amber-100/50 text-xs">
                  9166880202
                </div>
              </div>

              <Phone size={16} className="text-amber-400" />
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* WHATSAPP CARD */}
  <div className="relative">
    <button
      onClick={() => setShowWhatsPopup(!showWhatsPopup)}
      className="w-full flex flex-col items-center justify-center bg-white/5 border border-amber-600/20 rounded-2xl p-5 hover:bg-green-500/10 transition-all duration-300"
    >
      <MessageCircle className="text-green-400 mb-3" size={24} />

      <span className="text-amber-100 text-sm font-medium text-center">
        Pawan Bhardwaj
      </span>

      <span className="text-amber-100/60 text-xs mt-1 text-center">
        Harkesh Bhardwaj
      </span>

      <span className="text-green-400/70 text-[11px] mt-1">
        + Others
      </span>
    </button>

    {/* POPUP */}
    <AnimatePresence>
      {showWhatsPopup && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute z-50 left-1/2 -translate-x-1/2 mt-3 w-72 bg-stone-900 border border-green-500/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
        >

          <div className="space-y-3">

            <a
              href="https://wa.me/919166880202"
              target="_blank"
              className="flex items-center justify-between bg-white/5 hover:bg-green-500/10 rounded-xl p-3 transition-all"
            >
              <div>
                <div className="text-amber-200 text-sm font-medium">
                  Pawan Bhardwaj
                </div>

                <div className="text-amber-100/50 text-xs">
                  WhatsApp Chat
                </div>
              </div>

              <MessageCircle size={16} className="text-green-400" />
            </a>

            <a
              href="https://wa.me/919672224698"
              target="_blank"
              className="flex items-center justify-between bg-white/5 hover:bg-green-500/10 rounded-xl p-3 transition-all"
            >
              <div>
                <div className="text-amber-200 text-sm font-medium">
                  Harkesh Bhardwaj
                </div>

                <div className="text-amber-100/50 text-xs">
                  WhatsApp Chat
                </div>
              </div>

              <MessageCircle size={16} className="text-green-400" />
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* LOCATION */}
  <a
    href="https://maps.google.com/?q=Sohna+Alwar+Road+Ramnagar+Near+Little+Flower+School+Goha+Piproli+Alwar+Rajasthan+301026"
    target="_blank"
    className="flex flex-col items-center justify-center bg-white/5 border border-amber-600/20 rounded-2xl p-5 hover:bg-red-500/10 transition-all duration-300"
  >
    <MapPin className="text-red-400 mb-3" size={24} />

    <span className="text-amber-100 text-sm font-medium">
      Location
    </span>

    <span className="text-amber-100/50 text-[11px] text-center mt-1 line-clamp-2">
      Sohna Alwar Road Ramnagar Near Little Flower School...
    </span>
  </a>

  {/* EMAIL */}
  <a
    href="mailto:bhardwajmurtiarts@gmail.com"
    className="flex flex-col items-center justify-center bg-white/5 border border-amber-600/20 rounded-2xl p-5 hover:bg-blue-500/10 transition-all duration-300"
  >
    <Mail className="text-blue-400 mb-3" size={24} />

    <span className="text-amber-100 text-sm font-medium">
      Mail Us
    </span>

    <span className="text-amber-100/50 text-[11px] text-center mt-1 break-all">
      bhardwajmurtiarts@gmail...
    </span>
  </a>

  {/* WEBSITE */}
  <a
    href="https://yourwebsite.com"
    target="_blank"
    className="flex flex-col items-center justify-center bg-white/5 border border-amber-600/20 rounded-2xl p-5 hover:bg-purple-500/10 transition-all duration-300"
  >
    <Globe className="text-purple-400 mb-3" size={24} />

    <span className="text-amber-100 text-sm font-medium">
      Website
    </span>

    <span className="text-amber-100/50 text-[11px] text-center mt-1">
      Bhardwaj Murti Art
    </span>
  </a>

  {/* PRODUCTS */}
  <button
    onClick={() =>
      document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    className="flex flex-col items-center justify-center bg-white/5 border border-amber-600/20 rounded-2xl p-5 hover:bg-yellow-500/10 transition-all duration-300"
  >
    <Package className="text-yellow-400 mb-3" size={24} />

    <span className="text-amber-100 text-sm font-medium">
      Products
    </span>

    <span className="text-amber-100/50 text-[11px] text-center mt-1">
      View Collection
    </span>
  </button>

</div>
      </div>
    </section>
  );
}









// ─── COLLECTION ──────────────────────────────────────────────────────────────

function Collection() {
  const [filter, setFilter] = useState("All");
  const [imgErrors, setImgErrors] = useState({});
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
 
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
 
  // Agar image load na ho toh emoji fallback
  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };
 
  const EMOJI_FALLBACK = {
    Ganesh: "🐘", Krishna: "🦚", Shiva: "🌙",
    Lakshmi: "🪷", Saraswati: "🎵", Hanuman: "🌅",
  };
 
  return (
    <section id="collection" ref={ref} className="relative py-24 sm:py-32 bg-stone-900 overflow-hidden">
      <MarbleBackground opacity={0.06} />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
 
        {/* ── Heading ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <Gem size={20} className="text-amber-400" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
            Sacred <span className="text-amber-300">Collection</span>
          </h2>
          <p className="text-amber-100/50 max-w-xl mx-auto font-light">
            Each piece a meditation in marble, each curve a prayer in stone
          </p>
        </motion.div>
 
        {/* ── Filter Buttons ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300
                ${filter === c
                  ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/30"
                  : "border border-amber-600/25 text-amber-300/70 hover:border-amber-500/50 hover:text-amber-300"
                }`}
            >
              {c}
            </button>
          ))}
        </motion.div>
 
        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                variants={scaleIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-stone-800 to-stone-900 border border-amber-600/15 rounded-3xl overflow-hidden cursor-pointer flex flex-col"
              >
 
                {/* ── Image Area ── */}
                <div className={`relative h-[420px] sm:h-[500px] bg-gradient-to-br ${p.gradient} overflow-hidden flex items-center justify-center`}>
                  <MarbleBackground opacity={0.3} />
 
                  {/* Image — agar load ho */}
                  {!imgErrors[p.id] ? (
                  <motion.img
  src={p.Image}
  alt={p.name}
  onError={() => handleImgError(p.id)}
  className="absolute inset-0 w-full h-full object-cover object-top z-10 scale-110"
  whileHover={{ scale: 1.15 }}
  transition={{ duration: 0.5 }}
/>
                  ) : (
                    // Fallback emoji agar image na mile
                    <motion.div
                      className="text-8xl relative z-10 select-none"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    >
                      {EMOJI_FALLBACK[p.category] || "🪨"}
                    </motion.div>
                  )}
 
                  {/* Hover shine */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 
                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-900/60 to-transparent z-20" />
 
                  {/* Category badge */}
                  <div
                    className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full text-xs font-medium tracking-wide backdrop-blur-sm"
                    style={{
                      background: `${p.accent}33`,
                      color: p.accent,
                      border: `1px solid ${p.accent}55`,
                    }}
                  >
                    {p.category}
                  </div>
                </div>
 
                {/* ── Card Body ── */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-amber-200 mb-1">{p.name}</h3>
                  <p className="text-amber-100/40 text-sm mb-4 flex-1">{p.material}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-amber-400 font-semibold">{p.price}</span>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-amber-300/60 hover:text-amber-300 transition-colors"
                    >
                      Enquire <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
 
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
 
        {/* ── Bottom CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={5}
          className="text-center mt-12"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
          >
            <MessageCircle size={18} />
            Custom Order on WhatsApp
          </a>
        </motion.div>
 
      </div>
    </section>
  );
}


function InstallAppSection() {

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveImage((prev) =>
        prev === SHOP_IMAGES.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const WEBSITE_URL = "https://bhardwaj-murti-art.vercel.app/";

  return (

    <section className="relative py-24 bg-gradient-to-b from-stone-950 to-stone-900 overflow-hidden">

      <MarbleBackground opacity={0.06} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-stone-800/80 to-stone-900 border border-amber-600/20 rounded-[32px] p-8 overflow-hidden"
          >

            <MarbleBackground opacity={0.08} />

            <div className="relative z-10">

              {/* TOP TAG */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 mb-6">
                <Sparkles size={14} className="text-amber-400" />

                <span className="text-amber-300 text-xs tracking-[0.25em] uppercase">
                  Install Mobile App
                </span>
              </div>

              {/* TITLE */}
              <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-5">
                Download Our
                <span className="block text-amber-300">
                  Marble App
                </span>
              </h2>

              {/* DESCRIPTION */}
              <p className="text-amber-100/60 leading-relaxed mb-8 max-w-lg">
                Scan the QR code or install directly to access
                our premium marble murti collection like a real app.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mb-8">

                <a
                  href={WEBSITE_URL}
                  className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <Download size={18} />
                  Install App
                </a>

                <button
                  onClick={() =>
                    navigator.share({
                      title: "Bhardwaj Murti Art",
                      url: WEBSITE_URL,
                    })
                  }
                  className="px-6 py-3 rounded-2xl border border-amber-500/20 text-amber-300 flex items-center gap-2 hover:bg-amber-500/10 transition-all"
                >
                  <Share2 size={18} />
                  Share
                </button>

                <button
                  className="px-6 py-3 rounded-2xl border border-amber-500/20 text-amber-300 flex items-center gap-2 hover:bg-amber-500/10 transition-all"
                >
                  <FolderOpen size={18} />
                  Gallery
                </button>

              </div>

              {/* QR */}
              <div className="inline-block bg-white p-4 rounded-3xl shadow-2xl">

                <QRCodeCanvas
  value={WEBSITE_URL}
  size={180}
  bgColor="#ffffff"
  fgColor="#000000"
  level="H"
/>

              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[650px] rounded-[36px] overflow-hidden border border-amber-600/20"
          >

            <AnimatePresence mode="wait">

              <motion.img
                key={activeImage}
                src={SHOP_IMAGES[activeImage]}
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -120 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
              />

            </AnimatePresence>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* TEXT */}
            <div className="absolute bottom-0 left-0 right-0 p-8">

              <div className="text-amber-300 text-sm tracking-[0.3em] uppercase mb-3">
                Premium Marble Collection
              </div>

              <h3 className="font-serif text-4xl text-white leading-tight">
                Experience Divine
                <span className="block text-amber-300">
                  Marble Craftsmanship
                </span>
              </h3>

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  );
}






// ─── VIDEO GALLERY ───────────────────────────────────────────────────────────

function VideoCard({ video, index, inView }) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"} custom={index}
      whileHover={{ y: -6 }}
      className="group relative bg-stone-900 border border-amber-600/15 rounded-3xl overflow-hidden cursor-pointer">
      <div className="relative aspect-video bg-gradient-to-br from-stone-800 to-stone-950 overflow-hidden">
        {playing ? (
          <iframe
  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&rel=0`}
  title={video.title}
  className="absolute inset-0 w-full h-full"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>
        ) : (
          <>
            <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
            <button onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400/60 backdrop-blur-sm flex items-center justify-center">
                <Play size={24} className="text-amber-300 ml-1" fill="currentColor" />
              </motion.div>
            </button>
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-stone-950/80 rounded text-amber-300/70 text-xs">{video.duration}</div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-amber-100/40 text-xs">
              <Users size={10} /> {video.views} views
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-serif text-amber-200 text-base">{video.title}</h4>
      </div>
    </motion.div>
  );
}

function Videos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="videos" ref={ref} className="relative py-24 sm:py-32 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
      <MarbleBackground opacity={0.05} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <Play size={18} className="text-amber-400" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Watch Our <span className="text-amber-300">Craft</span></h2>
          <p className="text-amber-100/50 max-w-xl mx-auto font-light">See how divine marble is transformed into sacred art</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          {VIDEOS.map((v, i) => <VideoCard key={i} video={v} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" ref={ref} className="relative py-24 sm:py-32 bg-stone-950 overflow-hidden">
      <MarbleBackground opacity={0.07} />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 to-stone-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <Star size={18} className="text-amber-400" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Customer <span className="text-amber-300">Blessings</span></h2>
          <p className="text-amber-100/50 max-w-xl mx-auto font-light">Words from those who brought our murtis home</p>
        </motion.div>

        {/* Featured review */}
        <motion.div variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"} className="max-w-3xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-stone-800/80 to-stone-900/80 border border-amber-600/20 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-sm">
              <MarbleBackground opacity={0.1} />
              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-amber-400" fill="currentColor" />)}
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl text-amber-100/80 leading-relaxed mb-8 italic">
                  "{TESTIMONIALS[active].text}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center text-stone-950 font-bold">
                    {TESTIMONIALS[active].name[0]}
                  </div>
                  <div className="text-left">
                    <div className="text-amber-300 font-medium text-sm">{TESTIMONIALS[active].name}</div>
                    <div className="text-amber-100/40 text-xs flex items-center gap-1">
                      <MapPin size={10} /> {TESTIMONIALS[active].city}
                      {TESTIMONIALS[active].verified && <span className="ml-2 text-green-400">✓ Verified</span>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${active === i ? "w-8 h-2 bg-amber-500" : "w-2 h-2 bg-amber-800/60"}`} />
          ))}
        </div>

        {/* All cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
              whileHover={{ y: -4 }}
              className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${active === i ? "border-amber-500/50 bg-amber-600/10" : "border-amber-600/15 bg-stone-900/60"}`}
              onClick={() => setActive(i)}>
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} className="text-amber-400" fill="currentColor" />)}
              </div>
              <p className="text-amber-100/60 text-sm leading-relaxed mb-4 line-clamp-3">"{t.text}"</p>
              <div className="text-amber-300 text-xs font-medium">{t.name}</div>
              <div className="text-amber-100/30 text-xs">{t.city}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ───────────────────────────────────────────────────────────

function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-gradient-to-b from-stone-950 to-stone-900 overflow-hidden">
      <MarbleBackground opacity={0.06} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <Crown size={18} className="text-amber-400" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Why Choose <span className="text-amber-300">Us</span></h2>
          <p className="text-amber-100/50 max-w-xl mx-auto font-light">The promise behind every piece we create</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((w, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative bg-gradient-to-br from-stone-800/60 to-stone-900/80 border border-amber-600/15 rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${w.color}15, transparent 70%)` }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border"
                  style={{ background: `${w.color}18`, borderColor: `${w.color}35` }}>
                  <w.icon size={24} style={{ color: w.color }} />
                </div>
                <h3 className="font-serif text-xl text-amber-200 mb-3">{w.title}</h3>
                <p className="text-amber-100/50 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BUSINESS DETAILS ────────────────────────────────────────────────────────

function BusinessDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-stone-900 overflow-hidden">
      <MarbleBackground opacity={0.06} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <MapPin size={18} className="text-amber-400" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Visit Our <span className="text-amber-300">Showroom</span></h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <motion.div variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="rounded-3xl overflow-hidden border border-amber-600/20 h-80 lg:h-full min-h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.7359425571935!2d76.7947567098514!3d27.570704431408096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39729595459f211b%3A0xa46d009dac88378c!2sBhardwaj%20Murti%20Art%20ramnagar!5e0!3m2!1sen!2sin!4v1779280047831!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" className="grayscale contrast-125" />
          </motion.div>

          {/* Details */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1} className="space-y-5">
            {[
              { icon: MapPin, label: "Address", value: "Sohna Alwar Road Ramnagar Near Little flower School Goha Piproli, Alwar, Rajasthan 301026 " },
              { icon: Phone, label: "Phone", value: "+918000865883", href: "tel:+918000865883" },
              { icon: MessageCircle, label: "WhatsApp", value: "+918000865883", href: WHATSAPP_URL },
              { icon: Mail, label: "Email", value: "bhardwajmurtiarts@gmail.com ", href: "mailto:bhardwajmurtiarts@gmail.com" },
              { icon: Clock, label: "Working Hours", value: "Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM" },
            ].map((d, i) => (
              <motion.div key={i} whileHover={{ x: 4 }}
                className="flex items-start gap-4 bg-stone-800/50 border border-amber-600/15 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-amber-600/15 border border-amber-600/25 flex items-center justify-center shrink-0">
                  <d.icon size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-amber-500/70 text-xs uppercase tracking-wider mb-1">{d.label}</div>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noreferrer" className="text-amber-200 text-sm hover:text-amber-300 transition-colors">{d.value}</a>
                  ) : (
                    <div className="text-amber-200 text-sm">{d.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const sendWA = () => {
    const msg = encodeURIComponent(`Namaste! My name is ${form.name}.\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
      <MarbleBackground opacity={0.07} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-600/60" />
            <MessageCircle size={18} className="text-amber-400" />
            <div className="w-12 h-px bg-amber-600/60" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">Get In <span className="text-amber-300">Touch</span></h2>
          <p className="text-amber-100/50 font-light">We'd love to create something sacred for you</p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="relative bg-gradient-to-br from-stone-800/70 to-stone-900/70 border border-amber-600/20 rounded-3xl p-8 sm:p-12 backdrop-blur-xl overflow-hidden">
          <MarbleBackground opacity={0.12} />
          <div className="relative z-10 space-y-5">
            {[
              { key: "name", label: "Your Name", placeholder: "Ram Kumar", type: "text" },
              { key: "phone", label: "Phone / WhatsApp", placeholder: "+91 98765 43210", type: "tel" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-amber-400/70 text-xs tracking-widest uppercase mb-2">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full bg-stone-900/60 border border-amber-600/20 rounded-xl px-5 py-3.5 text-amber-100 placeholder-amber-100/25 focus:outline-none focus:border-amber-500/50 transition-colors text-sm" />
              </div>
            ))}
            <div>
              <label className="block text-amber-400/70 text-xs tracking-widest uppercase mb-2">Message / Custom Requirements</label>
              <textarea rows={4} placeholder="I am interested in a Ganesh Ji murti, size 12 inches..." value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-stone-900/60 border border-amber-600/20 rounded-xl px-5 py-3.5 text-amber-100 placeholder-amber-100/25 focus:outline-none focus:border-amber-500/50 transition-colors text-sm resize-none" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={sendWA}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-green-500/25 transition-all">
                <MessageCircle size={18} />
                Send on WhatsApp
              </motion.button>
              <a href="tel:+918000865883"
                className="flex-1 py-4 border border-amber-500/40 text-amber-300 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-all">
                <Phone size={18} />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative bg-stone-950 border-t border-amber-900/20 overflow-hidden">
      <MarbleBackground opacity={0.04} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <OmSymbol size={40} color="#D4AF37" />
              <div>
                <div className="font-serif text-amber-300 text-xl">BHARDWAJ MURTI ART</div>
                <div className="text-amber-600/60 text-xs tracking-widest uppercase">Alwar, Rajasthan</div>
              </div>
            </div>
            <p className="text-amber-100/40 text-sm leading-relaxed max-w-xs">
              Crafting divine marble murtis with love, tradition, and the finest Rajasthani artistry since 2014.
            </p>
            <div className="flex gap-3 mt-6">
              {[FaInstagram, FaFacebook, FaYoutube].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-full border border-amber-600/25 flex items-center justify-center text-amber-400/60 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-amber-500/70 text-xs uppercase tracking-widest mb-5 font-medium">Quick Links</div>
            <div className="space-y-3">
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-amber-100/40 hover:text-amber-300 text-sm transition-colors text-left">{l}</button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-amber-500/70 text-xs uppercase tracking-widest mb-5 font-medium">Contact</div>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-amber-100/40 hover:text-amber-300 text-sm transition-colors">
                <Phone size={13} /> +91 8000865883
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-amber-100/40 hover:text-amber-300 text-sm transition-colors">
                <MessageCircle size={13} /> WhatsApp
              </a>
              <div className="flex items-start gap-2 text-amber-100/40 text-sm">
                <MapPin size={13} className="mt-0.5 shrink-0" /> Sohna Alwar Road Ramnagar Near Little flower School Goha Piproli, Alwar, Rajasthan 301026
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-900/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-amber-100/25 text-xs">© 2026 BHARDWAJ MURTI ART. All rights reserved.</div>
          <div className="flex items-center gap-2 text-amber-100/25 text-xs">
            <OmSymbol size={16} color="#B8860B" />
            <span>Made with devotion in Jaipur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ────────────────────────────────────────────────────────

function FloatingWA() {
  return (
    <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 text-white px-4 py-3.5 rounded-full shadow-2xl shadow-green-500/40 hover:bg-green-400 transition-colors group">
      <MessageCircle size={22} fill="white" />
      <span className="text-sm font-semibold hidden sm:block">Order Now</span>
      <motion.div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full"
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity }} />
    </motion.a>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1200);
  }, []);

  return (
    <div className="bg-stone-950 min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center">
            <MarbleBackground opacity={0.08} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="mb-6">
              <OmSymbol size={64} color="#D4AF37" />
            </motion.div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="text-amber-400/70 text-sm tracking-widest uppercase font-light">Loading BHARDWAJ Art…</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <Hero />
      <About />
      <Collection />
      <InstallAppSection />
      <Videos />
      <Reviews />
      <WhyUs />
      <BusinessDetails />
      <Contact />
      <Footer />
      <FloatingWA />
    </div>
  );
}