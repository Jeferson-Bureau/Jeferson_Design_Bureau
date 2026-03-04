/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  Compass, 
  Layers, 
  Monitor, 
  Globe, 
  Box,
  BookOpen,
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ArrowLeft,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';

// --- Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md h-16 border-b border-white/10' : 'bg-transparent h-24'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-black" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter">
            Jeferson<span className="text-primary">.</span>Bureau
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {['Projetos', 'Serviços', 'Filosofia'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contato" 
            className="px-6 py-2 border border-primary text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
          >
            Orçamento
          </a>
        </nav>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {['Projetos', 'Serviços', 'Filosofia', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-bold uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const ProjectCard = ({ number, category, title, quote, image, reverse = false, className = "mb-40" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group ${className}`}
    >
      <motion.div 
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`lg:col-span-8 overflow-hidden aspect-[16/10] cursor-pointer relative ${reverse ? 'lg:order-2' : ''}`}
      >
        <motion.img 
          style={{ y, scale: 1.2 }}
          className="absolute inset-0 w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.25]" 
          src={image} 
          alt={title}
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div 
        className={`lg:col-span-4 ${reverse ? 'lg:order-1 lg:text-right lg:pr-12' : 'lg:pl-12'}`}
        whileHover={{ x: reverse ? -10 : 10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className="text-primary text-xs font-black uppercase tracking-widest mb-4 block">
          {number} / {category}
        </span>
        <h3 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-none group-hover:text-primary transition-colors duration-500">{title}</h3>
        <p className={`text-slate-500 italic text-xl border-white/20 mb-8 uppercase tracking-tight ${reverse ? 'lg:border-r lg:pr-6' : 'border-l pl-6'}`}>
          "{quote}"
        </p>
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm cursor-pointer ${reverse ? 'justify-end' : 'justify-start'}`}
        >
          <span>Ver Projeto</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="p-10 border border-white/10 hover:border-primary transition-colors group cursor-default"
  >
    <Icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
    <h3 className="text-2xl font-bold uppercase mb-4 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0 lg:left-1/3 hero-image-bleed opacity-40 lg:opacity-60 pointer-events-none">
            <img 
              className="w-full h-full object-cover grayscale" 
              src="https://picsum.photos/seed/architecture/1920/1080" 
              alt="Hero Background"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/4"
            >
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Bureau de Design Gráfico</span>
              <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black leading-[0.85] tracking-tighter uppercase mb-10">
                Ideia e <br />
                <span className="text-primary">Forma</span> que <br />
                Fala.
              </h1>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <p className="max-w-md text-xl text-slate-300 font-light leading-relaxed border-l-4 border-primary pl-8">
                  Especialistas em Identidade Visual, Embalagens, Editorial e Web Design. Transformamos conceitos em experiências visuais de alto impacto técnico e estético.
                </p>
                <div className="flex flex-col gap-4 pt-2">
                  <a href="#projetos" className="bg-primary text-white px-10 py-5 font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform inline-block text-center">
                    Explorar Portfólio
                  </a>
                  <a href="#contato" className="bg-white text-black px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors inline-block text-center">
                    Iniciar Projeto
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-32 px-6 bg-black" id="projetos">
          <div className="max-w-7xl mx-auto mb-24">
            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
              <div className="border-b-2 border-primary pb-4">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Portfólio</span>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Projetos <br /> Selecionados</h2>
              </div>
              <div className="text-slate-500 max-w-xs text-sm uppercase font-bold tracking-widest leading-loose">
                Exclusividade técnica e excelência estética aplicada em narrativas visuais únicas.
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Horizontal Scroll Group for Identidade Visual */}
            <div className="relative group/scroll">
              <div 
                ref={scrollContainerRef}
                className="flex gap-12 overflow-x-auto pb-20 snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0"
              >
                <div className="min-w-full lg:min-w-[1280px] snap-center flex justify-center">
                  <div className="w-full max-w-7xl">
                    <ProjectCard 
                      number="01"
                      category="Identidade Visual"
                      title="Nexus Corp."
                      quote="A arquitetura da marca como base para o crescimento exponencial."
                      image="https://picsum.photos/seed/branding/1200/800"
                      className="mb-0"
                    />
                  </div>
                </div>
                <div className="min-w-full lg:min-w-[1280px] snap-center flex justify-center">
                  <div className="w-full max-w-7xl">
                    <ProjectCard 
                      number="02"
                      category="Identidade Visual"
                      title="Stellar Pack"
                      quote="Onde a funcionalidade encontra a estética premium nas prateleiras."
                      image="https://picsum.photos/seed/packaging/1200/800"
                      className="mb-0"
                    />
                  </div>
                </div>
              </div>

              {/* Scroll Arrows */}
              <div className="hidden lg:flex absolute -bottom-10 right-0 gap-4 z-20">
                <button 
                  onClick={() => scroll('left')}
                  className="w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-primary hover:border-primary transition-all group/btn"
                >
                  <ArrowLeft className="w-5 h-5 text-white group-hover/btn:text-black" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-primary hover:border-primary transition-all group/btn"
                >
                  <ArrowRight className="w-5 h-5 text-white group-hover/btn:text-black" />
                </button>
              </div>
            </div>

            <div className="mt-20 lg:mt-40">
              <ProjectCard 
                number="03"
                category="Design Editorial"
                title="Mono Edition"
                quote="O equilíbrio perfeito entre tipografia e espaço em branco."
                image="https://picsum.photos/seed/magazine/1200/800"
              />
              <ProjectCard 
                number="04"
                category="Web Design"
                title="Core Interface"
                quote="Interfaces digitais que priorizam a performance e a experiência do usuário."
                image="https://picsum.photos/seed/website/1200/800"
                reverse
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 px-6 border-t border-white/5 bg-background-dark" id="servicos">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Capacidades</span>
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-8">Soluções<br />Técnicas</h2>
                <p className="text-slate-400 font-light leading-relaxed">
                  Nossa abordagem une o rigor técnico da engenharia à sensibilidade estética do design editorial. Não criamos apenas imagens, construímos sistemas de comunicação.
                </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard 
                  icon={Compass}
                  title="Identidade Visual"
                  description="Criação de sistemas visuais coerentes que comunicam a essência e os valores da sua marca."
                />
                <ServiceCard 
                  icon={Box}
                  title="Embalagens"
                  description="Design de embalagens que se destacam no PDV e criam uma experiência de unboxing memorável."
                />
                <ServiceCard 
                  icon={BookOpen}
                  title="Editorial"
                  description="Projetos gráficos para livros, revistas e catálogos com foco em legibilidade e hierarquia visual."
                />
                <ServiceCard 
                  icon={Globe}
                  title="Web Design"
                  description="Criação de sites e interfaces digitais focadas em usabilidade, estética e conversão."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="relative py-48 px-6 bg-primary text-black overflow-hidden" id="filosofia">
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
              "O design não é o que se vê, mas o que se sente através da precisão."
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16 border-t border-black/20 pt-16">
              <div className="text-left">
                <span className="font-black uppercase text-sm tracking-widest block mb-2">Manifesto</span>
                <p className="max-w-md font-medium text-lg">
                  No Jeferson Design Bureau, acreditamos que a forma deve falar a linguagem do propósito. Cada linha, cada pixel e cada espaço em branco é planejado para comunicar eficiência.
                </p>
              </div>
              <div className="h-20 w-[1px] bg-black/30 hidden md:block"></div>
              <div className="text-left">
                <span className="font-black uppercase text-sm tracking-widest block mb-2">Método</span>
                <p className="max-w-md font-medium text-lg">
                  Nossa técnica é baseada na redução. Eliminamos o ruído para que a essência da sua marca brilhe com autoridade e sofisticação inquestionável.
                </p>
              </div>
            </div>
          </div>
          <span className="absolute -bottom-20 -right-20 text-[300px] font-black leading-none text-black/5 select-none uppercase tracking-tighter pointer-events-none">FORMA</span>
        </section>

        {/* Contact Section */}
        <footer className="py-32 px-6 bg-black" id="contato">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-6xl font-black uppercase tracking-tighter mb-8 text-white">Vamos <br /> Conversar?</h2>
                <p className="text-slate-400 text-xl font-light mb-12 max-w-md">
                  Estamos prontos para elevar o nível técnico e visual da sua marca. Agende uma consultoria estratégica.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Mail, text: 'hello@jefersonbureau.com' },
                    { icon: Phone, text: '+55 11 99999-9999' },
                    { icon: MapPin, text: 'São Paulo, Brasil' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 flex items-center justify-center border border-white/20 group-hover:bg-primary transition-all">
                        <item.icon className="w-5 h-5 text-white group-hover:text-black" />
                      </div>
                      <span className="text-xl font-bold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/50 p-10 border border-white/5">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Nome Completo</label>
                    <input className="w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white placeholder-white/20 px-0 py-4 transition-colors" placeholder="Ex: João Silva" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">E-mail Corporativo</label>
                    <input className="w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white placeholder-white/20 px-0 py-4 transition-colors" placeholder="seu@email.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Assunto</label>
                    <select className="w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white px-0 py-4 transition-colors">
                      <option className="bg-black">Branding / Identidade</option>
                      <option className="bg-black">Design Digital</option>
                      <option className="bg-black">Tech / Development</option>
                      <option className="bg-black">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">Mensagem</label>
                    <textarea className="w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white placeholder-white/20 px-0 py-4 transition-colors" placeholder="Conte-nos sobre seu projeto..." rows={4}></textarea>
                  </div>
                  <button className="w-full bg-primary py-5 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                    Enviar Solicitação
                  </button>
                </form>
              </div>
            </div>
            
            <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                <div className="w-6 h-6 bg-primary flex items-center justify-center">
                  <Compass className="w-3 h-3 text-black" strokeWidth={3} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-tighter">Jeferson<span className="text-primary">.</span>Bureau</h2>
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} Jeferson Design Bureau. All rights reserved. Precision is our signature.
              </div>
              <div className="flex gap-6">
                {[Instagram, Linkedin, Github].map((Icon, idx) => (
                  <a key={idx} href="#" className="text-slate-400 hover:text-primary transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
