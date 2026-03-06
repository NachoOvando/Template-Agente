import AppearOnScroll from "./AppearOnScroll";
import ArticlePreview from "./ArticlePreview";

interface RelatedItem {
  title: string;
  slug: string;
  image: string;
  description?: string;
  tag?: string;
}

interface ArticleRelatedItemsProps {
  items: RelatedItem[];
  className?: string;
}

export function ArticleRelatedItems({ items, className = "" }: ArticleRelatedItemsProps) {
  return (
    <div
      className={`box-content max-w-[138rem] px-[1.5rem] md:px-[calc(18vw-10rem)] mx-auto mt-[3rem] md:mt-[6rem] lg:mt-[9rem] mb-[3rem] md:mb-[6rem] lg:mb-[9rem] ${className}`}
    >
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[9.6rem] gap-x-[5%]">
        {items.map((item, index) => (
          <AppearOnScroll key={item.slug} delay={index * 200}>
            <li>
              <ArticlePreview
                title={item.title}
                slug={item.slug}
                image={item.image}
                imageAlt={item.title}
                category={item.tag || ""}
                categorySlug={item.tag?.toLowerCase() || ""}
                teaser={item.description || ""}
              />
            </li>
          </AppearOnScroll>
        ))}
      </ul>
    </div>
  );
}
