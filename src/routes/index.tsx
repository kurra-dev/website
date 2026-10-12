import { useEffect } from "react";

import { useLocale } from "@/lib/i18n";
import { Access } from "@/site/Access";
import { Compliance } from "@/site/Compliance";
import { Decisions } from "@/site/Decisions";
import { Ecosystems } from "@/site/Ecosystems";
import { Footer } from "@/site/Footer";
import { Header } from "@/site/Header";
import { Hero } from "@/site/Hero";
import { Hosting } from "@/site/Hosting";
import { homeMeta } from "@/site/meta";
import { Setup } from "@/site/Setup";

/** The home page. The prerendered HTML carries the English title; this keeps it in step with the chosen language. */
export function HomePage() {
  const { locale } = useLocale();
  useEffect(() => {
    const { title, description } = homeMeta();
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [locale]);

  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Setup />
        <Decisions />
        <Ecosystems />
        <Compliance />
        <Access />
        <Hosting />
      </main>
      <Footer />
    </div>
  );
}
