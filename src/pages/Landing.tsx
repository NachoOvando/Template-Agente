import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppearOnScroll from "@/components/AppearOnScroll";
import { useToast } from "@/hooks/use-toast";

const projects = [
  {
    title: "Brand Identity — Noma Studio",
    category: "Branding",
    year: "2025",
    description: "Complete visual identity system for a Scandinavian architecture firm.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    title: "E-Commerce Platform — Velvet",
    category: "Web Development",
    year: "2024",
    description: "High-performance headless commerce experience with custom CMS integration.",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80",
  },
  {
    title: "Mobile App — Pulse Health",
    category: "Product Design",
    year: "2024",
    description: "Health tracking app with intuitive data visualization and wearable sync.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  },
  {
    title: "Dashboard — FinTrack Pro",
    category: "UI/UX Design",
    year: "2023",
    description: "Real-time financial analytics dashboard for institutional investors.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

const Landing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Mensaje enviado",
      description: "Te responderé lo antes posible.",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative flex items-center justify-center min-h-[90vh] px-6 md:px-12">
        <div className="max-w-[90rem] mx-auto text-center">
          <AppearOnScroll delay={0}>
            <p className="text-primary font-mono text-[1.4rem] tracking-[0.3em] uppercase mb-6">
              Portfolio & Studio
            </p>
          </AppearOnScroll>
          <AppearOnScroll delay={100}>
            <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold tracking-[-0.03em] leading-[1.05] mb-8">
              Creamos experiencias
              <br />
              <span className="text-primary">digitales únicas</span>
            </h1>
          </AppearOnScroll>
          <AppearOnScroll delay={200}>
            <p className="text-muted-foreground text-[1.8rem] md:text-[2rem] max-w-[60rem] mx-auto mb-10">
              Diseño, desarrollo y estrategia digital para marcas que buscan destacar en un mundo conectado.
            </p>
          </AppearOnScroll>
          <AppearOnScroll delay={300}>
            <a
              href="#projects"
              className="inline-block text-[1.6rem] font-medium px-10 py-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Ver proyectos
            </a>
          </AppearOnScroll>
        </div>
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[110rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <AppearOnScroll delay={0}>
                <p className="text-primary font-mono text-[1.3rem] tracking-[0.3em] uppercase mb-4">
                  Sobre nosotros
                </p>
              </AppearOnScroll>
              <AppearOnScroll delay={100}>
                <h2 className="text-[3rem] md:text-[4rem] font-bold tracking-[-0.02em] leading-[1.15] mb-8">
                  Combinamos diseño y tecnología con propósito
                </h2>
              </AppearOnScroll>
              <AppearOnScroll delay={200}>
                <p className="text-muted-foreground text-[1.7rem] leading-[1.8] mb-6">
                  Somos un estudio creativo especializado en diseño digital, desarrollo web y branding. 
                  Trabajamos con startups, empresas y agencias que buscan resultados tangibles.
                </p>
              </AppearOnScroll>
              <AppearOnScroll delay={300}>
                <p className="text-muted-foreground text-[1.7rem] leading-[1.8]">
                  Cada proyecto es una oportunidad para crear algo memorable. Nos enfocamos en la 
                  intersección entre estética, funcionalidad y rendimiento.
                </p>
              </AppearOnScroll>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "50+", label: "Proyectos" },
                { number: "8", label: "Años" },
                { number: "30+", label: "Clientes" },
                { number: "∞", label: "Ideas" },
              ].map((stat, i) => (
                <AppearOnScroll key={stat.label} delay={i * 100}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center">
                    <p className="text-primary text-[3.2rem] font-bold mb-1">{stat.number}</p>
                    <p className="text-muted-foreground text-[1.4rem]">{stat.label}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <p className="text-primary font-mono text-[1.3rem] tracking-[0.3em] uppercase mb-4">
              Proyectos
            </p>
          </AppearOnScroll>
          <AppearOnScroll delay={100}>
            <h2 className="text-[3rem] md:text-[4rem] font-bold tracking-[-0.02em] leading-[1.15] mb-16">
              Trabajo seleccionado
            </h2>
          </AppearOnScroll>

          <div className="space-y-12">
            {projects.map((project, i) => (
              <AppearOnScroll key={project.title} delay={i * 100}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-500">
                  <div className="overflow-hidden aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-primary font-mono text-[1.2rem] tracking-wider uppercase">
                        {project.category}
                      </span>
                      <span className="text-muted-foreground text-[1.2rem]">— {project.year}</span>
                    </div>
                    <h3 className="text-[2.2rem] md:text-[2.6rem] font-bold tracking-[-0.01em] mb-4">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-[1.6rem] leading-[1.7]">
                      {project.description}
                    </p>
                  </div>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[80rem] mx-auto">
          <div className="text-center mb-16">
            <AppearOnScroll delay={0}>
              <p className="text-primary font-mono text-[1.3rem] tracking-[0.3em] uppercase mb-4">
                Contacto
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h2 className="text-[3rem] md:text-[4rem] font-bold tracking-[-0.02em] leading-[1.15] mb-6">
                ¿Tienes un proyecto en mente?
              </h2>
            </AppearOnScroll>
            <AppearOnScroll delay={200}>
              <p className="text-muted-foreground text-[1.7rem]">
                Cuéntanos tu idea y empecemos a crear algo increíble juntos.
              </p>
            </AppearOnScroll>
          </div>

          <AppearOnScroll delay={300}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nombre"
                  className="w-full text-[1.6rem] h-[56px] px-5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full text-[1.6rem] h-[56px] px-5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full text-[1.6rem] p-5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground resize-y"
              />
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-[1.6rem] font-medium px-12 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </div>
            </form>
          </AppearOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
