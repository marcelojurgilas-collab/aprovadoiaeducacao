import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Benefits } from "@/components/site/Benefits";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AprovadoIA — Seu tutor de concursos com IA" },
      {
        name: "description",
        content:
          "Cronograma personalizado, questões geradas por IA e correção de redação em segundos. Do edital à aprovação.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
