"use client";

import Link from "next/link";
import { Reveal, StaggerGroup } from "@harty/motion";
import { CardContainer, CardBody, CardItem } from "@harty/ui";

const CATEGORIES = [
  {
    label: "Men",
    href: "/men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    description: "Shirts, Jeans, Ethnic & more",
    span: "md:col-span-2 md:row-span-2",
    tall: true,
  },
  {
    label: "Women",
    href: "/women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&q=80",
    description: "Dresses, Sarees, Western & more",
    span: "",
    tall: false,
  },
  {
    label: "Kids",
    href: "/kids",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=400&fit=crop&q=80",
    description: "Boys & Girls clothing",
    span: "",
    tall: false,
  },
  {
    label: "Beautify",
    href: "/beautify",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=80",
    description: "Skincare, Makeup, Fragrances",
    span: "md:col-span-2",
    tall: false,
  },
  {
    label: "Accessories",
    href: "/accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop&q=80",
    description: "Watches, Bags, Belts & more",
    span: "",
    tall: false,
  },
  {
    label: "Girls",
    href: "/girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop&q=80",
    description: "Dresses, Ethnic, Winter wear",
    span: "",
    tall: false,
  },
  {
    label: "Boys",
    href: "/boys",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop&q=80",
    description: "T-Shirts, Jeans, Ethnic wear",
    span: "",
    tall: false,
  },
];

export function HomeCategories() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-[var(--space-section)] lg:px-8">
      <Reveal dir="up">
        <h2 className="mb-10 text-center font-display text-[length:var(--text-display)] font-bold tracking-tight text-ink">
          Explore Collections
          <span className="mx-auto mt-2 block h-1 w-12 rounded-pill bg-volt" />
        </h2>
      </Reveal>

      <StaggerGroup stagger={0.06}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <Reveal key={cat.href} dir="up" className={cat.span}>
              <CardContainer className="w-full">
                <CardBody className="relative h-full w-full overflow-hidden rounded-lg">
                  <Link
                    href={cat.href}
                    className="group relative block overflow-hidden rounded-lg"
                    style={{ aspectRatio: cat.tall ? "3/4" : "4/3" }}
                  >
                    <CardItem translateZ={20} className="absolute inset-0">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </CardItem>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                    <CardItem translateZ={40} className="absolute bottom-0 left-0 p-4 lg:p-6">
                      <span className="block font-display text-[length:var(--text-lead)] font-bold text-paper lg:text-[length:var(--text-title)]">
                        {cat.label}
                      </span>
                      <span className="mt-1 block font-sans text-[length:var(--text-meta)] text-paper/70">
                        {cat.description}
                      </span>
                    </CardItem>
                    <CardItem translateZ={30} className="absolute right-4 bottom-4 lg:right-6 lg:bottom-6">
                      <span className="rounded-md bg-paper/20 px-3 py-1.5 font-sans text-[length:var(--text-micro)] font-semibold text-paper backdrop-blur-sm transition-colors duration-[var(--dur-micro)] group-hover:bg-volt group-hover:text-volt-ink">
                        Shop Now
                      </span>
                    </CardItem>
                  </Link>
                </CardBody>
              </CardContainer>
            </Reveal>
          ))}
        </div>
      </StaggerGroup>
    </section>
  );
}
