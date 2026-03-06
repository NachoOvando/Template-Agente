interface BlogHighlightProps {
  title: string;
  description: string;
  linkText?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export default function BlogHighlight({
  title,
  description,
  linkText = "Continue reading",
  href,
  imageSrc,
  imageAlt,
  className = "",
}: BlogHighlightProps) {
  return (
    <div
      className={`relative flex items-center justify-between flex-col lg:flex-row lg:w-full ${className}`}
    >
      {/* Image - First on mobile (top), First on desktop (left) */}
      <figure className="w-full lg:w-1/2 order-[-1] relative overflow-hidden rounded-[0.6rem] m-0 aspect-[5/3] lg:aspect-[23/28] lg:my-[4rem]">
        <a href={href} className="block w-full h-full">
          <img
            alt={imageAlt}
            src={imageSrc}
            className="w-full h-full object-cover transition-opacity duration-300 rounded-[0.6rem]"
          />
        </a>
      </figure>

      {/* Text Content - Second on mobile (bottom), Second on desktop (right) */}
      <div className="w-full lg:w-[44%] max-w-[80rem] py-[3rem] md:py-[5rem] lg:py-[8rem] flex flex-col items-start text-left lg:order-1">
        <h2 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold leading-[1.25] md:leading-[1.1] lg:leading-[1] m-0 mb-[1rem] md:mb-[1.5rem] lg:mb-[2rem]">
          <a
            href={href}
            data-test-id="blog-overview-highlight"
            className="inline-block mb-[-0.3em] pb-[0.3em] [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
          >
            {title}
          </a>
        </h2>

        <p className="text-muted-foreground break-words m-0 mb-[1em]">
          {description}
        </p>

        <p className="m-0">
          <a
            href={href}
            className="inline-block mt-[2rem] no-underline text-[1.8rem] font-bold cursor-pointer border-none bg-none appearance-none"
          >
            <span className="transition-[background-position,color] duration-500 ease-out bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:200%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0] inline-flex items-center gap-2">
              {linkText}
              <svg
                height="8"
                viewBox="0 0 27 8"
                width="27"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  clipRule="evenodd"
                  d="M23.172.464l3.182 3.182a.5.5 0 010 .708l-3.182 3.182a.5.5 0 11-.707-.708L24.793 4.5H0v-1h24.793l-2.328-2.328a.5.5 0 11.707-.708z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </a>
        </p>
      </div>
    </div>
  );
}
