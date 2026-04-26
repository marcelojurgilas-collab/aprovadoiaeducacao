import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-semibold text-sm">A</span>
            </div>
            <span className="font-display font-semibold text-primary text-xl">AprovadoIA</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Estude menos, aprove mais. Seu tutor de concursos com Inteligência Artificial.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-primary mb-4">Produto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#como-funciona" className="hover:text-primary">Como funciona</a></li>
            <li><a href="#precos" className="hover:text-primary">Preços</a></li>
            <li><a href="#depoimentos" className="hover:text-primary">Aprovados</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-primary mb-4">Empresa</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Sobre</a></li>
            <li><a href="#" className="hover:text-primary">Blog</a></li>
            <li><a href="#" className="hover:text-primary">Contato</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-primary mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Termos</a></li>
            <li><a href="#" className="hover:text-primary">Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 text-xs text-muted-foreground flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} AprovadoIA. Todos os direitos reservados.</span>
          <span>Feito com ☕ no Brasil.</span>
        </div>
      </div>
    </footer>
  );
}
