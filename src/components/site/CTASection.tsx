import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-card border-y border-border/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl lg:text-5xl font-semibold text-primary tracking-tight text-balance">
          Pronto pra estudar menos e aprovar mais?
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          Crie sua conta em 30 segundos e receba seu primeiro cronograma personalizado agora.
        </p>
        <Link
          to="/signup"
          className="mt-10 inline-flex items-center gap-2 h-14 px-8 rounded-full bg-success text-success-foreground font-medium text-base hover:bg-success/90 transition-colors shadow-soft"
        >
          Quero meu plano de estudos grátis
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
