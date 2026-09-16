import type { FaqCategory } from "@/types/faq";
import FaqAccordionItem from "@/components/faq/FaqAccordionItem";

export default function FaqCategorySection({ category }: { category: FaqCategory }) {
  return (
    <article>
      <div className="flex items-center gap-2.5 mb-5">
        <span aria-hidden="true" className="text-xl sm:text-2xl">
          {category.icon}
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold text-foreground break-keep">
          {category.label}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {category.items.map((item) => (
          <FaqAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </article>
  );
}
