import { useEffect, useRef, type ReactNode, type ElementType } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  as?: ElementType;
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? ` reveal-delay-${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal${delayClass}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
