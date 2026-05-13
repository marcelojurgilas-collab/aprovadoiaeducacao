import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Você é um especialista em planejamento de estudos para concursos públicos brasileiros.
Recebe o texto de um edital e gera um plano de estudos estruturado, realista e adaptado ao tempo disponível.
Considere: ordem de dificuldade, peso de cada disciplina e revisões periódicas.
Sempre responda chamando a ferramenta gerar_plano com o JSON solicitado. Não responda em texto livre.`;

const TOOL = {
  type: "function" as const,
  function: {
    name: "gerar_plano",
    description: "Retorna o plano de estudos estruturado",
    parameters: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        nome_concurso: { type: "string" },
        duracao_total: { type: "string", description: "Ex: '4 meses'" },
        horas_diarias_sugeridas: { type: "string" },
        resumo: { type: "string", description: "Visão geral em 2-3 frases" },
        disciplinas: {
          type: "array",
          items: {
            type: "object",
            properties: {
              nome: { type: "string" },
              peso: { type: "string", description: "alta, média ou baixa prioridade" },
              carga_horaria: { type: "string" },
              duracao_semanas: { type: "number" },
              topicos: { type: "array", items: { type: "string" } },
              dicas: { type: "string" },
            },
            required: ["nome", "peso", "carga_horaria", "topicos"],
            additionalProperties: false,
          },
        },
        cronograma_semanal: {
          type: "array",
          items: {
            type: "object",
            properties: {
              dia: { type: "string" },
              blocos: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    horario: { type: "string" },
                    disciplina: { type: "string" },
                    atividade: { type: "string" },
                  },
                  required: ["horario", "disciplina", "atividade"],
                  additionalProperties: false,
                },
              },
            },
            required: ["dia", "blocos"],
            additionalProperties: false,
          },
        },
      },
      required: [
        "titulo",
        "nome_concurso",
        "duracao_total",
        "horas_diarias_sugeridas",
        "resumo",
        "disciplinas",
        "cronograma_semanal",
      ],
      additionalProperties: false,
    },
  },
};

export const Route = createFileRoute("/api/generate-plan")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {

        try {
          const body = (await request.json()) as {
            texto?: string;
            nome_concurso?: string;
            horas_diarias?: number;
          };
          const texto = (body.texto ?? "").slice(0, 60000);
          const nome = (body.nome_concurso ?? "").slice(0, 200);
          const horas = body.horas_diarias && body.horas_diarias > 0 ? body.horas_diarias : 3;

          if (!texto || texto.length < 200) {
            return new Response(
              JSON.stringify({ error: "Texto do edital muito curto." }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "AI não configurada." }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          const userPrompt = `Concurso: ${nome || "(não informado, deduzir do edital)"}
Horas disponíveis por dia: ${horas}h

Texto do edital (pode estar truncado):
"""
${texto}
"""

Gere o plano de estudos chamando a ferramenta gerar_plano.`;

          const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-pro",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt },
              ],
              tools: [TOOL],
              tool_choice: { type: "function", function: { name: "gerar_plano" } },
            }),
          });

          if (!resp.ok) {
            const errText = await resp.text();
            console.error("AI gateway error", resp.status, errText);
            if (resp.status === 429) {
              return new Response(
                JSON.stringify({ error: "Limite de requisições atingido. Tente novamente em alguns instantes." }),
                { status: 429, headers: { "Content-Type": "application/json" } },
              );
            }
            if (resp.status === 402) {
              return new Response(
                JSON.stringify({ error: "Créditos de IA esgotados. Adicione créditos no workspace." }),
                { status: 402, headers: { "Content-Type": "application/json" } },
              );
            }
            return new Response(JSON.stringify({ error: "Falha ao gerar plano." }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          const data = await resp.json();
          const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
          const argsStr = toolCall?.function?.arguments;
          if (!argsStr) {
            return new Response(JSON.stringify({ error: "Resposta da IA inválida." }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
          const plano = JSON.parse(argsStr);
          return new Response(JSON.stringify({ plano }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error("generate-plan error", e);
          return new Response(JSON.stringify({ error: "Erro inesperado." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
