import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ArticlePreview from "@/components/ArticlePreview";
import BlogHighlight from "@/components/BlogHighlight";
import blog1 from "@/assets/blog-1.avif";
import blog2 from "@/assets/blog-2.avif";
import blog3 from "@/assets/blog-3.avif";
import blog4 from "@/assets/blog-4.avif";
import blog5 from "@/assets/blog-5.avif";
import blog6 from "@/assets/blog-6.avif";
import blog7 from "@/assets/blog-7.avif";
import blog8 from "@/assets/blog-8.avif";
import blog9 from "@/assets/blog-9.avif";
import blog10 from "@/assets/blog-10.avif";
import malmoHero from "@/assets/malmo/malmo-hero.jpg";

const Blog = () => {
  const articlesRef = useRef<(HTMLElement | null)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }, // Changed from 0.5 to 0.1 - triggers earlier
    );

    articlesRef.current.forEach((article) => {
      if (article) observer.observe(article);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  const featuredArticle = {
    title: "MLMO: Capturing Malmö's Architectural Renaissance",
    description:
      "From industrial port to architectural laboratory—a photographer's journey through Malmö's transformation into one of Scandinavia's most daring design capitals.",
    image: malmoHero,
    tag: "Architecture",
    slug: "mlmo-architectural-renaissance",
  };

  const articles = [
    {
      title: "Minimalist Interior Spaces",
      description: "Clean lines and open concepts that redefine contemporary living.",
      image: blog2,
      tag: "Home",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Light and Shadow in Design",
      description: "How natural light transforms architectural spaces throughout the day.",
      image: blog3,
      tag: "Wellness",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Urban Residential Architecture",
      description: "Innovative housing solutions for modern city living.",
      image: blog4,
      tag: "Home",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Sustainable Building Design",
      description: "Eco-conscious architecture that respects the environment.",
      image: blog7,
      tag: "Wellness",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Geometric Facades",
      description: "Bold angular designs that make powerful architectural statements.",
      image: blog8,
      tag: "Fashion",
      slug: "mlmo-architectural-renaissance",
    },
  ];

  const opinions = [
    {
      title: "Finding Balance in a Busy World",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      author: "Emma Thompson",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "The Joy of Slow Living",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      author: "Marcus Chen",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Building Meaningful Connections",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      author: "Sofia Rodriguez",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Embracing Change & Growth",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      author: "James Wilson",
      slug: "mlmo-architectural-renaissance",
    },
  ];

  const allArticles = [
    {
      title: "Glass Box Living",
      description: "Transparent walls that blur the boundary between indoors and outdoors.",
      image: blog5,
      tag: "Home",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Concrete and Wood Harmony",
      description: "The perfect balance of industrial and natural materials.",
      image: blog6,
      tag: "Food",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Sustainable Building Design",
      description: "Eco-conscious architecture that respects the environment.",
      image: blog7,
      tag: "Wellness",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Geometric Facades",
      description: "Bold angular designs that make powerful architectural statements.",
      image: blog8,
      tag: "Fashion",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Open Floor Plans",
      description: "Flexible living spaces that adapt to modern lifestyles.",
      image: blog9,
      tag: "Lifestyle",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Natural Light Optimization",
      description: "Strategic window placement for sun-filled interiors.",
      image: blog10,
      tag: "Home",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Rooftop Gardens",
      description: "Bringing nature to elevated urban spaces.",
      image: blog1,
      tag: "Travel",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Texture in Modern Design",
      description: "Layering materials for depth and visual interest.",
      image: blog2,
      tag: "Fashion",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Indoor-Outdoor Living",
      description: "Seamless transitions between interior and exterior spaces.",
      image: blog3,
      tag: "Travel",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Contemporary Kitchen Design",
      description: "Sleek, functional spaces for the modern home chef.",
      image: blog4,
      tag: "Food",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Statement Staircases",
      description: "Sculptural elements that become the focal point of any space.",
      image: blog5,
      tag: "Fashion",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Neutral Color Palettes",
      description: "Timeless tones that create calm, sophisticated interiors.",
      image: blog6,
      tag: "Lifestyle",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Smart Home Integration",
      description: "Technology seamlessly woven into architectural design.",
      image: blog7,
      tag: "Lifestyle",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Floating Architecture",
      description: "Cantilevered structures that defy gravity.",
      image: blog8,
      tag: "Travel",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Minimalist Bathrooms",
      description: "Spa-like sanctuaries with clean, modern aesthetics.",
      image: blog9,
      tag: "Wellness",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Courtyard Homes",
      description: "Private outdoor spaces at the heart of residential design.",
      image: blog10,
      tag: "Travel",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Industrial Chic Interiors",
      description: "Exposed beams and raw materials create urban elegance.",
      image: blog1,
      tag: "Food",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Window Wall Designs",
      description: "Floor-to-ceiling glass for maximum views and natural light.",
      image: blog2,
      tag: "Home",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Compact Living Solutions",
      description: "Maximizing small spaces through smart design.",
      image: blog3,
      tag: "Lifestyle",
      slug: "mlmo-architectural-renaissance",
    },
    {
      title: "Architectural Lighting",
      description: "Illumination as a design element in modern homes.",
      image: blog4,
      tag: "Food",
      slug: "mlmo-architectural-renaissance",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Section>
        <BlogHighlight
          title={featuredArticle.title}
          description={featuredArticle.description}
          href={`/article/${featuredArticle.slug}`}
          imageSrc={featuredArticle.image}
          imageAlt={featuredArticle.title}
        />
      </Section>

      {/* Articles Grid */}
      <Section
        className="relative overflow-x-scroll scroll-smooth snap-x snap-mandatory pb-28 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] 
  [&::-webkit-scrollbar]:hidden"
      >
        <div className="m-0 flex w-full list-none items-start overflow-x-visible after:ml-[-6.25%] after:block after:flex-[0_0_calc(50vw-50%)] after:content-[''] lg:after:ml-[-4.347826087%]">
          {articles.map((article, index) => (
            <div
              key={index}
              ref={(el) => (articlesRef.current[index] = el)}
              className="m-0 mr-[6.25%] inline-flex max-w-[42rem] flex-[0_0_80%] scroll-snap-align-center sm:flex-[0_0_43.75%] lg:mr-[4.347826087%] lg:flex-[0_0_30.434783%]"
            >
              <ArticlePreview
                title={article.title}
                slug={article.slug}
                image={article.image}
                imageAlt={article.title}
                category={article.tag}
                categorySlug={article.tag.toLowerCase()}
                teaser={article.description}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Opinions Section */}
      <Section>
        <h2
          className="text-[hsl(var(--editorial-text))]"
          style={{
            width: "100%",
            marginBottom: "3rem",
            padding: "1rem 0",
            textAlign: "left",
            letterSpacing: "0.2rem",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            fontSize: "1.6rem",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          Opinions
        </h2>
        <div className="m-0 grid w-full list-none gap-12 p-0 text-left sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] 2xl:gap-24">
          {opinions.map((opinion, index) => (
            <Link
              key={index}
              to={`/article/${opinion.slug}`}
              ref={(el) => (articlesRef.current[articles.length + index] = el)}
              className="group blog-feed__item"
              style={{
                flex: "0 0 calc(25% - 2.25rem)",
                animationDelay: `${index * 150}ms`,
              }}
            >
              <article className="h-full">
                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-muted mb-4">
                  <img
                    src={opinion.avatar}
                    alt={opinion.author}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="font-sans font-semibold text-[2.2rem] md:text-[2.7rem] leading-[1.4] text-[hsl(var(--editorial-text))] text-left">
                  <span className="inline-block mb-[-0.3em] pb-[0.3em] [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent group-hover:bg-[position:0%_0]">
                    {opinion.title}
                  </span>
                </h2>
              </article>
            </Link>
          ))}
        </div>
      </Section>

      {/* More Articles Section */}
      <Section>
        <h2
          className="text-[hsl(var(--editorial-text))]"
          style={{
            width: "100%",
            marginBottom: "3rem",
            padding: "1rem 0",
            textAlign: "left",
            letterSpacing: "0.2rem",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            fontSize: "1.6rem",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          More Articles
        </h2>

        {/* Category Filter Bar */}
        <div
          className="flex gap-4 mb-8 flex-wrap bg-background py-4 justify-center w-screen relative left-1/2 right-1/2 ml-0 mr-0"
          style={{
            position: "sticky",
            top: "72px",
            zIndex: 10,
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
          }}
        >
          {["All", "Wellness", "Home", "Travel", "Food", "Fashion", "Lifestyle"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`uppercase tracking-wide text-[1.6rem] leading-[2rem] font-normal px-4 py-2 rounded-[0.6rem] transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[rgba(254,44,85,0.15)] text-[#FE2C55]"
                  : "text-[hsl(var(--foreground))] hover:text-[#FE2C55]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid list-none gap-x-16 gap-y-24 py-8 text-left sm:grid-cols-2 lg:grid-cols-3">
          {allArticles
            .filter((article) => selectedCategory === "All" || article.tag === selectedCategory)
            .map((article, index) => (
              <div
                key={index}
                ref={(el) => (articlesRef.current[articles.length + opinions.length + index] = el)}
                className="blog-feed__item"
                style={{
                  animationDelay: `${(index % 3) * 150}ms`,
                }}
              >
                <ArticlePreview
                  title={article.title}
                  slug={article.slug}
                  image={article.image}
                  imageAlt={article.title}
                  category={article.tag}
                  categorySlug={article.tag.toLowerCase()}
                  teaser={article.description}
                />
              </div>
            ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Blog;
