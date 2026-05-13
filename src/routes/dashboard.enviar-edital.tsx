import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { UploadCloud, FileText, Loader2, Sparkles, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { extractPdfText } from "@/lib/pdf";

export const Route = createFileRoute("/dashboard/enviar-edital")({
  head: () => ({ meta: [{ title: "Enviar edital — AprovadoIA" }] }),
  component: EnviarEditalPage,
});

type Etapa = "idle" | "lendo" | "enviando" | "ia" | "salvando";

function EnviarEditalPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [nomeConcurso, setNomeConcurso] = useState("");
  const [horas, setHoras] = useState(3);
  const [etapa, setEtapa] = useState<Etapa>("idle");
  const [erro, setErro] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const onPick = useCallback((f: File | null) => {
    setErro("");
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setErro("O arquivo precisa ser um PDF.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setErro("Tamanho máximo: 10MB.");
      return;
    }
    setFile(f);
  }, []);

  const submeter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErro("Selecione o PDF do edital.");
      return;
    }
    setErro("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate({ to: "/login" });
        return;
      }

      setEtapa("lendo");
      const texto = await extractPdfText(file);
      if (texto.length < 200) {
        setErro("Não consegui extrair texto do PDF (talvez seja escaneado).");
        setEtapa("idle");
        return;
      }

      setEtapa("enviando");
      const path = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("editais").upload(path, file, {
        contentType: "application/pdf",
        upsert: false,
      });
      if (upErr) {
        console.error(upErr);
        setErro("Falha no upload. Verifique se o bucket 'editais' existe.");
        setEtapa("idle");
        return;
      }

      setEtapa("ia");
      const resp = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, nome_concurso: nomeConcurso, horas_diarias: horas }),
      });
      const json = await resp.json();
      if (!resp.ok) {
        setErro(json.error || "Erro ao gerar plano.");
        setEtapa("idle");
        return;
      }

      setEtapa("salvando");
      const { data: planoRow, error: insErr } = await supabase
        .from("planos")
        .insert({
          user_id: user.id,
          nome_concurso: nomeConcurso || json.plano.nome_concurso || "Concurso",
          edital_path: path,
          edital_nome: file.name,
          plano_json: json.plano,
        })
        .select("id")
        .single();
      if (insErr) {
        console.error(insErr);
        setErro("Falha ao salvar o plano. Verifique se a tabela 'planos' existe.");
        setEtapa("idle");
        return;
      }

      navigate({ to: "/dashboard/planos/$id", params: { id: planoRow.id } });
    } catch (e) {
      console.error(e);
      setErro("Erro inesperado. Tente novamente.");
      setEtapa("idle");
    }
  };

  const carregando = etapa !== "idle";
  const labelEtapa: Record<Etapa, string> = {
    idle: "",
    lendo: "Lendo o PDF…",
    enviando: "Enviando arquivo…",
    ia: "IA analisando o edital e montando o plano…",
    salvando: "Salvando seu plano…",
  };

  return (
    <div className="p-6 lg:p-12 max-w-3xl mx-auto">
      <div>
        <h1 className="font-display text-3xl font-semibold text-primary tracking-tight">
          Enviar edital
        </h1>
        <p className="mt-2 text-muted-foreground">
          Envie o PDF do edital e a IA monta um plano de estudos personalizado.
        </p>
      </div>

      <form onSubmit={submeter} className="mt-8 space-y-6">
        <div>
          <label className="text-xs font-medium text-primary uppercase tracking-wider">
            Nome do concurso (opcional)
          </label>
          <input
            value={nomeConcurso}
            onChange={(e) => setNomeConcurso(e.target.value)}
            maxLength={150}
            placeholder="Ex: Receita Federal — Auditor Fiscal"
            className="mt-2 w-full h-12 rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-primary uppercase tracking-wider">
            Horas disponíveis por dia
          </label>
          <input
            type="number"
            min={1}
            max={12}
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value) || 3)}
            className="mt-2 w-32 h-12 rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-primary uppercase tracking-wider">
            PDF do edital
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              onPick(e.dataTransfer.files?.[0] ?? null);
            }}
            className={`mt-2 rounded-2xl border-2 border-dashed p-8 transition-colors ${
              dragOver ? "border-success bg-success-soft" : "border-border bg-card"
            }`}
          >
            {file ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="size-6 text-success shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  disabled={carregando}
                  className="text-muted-foreground hover:text-primary"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center text-center cursor-pointer">
                <UploadCloud className="size-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-primary">
                  Arraste o PDF aqui ou clique para selecionar
                </p>
                <p className="mt-1 text-xs text-muted-foreground">PDF, até 10MB</p>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => onPick(e.target.files?.[0] ?? null)}
                />
              </label>
            )}
          </div>
        </div>

        {erro && (
          <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{erro}</div>
        )}

        {carregando && (
          <div className="flex items-center gap-3 text-sm text-primary bg-success-soft px-4 py-3 rounded-xl">
            <Loader2 className="size-4 animate-spin" />
            {labelEtapa[etapa]}
          </div>
        )}

        <button
          type="submit"
          disabled={carregando || !file}
          className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors shadow-soft disabled:opacity-60"
        >
          {carregando ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Gerar plano com IA
        </button>
      </form>
    </div>
  );
}
