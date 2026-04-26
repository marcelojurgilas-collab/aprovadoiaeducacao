import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-display font-semibold text-sm">A</span>
          </div>
          <span className="font-display font-semibold text-primary text-xl tracking-tight">
            AprovadoIA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-muted-foreground">
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como funciona</a>
          <a href="#beneficios" className="hover:text-primary transition-colors">Benefícios</a>
          <a href="#depoimentos" className="hover:text-primary transition-colors">Aprovados</a>
          <a href="#precos" className="hover:text-primary transition-colors">Preços</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </header>
  );
}
