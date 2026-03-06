import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import { Sparkles, Palette, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Title */}
      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mt-[4.5rem] xl:mt-[6rem]">
        <AppearOnScroll delay={0}>
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] text-center">
            About
          </h1>
        </AppearOnScroll>
      </div>

      {/* Hero Image */}
      <AppearOnScroll delay={0}>
        <figure className="relative flex overflow-hidden w-full mt-[3rem] md:mt-[4.5rem] lg:mt-[6rem] mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
          <picture className="flex w-full justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000&q=80"
              alt="Editorial Team"
              className="top-0 left-0 max-w-full w-full aspect-[2/1] xl:aspect-[16/5] object-cover"
            />
          </picture>
        </figure>
      </AppearOnScroll>

      {/* Story Section */}
      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
        <AppearOnScroll delay={0}>
          <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-[3rem]">
            Our Story
          </h2>
        </AppearOnScroll>
        <AppearOnScroll delay={150}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground mb-6">
            Editorial began with a simple question: What if we could create a space where thoughtful ideas, meaningful stories, and beautiful design come together to enrich our daily lives?
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={300}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground mb-6">
            In a world saturated with content, we felt the need for something different—a publication that prioritizes depth over speed, quality over quantity, and authentic connection over viral moments.
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={450}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground">
            What started as a small collective of designers and writers has grown into a platform celebrating diverse voices and perspectives. We believe how we present stories is just as important as the stories themselves.
          </p>
        </AppearOnScroll>
      </div>

      {/* Mission Quote */}
      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
        <AppearOnScroll delay={0}>
          <figure className="blockquote-big text-center mt-[1.25rem] mb-[0.9375rem] md:mt-[1.875rem] md:mb-[1.875rem] lg:mt-[3.75rem] lg:mb-[3.75rem] md:mx-[calc(-18vw+6.875rem)] xl:mx-[-12.5rem]">
            <blockquote className="font-sans text-[calc(5vw+0.6rem)] lg:text-[5.4rem] font-extrabold leading-[1.2]">
              "To elevate digital storytelling through thoughtful design and authentic voices."
            </blockquote>
            <figcaption className="text-[calc(2.5vw+0.8rem)] lg:text-[3rem] font-semibold leading-[1.6] md:leading-[1.4] before:content-['―_']">
              Our Mission
            </figcaption>
          </figure>
        </AppearOnScroll>
      </div>

      {/* Values Grid */}
      <Section>
        <div className="max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-[4rem]">
              Our Values
            </h2>
          </AppearOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AppearOnScroll delay={0}>
              <div className="lg:col-span-1 p-8 rounded-2xl bg-[rgba(197,159,255,0.15)]">
                <Sparkles className="w-[48px] h-[48px] text-black mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3 text-black">Authenticity</h3>
                <p className="text-[1.6rem] leading-[1.8] text-black">
                  We share real experiences, honest reflections, and genuine insights—not curated perfection.
                </p>
              </div>
            </AppearOnScroll>

            <AppearOnScroll delay={150}>
              <div className="lg:col-span-2 p-8 rounded-2xl bg-[rgba(255,149,238,0.15)]">
                <Palette className="w-[48px] h-[48px] text-black mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3 text-black">Thoughtfulness</h3>
                <p className="text-[1.6rem] leading-[1.8] text-black">
                  Every article is carefully researched, thoughtfully written, and designed to add real value.
                </p>
              </div>
            </AppearOnScroll>

            <AppearOnScroll delay={300}>
              <div className="lg:col-span-2 p-8 rounded-2xl bg-[rgba(255,207,109,0.15)]">
                <Heart className="w-[48px] h-[48px] text-black mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3 text-black">Inclusivity</h3>
                <p className="text-[1.6rem] leading-[1.8] text-black">
                  We welcome diverse perspectives and believe everyone's journey deserves respect and representation.
                </p>
              </div>
            </AppearOnScroll>

            <AppearOnScroll delay={450}>
              <div className="lg:col-span-1 p-8 rounded-2xl bg-[rgba(254,185,131,0.15)]">
                <Users className="w-[48px] h-[48px] text-black mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3 text-black">Sustainability</h3>
                <p className="text-[1.6rem] leading-[1.8] text-black">
                  We promote practices that are sustainable for individuals, communities, and the planet.
                </p>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
