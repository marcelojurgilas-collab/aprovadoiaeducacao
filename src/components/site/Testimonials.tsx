import { Star } from "lucide-react";
import a1 from "@/assets/aprovado-1.jpg";
import a2 from "@/assets/aprovado-2.jpg";
import a3 from "@/assets/aprovado-3.jpg";

const items = [
  {
    img: a1,
    name: "Mariana Costa",
    role: "Aprovada — Receita Federal",
    text: "Em 8 meses passei numa prova que estudava há 3 anos. O cronograma adaptativo mudou meu jogo — eu finalmente sabia o que estudar todo dia.",
  },
  {
    img: a2,
    name: "Rafael Souza",
    role: "Aprovado — PRF",
    text: "A correção de redação me deu 1 ponto a mais. Foi a diferença entre ficar no cadastro reserva e ser nomeado em primeira chamada.",
  },
  {
    img: a3,
    name: "Patrícia Almeida",
    role: "Aprovada — INSS",
    text: "Sou mãe e trabalho fora. A IA respeitou meu tempo real (2h/dia) e ajustou o plano quando precisei faltar. Sem culpa, sem maratonas.",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-card border-y border-border/60 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-success mb-4 block">
            Aprovados
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-primary tracking-tight text-balance">
            Histórias reais de quem passou.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((t) => (
            <figure
              key={t.name}
              className="bg-background rounded-3xl p-8 border border-border/60 flex flex-col"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-foreground/90 text-base leading-relaxed flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-display font-semibold text-primary text-sm">{t.name}</div>
                  <div className="text-xs text-success font-medium">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
