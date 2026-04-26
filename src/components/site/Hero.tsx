import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-study.jpg";
import a1 from "@/assets/aprovado-1.jpg";
import a2 from "@/assets/aprovado-2.jpg";
import a3 from "@/assets/aprovado-3.jpg";

export function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24 lg:pt-20 lg:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">
      <div className="flex flex-col items-start">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border/60 shadow-sm mb-8">
          <div className="size-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Vagas abertas para mentoria
          </span>
        </div>

        <h1 className="font-display text-5xl lg:text-[4rem] leading-[1.05] font-semibold tracking-tight text-primary text-balance">
          Seu tutor de concursos com Inteligência Artificial.
        </h1>

        <p className="mt-8 text-lg text-muted-foreground text-pretty max-w-[44ch] leading-relaxed">
          Cronograma personalizado, questões geradas por IA e correção de redação em segundos.
          Do edital à aprovação — sem planilhas e sem culpa.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-success text-success-foreground font-medium text-base hover:bg-success/90 transition-colors shadow-soft"
          >
            Quero meu plano de estudos grátis
            <ArrowRight className="size-4" />
          </Link>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary">Sem cartão de crédito.</span>
            <span className="text-xs text-muted-foreground">Cancele quando quiser.</span>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="flex -space-x-3">
            <img src={a1} alt="" className="size-10 rounded-full border-2 border-background object-cover" />
            <img src={a2} alt="" className="size-10 rounded-full border-2 border-background object-cover" />
            <img src={a3} alt="" className="size-10 rounded-full border-2 border-background object-cover" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-primary">+12.000 concurseiros</div>
            <div className="text-muted-foreground text-xs">já estudam com a AprovadoIA</div>
          </div>
        </div>
      </div>

      {/* Visual */}
      <div className="relative w-full max-w-md mx-auto lg:ml-auto lg:max-w-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-warmth/80 blur-[120px] rounded-full -z-0" />

        <div className="relative z-10 rounded-[2rem] overflow-hidden bg-muted border-8 border-card shadow-card aspect-[4/5]">
          <img
            src={heroImg}
            alt="Mesa de estudos organizada com caderno, café e laptop"
            width={1280}
            height={1600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Schedule Card */}
        <div className="absolute -bottom-8 -left-6 sm:-left-12 bg-card p-6 rounded-2xl shadow-card border border-border/50 z-20 w-[300px]">
          <div className="flex justify-between items-center mb-5">
            <span className="font-display font-medium text-primary text-base">Rotina de hoje</span>
            <span className="text-[11px] font-medium bg-success-soft text-success px-2.5 py-1 rounded-md tabular-nums">
              75% feito
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 size-5 rounded-full bg-success flex items-center justify-center shrink-0">
                <Check className="size-3 text-success-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Direito Administrativo</p>
                <p className="text-xs text-muted-foreground mt-0.5">Revisão + 30 questões</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 size-5 rounded-full border-2 border-border bg-card shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm">Raciocínio Lógico</p>
                <p className="text-xs text-muted-foreground mt-0.5">Módulo 4: Probabilidade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tip */}
        <div className="absolute top-12 -right-4 sm:-right-8 bg-card pl-4 pr-5 py-3 rounded-xl shadow-xl border border-border/60 z-20 flex items-center gap-3">
          <div className="size-8 rounded-full bg-warmth flex items-center justify-center shrink-0">
            <Sparkles className="size-4 text-amber-600" />
          </div>
          <p className="text-xs font-medium text-primary leading-tight max-w-[14ch]">
            Revisão ajustada para amanhã
          </p>
        </div>
      </div>
    </section>
  );
}
