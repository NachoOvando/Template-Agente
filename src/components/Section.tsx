import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`relative w-full pb-12 md:pb-20 lg:pb-32 px-6 md:px-[calc(18vw-10rem)] ${className}`}>
      <div className="max-w-[138rem] mx-auto flex flex-col items-center">{children}</div>
    </section>
  );
}
