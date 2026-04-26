import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-primary">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-primary">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-success px-6 py-3 text-sm font-medium text-success-foreground transition-colors hover:bg-success/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AprovadoIA — Estude menos, aprove mais" },
      {
        name: "description",
        content:
          "Tutor de concursos com IA: cronograma personalizado, questões geradas e correção de redação. Do edital à aprovação.",
      },
      { name: "author", content: "AprovadoIA" },
      { property: "og:title", content: "AprovadoIA — Estude menos, aprove mais" },
      {
        property: "og:description",
        content:
          "Tutor inteligente para concursos públicos no Brasil. Cronograma adaptado ao edital, questões por IA e correção de redação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AprovadoIA — Estude menos, aprove mais" },
      { name: "description", content: "AprovadoIA is an AI-powered tutor for Brazilian public exam candidates." },
      { property: "og:description", content: "AprovadoIA is an AI-powered tutor for Brazilian public exam candidates." },
      { name: "twitter:description", content: "AprovadoIA is an AI-powered tutor for Brazilian public exam candidates." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f38b1d11-780a-4c3a-8863-548e54c645a0/id-preview-982ddab5--34272186-9cb1-4b5b-8336-7eaaaae2a18a.lovable.app-1777232276943.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f38b1d11-780a-4c3a-8863-548e54c645a0/id-preview-982ddab5--34272186-9cb1-4b5b-8336-7eaaaae2a18a.lovable.app-1777232276943.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
