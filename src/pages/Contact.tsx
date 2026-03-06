import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Two Column Layout */}
      <div className="relative w-full pb-12 md:pb-20 lg:pb-32 px-6 md:px-[calc(18vw-10rem)]">
        <div className="max-w-[138rem] mx-auto flex flex-col items-center">
          <div className="relative flex items-start justify-between flex-col lg:flex-row lg:w-full gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div className="w-full lg:w-1/2 py-[3rem] md:py-[5rem] lg:py-[8rem]">
              <AppearOnScroll delay={0}>
                <div className="text-[56px] mb-6">✉️</div>
              </AppearOnScroll>
              <AppearOnScroll delay={100}>
                <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] font-semibold tracking-[-0.01em] leading-[1.2] mb-[3rem]">
                  We'd love to hear from you.
                </h1>
              </AppearOnScroll>
              <AppearOnScroll delay={200}>
                <p className="text-[1.8rem] leading-[1.8] text-muted-foreground mb-[4rem]">
                  Have a question, suggestion, or collaboration idea? We're here to listen. Drop us a message and we'll get back to you as soon as possible.
                </p>
              </AppearOnScroll>

              <AppearOnScroll delay={300}>
                <div className="space-y-3 mb-8">
                  <p className="text-[1.8rem]">
                    <a href="mailto:hello@editorial.com" className="hover:opacity-60 transition-opacity">
                      hello@editorial.com
                    </a>
                  </p>
                  <p className="text-[1.8rem]">
                    <a href="tel:+15555555555" className="hover:opacity-60 transition-opacity">
                      (555) 555-5555
                    </a>
                  </p>
                </div>
              </AppearOnScroll>

              <AppearOnScroll delay={400}>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </AppearOnScroll>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[44%] max-w-[80rem] py-[3rem] md:py-[5rem] lg:py-[8rem]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <AppearOnScroll delay={0}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[1.6rem] mb-2">
                        First Name <span className="text-muted-foreground">(required)</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full text-[1.8rem] leading-[2.4rem] h-[60px] px-4 bg-white dark:bg-background border border-[#d7d7db] dark:border-border rounded-lg focus:outline-none focus:border-[#CB30DF] focus:ring-2 focus:ring-[rgba(203,48,223,0.2)] transition-all placeholder:text-muted-foreground"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[1.6rem] mb-2">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full text-[1.8rem] leading-[2.4rem] h-[60px] px-4 bg-white dark:bg-background border border-[#d7d7db] dark:border-border rounded-lg focus:outline-none focus:border-[#CB30DF] focus:ring-2 focus:ring-[rgba(203,48,223,0.2)] transition-all placeholder:text-muted-foreground"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </AppearOnScroll>

                <AppearOnScroll delay={150}>
                  <div>
                    <label className="block text-[1.6rem] mb-2">
                      Email <span className="text-muted-foreground">(required)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full text-[1.8rem] leading-[2.4rem] h-[60px] px-4 bg-white dark:bg-background border border-[#d7d7db] dark:border-border rounded-lg focus:outline-none focus:border-[#CB30DF] focus:ring-2 focus:ring-[rgba(203,48,223,0.2)] transition-all placeholder:text-muted-foreground"
                      placeholder="Email"
                    />
                  </div>
                </AppearOnScroll>

                <AppearOnScroll delay={300}>
                  <div>
                    <label className="block text-[1.6rem] mb-2">
                      Message <span className="text-muted-foreground">(required)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="w-full text-[1.8rem] leading-[2.4rem] p-4 bg-white dark:bg-background border border-[#d7d7db] dark:border-border rounded-lg focus:outline-none focus:border-[#CB30DF] focus:ring-2 focus:ring-[rgba(203,48,223,0.2)] transition-all placeholder:text-muted-foreground resize-y"
                      placeholder="Message"
                    />
                  </div>
                </AppearOnScroll>

                <AppearOnScroll delay={450}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-[1.8rem] font-medium h-[60px] px-12 bg-[rgba(203,48,223,0.9)] text-white rounded-lg hover:bg-[rgba(203,48,223,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </AppearOnScroll>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
