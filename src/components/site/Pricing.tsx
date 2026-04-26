import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Grátis",
    price: "R$ 0",
    period: "/sempre",
    description: "Para começar e provar o método.",
    features: ["1 cronograma personalizado", "10 questões por mês", "Acompanhamento básico"],
    cta: "Começar grátis",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$ 49",
    period: "/mês",
    description: "Para quem está estudando pra valer.",
    features: [
      "Cronograma ilimitado",
      "Questões ilimitadas por IA",
      "Correção de redação ilimitada",
      "Dashboard de desempenho avançado",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
    highlight: true,
  },
  {
    name: "Anual",
    price: "R$ 397",
    period: "/ano",
    description: "Tudo do Pro com 33% de desconto.",
    features: ["Tudo do Plano Pro", "2 meses grátis", "Acesso antecipado a novidades"],
    cta: "Economizar agora",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="precos" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-success mb-4 block">
            Preços
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-primary tracking-tight text-balance">
            Investimento que cabe no bolso.
          </h2>
          <p className="text-muted-foreground text-lg mt-5">
            Mais barato que qualquer cursinho. Cancele a qualquer momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 lg:p-10 flex flex-col ${
                p.highlight
                  ? "bg-primary text-primary-foreground shadow-card scale-[1.02] border-2 border-success"
                  : "bg-card border border-border/60"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-soft">
                  Mais escolhido
                </span>
              )}
              <h3 className="font-display text-xl font-semibold mb-2">{p.name}</h3>
              <p className={`text-sm ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"} mb-6`}>
                {p.description}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-display text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className={p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}>
                  {p.period}
                </span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`size-5 shrink-0 ${p.highlight ? "text-success" : "text-success"}`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`inline-flex items-center justify-center h-12 rounded-full font-medium text-sm transition-colors ${
                  p.highlight
                    ? "bg-success text-success-foreground hover:bg-success/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
