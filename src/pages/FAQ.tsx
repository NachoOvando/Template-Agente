import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Editorial?",
      answer:
        "Editorial is a design-forward content platform where creators share stories, photography, and perspectives. We combine editorial excellence with beautiful design to create an engaging reading experience.",
    },
    {
      question: "How can I contribute to Editorial?",
      answer:
        "We're always looking for talented writers, photographers, and designers. Reach out through our Contact page with samples of your work and a brief introduction. We review all submissions and respond within 7-10 business days.",
    },
    {
      question: "Is Editorial free to read?",
      answer:
        "Yes! All content on Editorial is free to read. We believe great stories should be accessible to everyone. We're exploring sustainable models that keep content free while supporting our creators.",
    },
    {
      question: "Can I republish content from Editorial?",
      answer:
        "Content rights belong to individual creators. If you'd like to republish or reference an article, please reach out to us with details about your intended use, and we'll connect you with the original author.",
    },
    {
      question: "How often do you publish new content?",
      answer:
        "We publish new articles 3-4 times per week. Quality over quantity is our mantra—each piece goes through a thorough editorial and design review before publication.",
    },
    {
      question: "Do you accept sponsored content or advertising?",
      answer:
        "We occasionally feature sponsored content that aligns with our values and standards. All sponsored pieces are clearly labeled. We don't accept banner ads or intrusive advertising formats.",
    },
    {
      question: "How do I subscribe to updates?",
      answer:
        "While we're building our newsletter feature, you can follow us on Twitter for regular updates. We announce new articles, featured photographers, and community highlights there.",
    },
    {
      question: "What's your editorial process?",
      answer:
        "Each submission goes through a multi-stage review: initial screening, editorial feedback, design integration, and final approval. We work closely with contributors to ensure their vision is preserved while maintaining our quality standards.",
    },
    {
      question: "Can I suggest a topic or story idea?",
      answer:
        "Absolutely! We love hearing ideas from our community. Send your pitch through our Contact page with a brief outline. We review all suggestions and respond to those that fit our editorial direction.",
    },
    {
      question: "How do you choose featured articles?",
      answer:
        "Featured articles are selected based on editorial quality, visual impact, timeliness, and community engagement. We aim to showcase diverse voices and perspectives across different content categories.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Not yet, but our website is fully responsive and optimized for mobile reading. A native app is on our roadmap for 2025 as we continue to improve the reading experience.",
    },
    {
      question: "How can I report an issue or bug?",
      answer:
        "Please use our Contact page to report any technical issues, broken links, or concerns. Include details about your device, browser, and the specific problem you encountered. We investigate all reports promptly.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
            Frequently Asked Questions
          </h1>
          <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8]">
            Everything you need to know about Editorial and how it works.
          </p>
        </div>
      </Section>

      {/* FAQ Accordion */}
      <Section>
        <div className="max-w-[80rem] w-full mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="text-[1.8rem] md:text-[2rem] font-medium text-left hover:no-underline py-6 w-full">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[1.6rem] leading-[1.8] text-muted-foreground pb-6 w-full">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Still Have Questions */}
      <Section>
        <div className="text-center max-w-[70rem] mx-auto border-t border-border pt-[4rem]">
          <h3 className="text-[2.4rem] font-semibold mb-[1.5rem]">
            Still have questions?
          </h3>
          <p className="text-[1.8rem] leading-[1.8] text-muted-foreground mb-[2rem]">
            Can't find the answer you're looking for? Feel free to reach out to
            our team.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 text-[1.6rem] font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default FAQ;
