import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Article as ArticleWrapper,
  ArticleHeader,
  ArticleHero,
  ArticleContainer,
  ArticleContent,
  TopShares,
} from "@/components/ArticleComponents";
import { ArticleRelatedItems } from "@/components/ArticleRelatedItems";
// Malmö Architecture Images
import malmoHero from "@/assets/malmo/malmo-hero.jpg";
import malmo01 from "@/assets/malmo/malmo-01.jpg";
import malmo02 from "@/assets/malmo/malmo-02.avif";
import malmo03 from "@/assets/malmo/malmo-03.avif";
import malmo11 from "@/assets/malmo/malmo-11.avif";
import malmo13 from "@/assets/malmo/malmo-13.avif";
import malmo16 from "@/assets/malmo/malmo-16.avif";
import malmo17 from "@/assets/malmo/malmo-17.avif";

// Related articles images
import malmo04 from "@/assets/malmo/malmo-04.avif";
import malmo05 from "@/assets/malmo/malmo-05.avif";
import malmo12 from "@/assets/malmo/malmo-12.avif";

// Author avatar
import authorMarcus from "@/assets/author-marcus.jpg";

const Article = () => {
  const relatedArticles = [
    {
      title: "Geometric Minimalism in Nordic Architecture",
      description:
        "How Scandinavian design principles create buildings that breathe. Exploring the intersection of function, form, and negative space.",
      image: malmo04,
      tag: "Architecture",
      slug: "geometric-minimalism-nordic",
    },
    {
      title: "The Art of Architectural Photography",
      description:
        "Light, composition, and timing—the essential elements of capturing buildings as living subjects. A masterclass in seeing structure.",
      image: malmo05,
      tag: "Photography",
      slug: "architectural-photography",
    },
    {
      title: "Sustainable Urban Design in Scandinavia",
      description:
        "From Copenhagen to Malmö, how Nordic cities are pioneering climate-conscious development without sacrificing aesthetic ambition.",
      image: malmo12,
      tag: "Innovation",
      slug: "sustainable-urban-design",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <ArticleWrapper>
        <ArticleHeader
          title="MLMO: Capturing Malmö's Architectural Renaissance"
          date="January 10, 2025"
          author={{
            name: "Marcus Lindström",
            title: "Architecture Photographer",
            avatar: authorMarcus,
          }}
        />

        <ArticleHero image={malmoHero} alt="Modern architecture in Malmö, Sweden" />

        <ArticleContainer>
          <TopShares
            facebookUrl="https://www.facebook.com/sharer/sharer.php?u=https://example.com/article"
            twitterUrl="https://twitter.com/intent/tweet?url=https://example.com/article"
            linkedinUrl="https://www.linkedin.com/shareArticle?url=https://example.com/article"
          />
          <ArticleContent>
            <p>
              Malmö is one of the larger cities in Sweden and also one of the earliest and most industrialized towns
              of Scandinavia. During the last two decades, Malmö has undergone a major transformation with
              architectural developments. The Øresund Bridge connects it to Copenhagen, and both cities continue to
              evolve in tandem, creating a unique cross-border architectural dialogue.
            </p>

            <p>
              As a photographer drawn to the language of light and form, I've watched Malmö's skyline transform from
              industrial silhouettes to a laboratory of contemporary design. Each visit reveals new layers of this
              ongoing renaissance, where cranes punctuate the horizon and glass facades reflect the ever-changing
              Nordic sky.
            </p>

            <p>
              This is not simply a story of urban renewal—it's a testament to how cities can reinvent themselves
              without erasing their past. Malmö's architectural journey speaks to a broader Scandinavian ethos: that
              progress and preservation, modernity and humanity, can coexist in delicate balance.
            </p>

            <h2>From Industrial Port to Architectural Laboratory</h2>

            <p>
              For much of the 20th century, Malmö's identity was inseparable from its shipyards and industrial
              infrastructure. The city's waterfront was defined by the machinery of production, not the aesthetics of
              living. But as traditional industries declined, Malmö faced a choice: fade into post-industrial obscurity
              or reimagine itself entirely.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo01} alt="Modern Malmö architecture against pastel sky" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                The new skyline emerges from Malmö's industrial past
              </figcaption>
            </figure>

            <p>
              The city chose transformation. What followed was two decades of deliberate architectural experimentation.
              Former dock areas became canvases for international architects. Post-industrial spaces were reclaimed as
              mixed-use neighborhoods. And at every turn, sustainability wasn't an afterthought—it was foundational.
            </p>

            <h2>Geometry and Light: A Photographer's Perspective</h2>

            <p>
              To photograph Malmö's new architecture is to engage with a visual language of clean lines, reflective
              surfaces, and dramatic verticality. These buildings don't simply occupy space—they reshape it, drawing
              the eye upward and outward, creating new relationships between earth and sky.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo02} alt="Geometric patterns of modern facade" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                Rhythmic patterns define Malmö's modernist vocabulary
              </figcaption>
            </figure>

            <p>
              The Nordic light—soft, diffused, never harsh—plays across these geometric forms in ways that change by
              the hour. Morning light catches on glass towers, transforming them into golden beacons. Afternoon casts
              long shadows that emphasize the sculptural quality of concrete and steel. And during the fleeting moments
              of golden hour, the entire cityscape seems to glow from within.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo03} alt="Angular architectural detail" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                Clean lines meet Scandinavian minimalism
              </figcaption>
            </figure>

            <figure className="blockquote-big">
              <blockquote>
                "Architecture is frozen music, and in Malmö, each building sings a different note in the symphony of
                urban transformation."
              </blockquote>
              <figcaption>Santiago Calatrava, Architect</figcaption>
            </figure>

            <h2>The Øresund Effect: Copenhagen's Architectural Twin</h2>

            <p>
              The completion of the Øresund Bridge in 2000 wasn't merely an infrastructural achievement—it was a
              catalyst for cultural and architectural exchange. Malmö and Copenhagen, once separate entities, became
              parts of a larger metropolitan region. Ideas, talent, and design philosophies began to flow freely across
              the strait.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo11} alt="Waterfront architecture" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                Connected cities, shared architectural vision
              </figcaption>
            </figure>

            <p>
              This cross-pollination is visible in Malmö's commitment to sustainable urban planning, bicycle
              infrastructure, and mixed-use development—principles long championed in Copenhagen. But Malmö hasn't
              simply copied its neighbor; it has synthesized Danish urbanism with Swedish design sensibilities,
              creating something distinctly its own.
            </p>

            <h2>Capturing the Ephemeral: Sky, Color, and Mood</h2>

            <p>
              One of the greatest challenges—and joys—of photographing architecture in Malmö is the sky. The Nordic
              climate creates atmospheric conditions that are constantly in flux. One moment, heavy clouds cast
              everything in cool grays; the next, breaks in the cloud cover create dramatic spotlighting effects.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo13} alt="Building with dramatic sky gradient" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                Golden hour transforms glass into liquid amber
              </figcaption>
            </figure>

            <p>
              I've learned to chase these moments obsessively. The gradient sunsets that paint glass facades in shades
              of pink and orange. The blue hour, when artificial lights begin to glow against a deepening indigo sky.
              These are the times when architecture transcends its function and becomes pure visual poetry.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo16} alt="Another striking sky and building composition" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                The Nordic sky provides an ever-changing backdrop
              </figcaption>
            </figure>

            <figure className="my-8">
              <blockquote className="italic text-lg border-l-4 border-primary pl-6 my-6">
                "I don't photograph buildings—I photograph the dialogue between human ambition and natural light."
              </blockquote>
              <figcaption className="text-sm text-muted-foreground pl-6">— Marcus Lindström</figcaption>
            </figure>

            <h2>Human Scale in Monumental Vision</h2>

            <p>
              For all its architectural ambition, Malmö has largely avoided the pitfall of monumentalism at the expense
              of livability. Many of the new developments incorporate ground-level retail, accessible public spaces, and
              careful attention to pedestrian flow. The result is architecture that feels approachable despite its
              scale.
            </p>

            <figure className="my-12">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                <img src={malmo17} alt="Street-level architectural perspective" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                Monumental architecture, human proportions
              </figcaption>
            </figure>

            <p>
              This commitment to human scale extends to material choices and environmental consciousness. Green roofs,
              renewable energy integration, and passive heating systems aren't hidden technical features—they're
              integral to the architectural expression itself. Sustainability here is not compromise; it's an aesthetic
              principle.
            </p>

            <p>
              As I continue to document Malmö's transformation, I'm struck by how much remains unwritten. This city is
              still in the midst of becoming. New towers rise each year, neighborhoods evolve, and the architectural
              conversation between past and future continues.
            </p>

            <p>
              Photography allows me to freeze these transitional moments—to capture a city in flux, to preserve the
              ephemeral interactions of light and form. Each image is a chapter in an ongoing story, a testament to
              what happens when a city dares to reimagine itself, one building at a time.
            </p>
          </ArticleContent>
        </ArticleContainer>
      </ArticleWrapper>

      {/* Related Articles */}
      <section>
        <ArticleRelatedItems items={relatedArticles} />
      </section>

      <Footer />
    </div>
  );
};

export default Article;
