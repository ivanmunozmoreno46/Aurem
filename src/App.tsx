/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { 
  Speaker, 
  Disc, 
  Radio, 
  Headphones, 
  ChevronRight, 
  ShoppingCart, 
  Menu, 
  X,
  Plus,
  ArrowRight,
  MonitorCheck,
  Zap,
  Box,
  Sliders,
  ArrowLeft,
  Filter,
  Info,
  MapPin,
  Music,
  Clock,
  Calendar
} from 'lucide-react';

// --- Types & Data ---

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  specs: Record<string, string>;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'EOS Reference One',
    category: 'LOUDSPEAKER',
    price: '$24,500',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    description: 'Precision engineered floorstanding speakers with carbon fiber drivers and acoustic alignment technology.',
    specs: {
      'Frequency': '20Hz - 45kHz',
      'Sensitivity': '91dB',
      'Impedance': '4 Ohms',
      'Weight': '52kg'
    }
  },
  {
    id: '2',
    name: 'VALHALLA T1',
    category: 'AMPLIFIER',
    price: '$12,900',
    image: 'https://images.unsplash.com/photo-1541334812693-0100778641b6?auto=format&fit=crop&q=80&w=800',
    description: 'Vacuum tube integrated amplifier providing the warm, natural signature of pure analogue sound.',
    specs: {
      'Power': '80W Pure Class A',
      'Inputs': '3x RCA, 1x XLR',
      'THD': '< 0.01%',
      'Tube Set': '4x KT150, 2x ECC83'
    }
  },
  {
    id: '3',
    name: 'NOVA PRO II',
    category: 'HEADPHONES',
    price: '$3,200',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    description: 'Planar magnetic headphones designed for critical listening and uncompromised detail retrieval.',
    specs: {
      'Driver': '106mm Planar',
      'Range': '5Hz - 50kHz',
      'Cable': 'Silver OCC Litz',
      'Clarity': 'Exceptional'
    }
  },
  {
    id: '4',
    name: 'ORBITAL MK3',
    category: 'TURNTABLE',
    price: '$8,400',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800',
    description: 'High-mass platter turntable with magnetic levitation bearing and resonance-free chassis.',
    specs: {
      'Platter': '70mm Acrylic',
      'Motor': 'DC decoupled',
      'Wow/Flutter': '0.005%',
      'Base': 'Granite Composite'
    }
  }
];

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 frosted-glass' : 'py-8 bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-glass-border flex items-center justify-center group-hover:border-gold transition-colors">
            <div className="w-1 h-3 bg-white group-hover:bg-gold transition-colors"></div>
          </div>
          <span className="text-xl font-serif tracking-[0.3em] uppercase text-luxury-title">AUREM</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link to="/catalog" className={`micro-label hover:text-white transition-colors ${location.pathname === '/catalog' ? 'text-gold' : ''}`}>Catálogo</Link>
          <Link to="/showrooms" className={`micro-label hover:text-white transition-colors ${location.pathname === '/showrooms' ? 'text-gold' : ''}`}>Showrooms</Link>
          <Link to="/about" className={`micro-label hover:text-white transition-colors ${location.pathname === '/about' ? 'text-gold' : ''}`}>Nosotros</Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-white">
            <ShoppingCart size={18} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-[8px] flex items-center justify-center text-dark font-bold">2</span>
          </button>
          <Menu size={20} className="md:hidden text-white" />
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-glass rounded-xl border border-glass-border relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/audiofallback/800/1000';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
             <div className="flex items-center gap-2 bg-gold text-dark py-2 px-4 rounded-full text-xs font-bold font-sans transition-transform hover:scale-105">
              DETALLES <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </Link>
      
      <div className="mt-6 space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="micro-label">{product.category}</span>
          <span className="font-mono text-[11px] text-text-dim">{product.price}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-light tracking-tight group-hover:text-gold transition-colors">{product.name}</h3>
        </Link>
      </div>
    </motion.div>
  );
};

// --- Page Components ---

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero"
            className="w-full h-full object-cover scale-110 blur-sm"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center space-y-8 max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="micro-label text-gold">EXCELENCIA SONORA</span>
            <h1 className="text-7xl md:text-9xl text-luxury-title mt-4 italic">Pureza <span className="text-white/10 not-italic">Abismal.</span></h1>
            <p className="max-w-xl mx-auto mt-8 font-light text-text-dim leading-relaxed text-lg">
              Redefiniendo el límite entre el silencio y el sonido. Ingeniería acústica de vanguardia aplicada al arte de la escucha.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
          >
            <Link to="/catalog" className="group flex items-center gap-4 bg-gold text-dark px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gold/10">
              EXPLORAR CATÁLOGO <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 text-text-dim cursor-pointer hover:text-white transition-colors">
              <span className="text-sm border-b border-white/10 pb-1">Nuestra Filosofía</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="micro-label">SCROLL</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold/60 to-transparent"></div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="micro-label text-gold">SELECCIÓN AUREM</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">La Colección de Referencia</h2>
          </div>
          <p className="max-w-md text-text-dim font-light leading-relaxed">
            Una curaduría exhaustiva de los componentes más galardonados por la prensa especializada y los audiófilos más puristas del mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {PRODUCTS.map((p, i) => (
            <div key={p.id}>
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Detail (Frosted Glass Panel) */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="micro-label">INGENIERÍA</span>
              <h2 className="text-4xl md:text-6xl text-luxury-title">Precisión <br />Sin Concesiones</h2>
            </div>
            
            <div className="grid gap-8">
              {[
                { icon: Zap, title: "Pure Class A", desc: "Circuitos balanceados de fase cero para una transparencia absoluta." },
                { icon: Sliders, title: "Acoustic Tuning", desc: "Calibración milimétrica para respuesta en frecuencia lineal." },
                { icon: Box, title: "Massive Build", desc: "Materiales aeroespaciales para eliminar cualquier resonancia parásita." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center group-hover:border-gold transition-all duration-500">
                    <item.icon size={20} strokeWidth={1} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-text-dim text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square frosted-glass rounded-3xl p-12 relative flex flex-col justify-between group overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Disc size={200} />
              </div>
              
              <div className="space-y-8 z-10">
                <span className="micro-label text-gold">SPEC SHEET : VALHALLA T1</span>
                <div className="space-y-6">
                  {Object.entries(PRODUCTS[1].specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-baseline border-b border-glass-border pb-4">
                      <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{key}</span>
                      <span className="font-mono text-sm text-white/80">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-glass-border z-10">
                <div className="flex items-center gap-4 text-[10px] font-mono text-gold animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  SYSTEMS OPTIMIZED / SIGNAL CLEAR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const CatalogPage = () => {
  const [filter, setFilter] = useState('ALL');
  const categories = ['ALL', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = filter === 'ALL' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4">
          <span className="micro-label text-gold">CATÁLOGO COMPLETO</span>
          <h1 className="text-5xl font-serif">Sistemas de Referencia</h1>
        </div>
        
        <div className="flex items-center gap-4 border-b border-glass-border pb-4">
          <Filter size={16} className="text-gold" />
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`micro-label transition-colors ${filter === cat ? 'text-gold' : 'hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {filteredProducts.map((p, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={p.id}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <Link to="/catalog" className="inline-flex items-center gap-2 micro-label hover:text-white transition-colors mb-12">
        <ArrowLeft size={14} /> Volver al catálogo
      </Link>

      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[4/5] rounded-3xl overflow-hidden glass-surface border border-glass-border relative"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="micro-label text-gold">{product.category}</span>
            <h1 className="text-6xl text-luxury-title">{product.name}</h1>
            <p className="text-3xl font-mono text-white/80">{product.price}</p>
          </div>

          <div className="space-y-6">
            <h4 className="micro-label flex items-center gap-2"><Info size={14} /> Descripción</h4>
            <p className="text-text-dim text-lg font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 pt-12 border-t border-glass-border">
            <h4 className="micro-label">Especificaciones Técnicas</h4>
            <div className="grid gap-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between items-baseline border-b border-glass-border pb-4">
                  <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{key}</span>
                  <span className="font-mono text-sm text-white/80">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-gold text-dark py-6 rounded-full font-bold tracking-widest uppercase hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-gold/10 flex items-center justify-center gap-4">
            AÑADIR A LA COLECCIÓN <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <span className="micro-label text-gold">NUESTRA HISTORIA</span>
          <h1 className="text-6xl md:text-8xl text-luxury-title leading-tight">El Eco de la <br /> <span className="text-white/20">Perfección.</span></h1>
          <p className="text-text-dim text-xl font-light leading-relaxed max-w-xl">
            Aurem nació de una obsesión compartida por tres ingenieros acústicos en 1994. Su misión era simple pero hercúlea: borrar la línea entre la interpretación en vivo y la reproducción grabada.
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative aspect-video rounded-3xl overflow-hidden glass-surface border border-glass-border"
        >
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" 
            alt="Atelier"
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-12 mb-32">
        {[
          { title: "Filosofía Purista", desc: "No añadimos nada. No quitamos nada. Nuestras máquinas son ventanas transparentes al alma del artista." },
          { title: "Artesanía Radical", desc: "Cada recinto es tallado a mano y cada circuito es soldado por maestros que entienden el peso de cada electrón." },
          { title: "Futuro Analógico", desc: "Abrazamos la tecnología digital solo cuando sirve para elevar la calidez y honestidad de la señal analógica." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="frosted-glass p-12 rounded-3xl space-y-6"
          >
            <h3 className="text-2xl font-serif text-gold">{item.title}</h3>
            <p className="text-text-dim font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <section className="text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="micro-label">EL MANIFIESTO</span>
          <h2 className="text-4xl italic text-luxury-title">"El silencio es el lienzo; el sonido es la pincelada. Aurem es el marco que los hace inmortales."</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30 grayscale saturate-0">
           <img className="rounded-xl" src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=400&auto=format&fit=crop" referrerPolicy="no-referrer" />
           <img className="rounded-xl" src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop" referrerPolicy="no-referrer" />
           <img className="rounded-xl" src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" referrerPolicy="no-referrer" />
           <img className="rounded-xl" src="https://images.unsplash.com/photo-1514320298573-f3e2863765b4?q=80&w=400&auto=format&fit=crop" referrerPolicy="no-referrer" />
        </div>
      </section>
    </div>
  );
};

const ShowroomsPage = () => {
  const showrooms = [
    {
      city: "BERLÍN",
      name: "The Sonic Cathedral",
      description: "Ubicado en un antiguo complejo industrial restaurado, este espacio combina techos de 8 metros con tratamientos acústicos invisibles. Ideal para experimentar la escala completa de nuestros sistemas Reference.",
      features: ["Aislamiento Aeroespacial", "Sistemas de Referencia Full-Stack", "Bar de Vinilos Privado"],
      image: "https://images.unsplash.com/photo-1519643381401-22c77e60530c?auto=format&fit=crop&q=80&w=1200"
    },
    {
      city: "TOKIO",
      name: "The Zen Chamber",
      description: "En el corazón de Ginza, este showroom ofrece un refugio de silencio absoluto. Diseñado bajo principios de armonía zen, es el lugar perfecto para apreciar los detalles más microscópicos de nuestras etapas a válvulas.",
      features: ["Cero Ruido de Fondo (-10dB)", "Jardín Acústico Interior", "Audiciones Individuales"],
      image: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=1200"
    },
    {
      city: "MADRID",
      name: "The Heritage Salon",
      description: "Un palacete del siglo XIX transformado en un laboratorio sonoro. Demostramos cómo la alta fidelidad puede integrarse con el arte clásico y la arquitectura histórica sin comprometer la pureza.",
      features: ["Acústica Arquitectónica", "Showroom de Diseño de Interiores", "Consultoría Personalizada"],
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <header className="mb-24 text-center space-y-6">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="micro-label text-gold"
        >
          SANTUARIOS DEL SONIDO
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl text-luxury-title"
        >
          Showrooms <span className="text-white/20 italic">Globales.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-text-dim text-lg font-light leading-relaxed"
        >
          No vendemos equipos; ofrecemos experiencias sensoriales. Reserve su audición privada en cualquiera de nuestras capitales sonoras.
        </motion.p>
      </header>

      <div className="grid gap-32">
        {showrooms.map((room, i) => (
          <motion.section 
            key={room.city}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className={`space-y-10 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 micro-label text-gold">
                  <MapPin size={14} /> {room.city}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif">{room.name}</h2>
                <p className="text-text-dim font-light leading-relaxed text-lg">
                  {room.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {room.features.map(f => (
                  <div key={f} className="flex items-center gap-4 text-sm font-light text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                    {f}
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-4 border border-gold/40 text-gold px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-dark transition-all duration-500">
                SOLICITAR AUDICIÓN PRIVADA <Calendar size={16} />
              </button>
            </div>

            <div className={`relative aspect-[16/10] overflow-hidden rounded-3xl group ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <div className="absolute inset-0 bg-dark/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img 
                src={room.image} 
                alt={room.name}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 frosted-glass px-4 py-2 rounded-full micro-label text-white z-20">
                {room.city} ATELIER
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      <section className="mt-40 frosted-glass p-16 rounded-[40px] text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Music size={400} className="absolute -bottom-20 -right-20" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl font-serif">Curador de Escucha Personalizado</h3>
          <p className="text-text-dim font-light leading-relaxed">
            ¿No puede visitarnos? Ofrecemos consultas virtuales de alta resolución para ayudarle a diseñar el ecosistema acústico perfecto para su espacio personal.
          </p>
          <button className="bg-white text-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform">
            HABLAR CON UN CURADOR
          </button>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark overflow-x-hidden font-sans text-white relative">
        <div className="bg-mesh" />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/showrooms" element={<ShowroomsPage />} />
        </Routes>

        {/* Footer */}
        <footer className="py-20 border-t border-glass-border">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-white">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif tracking-widest uppercase text-luxury-title">AUREM</span>
              </div>
              <p className="text-text-dim font-light max-w-sm">
                Inmortalizando la música a través de la perfección física. Visite nuestros showrooms exclusivos en Madrid, Berlín y Tokio.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="micro-label">CONTACTO</h5>
              <div className="space-y-2 text-sm text-text-dim font-light">
                <p>info@aurem-audio.com</p>
                <p>+34 900 123 456</p>
              </div>
            </div>

            <div className="space-y-4 text-right">
              <h5 className="micro-label">NEWSLETTER</h5>
              <div className="flex bg-glass rounded-full p-1 border border-glass-border">
                <input type="text" placeholder="Su email" className="bg-transparent border-none focus:outline-none px-4 text-xs w-full text-white" />
                <button className="bg-gold text-dark p-2 rounded-full hover:scale-105 transition-transform"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
