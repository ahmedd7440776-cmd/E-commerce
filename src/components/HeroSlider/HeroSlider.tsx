"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=85",
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?auto=format&fit=crop&w=2000&q=85",
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1675535350277-6fdb9948bfcb?auto=format&fit=crop&w=2000&q=85",
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1637437757614-6491c8e915b5?auto=format&fit=crop&w=2000&q=85",
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1687444334081-8ca04ed2a1a3?auto=format&fit=crop&w=2000&q=85",
    title: "Be part of our community",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1744135995007-f1dde493d241?auto=format&fit=crop&w=2000&q=85",
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=2000&q=85",
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85",
    title: "Make the first order Today",
    subtitle: "New arrivals are here",
    primary: "Shop Now",
    secondary: "Explore",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2000&q=85",
    title: "Discover Something\nFresh Today",
    subtitle: "New arrivals are here",
    primary: "Shop Now",
    secondary: "Explore",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=85",
    title: "Newest items, Delivered\nto your Door",
    subtitle: "Find your everyday favorites",
    primary: "Shop Now",
    secondary: "View Deals",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  const slide = slides[active];

  return (
    <section
      aria-label="Featured offers"
      aria-roledescription="carousel"
      className="relative isolate mx-auto min-h-64 w-full overflow-hidden  bg-emerald-700 sm:min-h-80 lg:min-h-97.5"
    >
      {/* Background photos */}
      {/* {slides.map((item, index) => (
        <div
          key={item.image}
          aria-hidden={index !== active}
          className={`absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-700 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${item.image}")` }}
        />
      ))} */}

      {slides.map((item, index) => {
        const prev = (active - 1 + slides.length) % slides.length;
        const next = (active + 1) % slides.length;
        if (index !== active && index !== prev && index !== next) return null;

        return (
          <div
            key={item.image}
            aria-hidden={index !== active}
            className={`absolute inset-0 -z-20 transition-opacity duration-700 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover object-center"
            />
          </div>
        );
      })}

      {/* Green overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r to-green-400/35" />

      {/* Text and links */}
      <div className="flex min-h-64 items-center px-6 py-12 sm:min-h-80 sm:px-14 lg:min-h-97.5 lg:px-24">
        <div key={active} className="max-w-xl text-white">
          <h1 className="whitespace-pre-line text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base">{slide.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/shop"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              {slide.primary}
            </a>

            <a
              href="/shop"
              className="rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {slide.secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Previous button */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(active - 1)}
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-green-600 shadow transition hover:scale-105 sm:left-5 sm:h-12 sm:w-12"
      >
        <span aria-hidden="true" className="text-2xl leading-none">
          ‹
        </span>
      </button>

      {/* Next button */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(active + 1)}
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-green-600 shadow transition hover:scale-105 sm:right-5 sm:h-12 sm:w-12"
      >
        <span aria-hidden="true" className="text-2xl leading-none">
          ›
        </span>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === active
                ? "w-8 bg-white"
                : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
