import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Plano = {
  id: string;
  nome_concurso: string;
  edital_nome: string | null;
  created_at: string;
};

export const Route = createFileRoute("/dashboard/planos/")({
  head: () => ({ meta: [{ title: "Meus planos — AprovadoIA" }] }),
  component: PlanosListPage,
});

function PlanosListPage() {
  const [planos, setPlanos] = useState<Plano[] | null>(null);

  useEffect(() => {
    supabase
      .from("planos")
      .select("id, nome_concurso, edital_nome, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPlanos((data as Plano[]) ?? []));
  }, []);

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary tracking-tight">
            Meus planos
          </h1>
          <p className="mt-2 text-muted-foreground">Planos de estudo gerados a partir dos seus editais.</p>
        </div>
        <Link
          to="/dashboard/enviar-edital"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors"
        >
          <Plus className="size-4" />
          Novo plano
        </Link>
      </div>

      <div className="mt-8">
        {planos === null ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : planos.length === 0 ? (
          <div className="text-center bg-card border border-border/60 rounded-3xl p-12">
            <FileText className="size-10 text-muted-foreground mx-auto" />
            <p className="mt-4 text-primary font-medium">Nenhum plano ainda</p>
            <p className="text-sm text-muted-foreground mt-1">
              Envie o PDF do seu edital e a IA monta seu primeiro plano.
            </p>
            <Link
              to="/dashboard/enviar-edital"
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors"
            >
              <Plus className="size-4" />
              Enviar edital
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {planos.map((p) => (
              <Link
                key={p.id}
                to="/dashboard/planos/$id"
                params={{ id: p.id }}
                className="bg-card border border-border/60 rounded-2xl p-5 hover:border-success/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="size-3.5" />
                  {new Date(p.created_at).toLocaleDateString("pt-BR")}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-primary">
                  {p.nome_concurso}
                </h3>
                {p.edital_nome && (
                  <p className="mt-1 text-xs text-muted-foreground truncate">{p.edital_nome}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
