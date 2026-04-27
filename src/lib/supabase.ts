import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iyorylspakpvtfgdpiai.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_nNgQyx3aBKuPn7jldchnwg_xl0hroa5";
export const AUTH_REDIRECT_URL = "https://aprovadoiaeducacao.lovable.app/dashboard";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storageKey: "aprovadoia-auth",
  },
});

export async function signInWithGooglePopup() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: AUTH_REDIRECT_URL,
      skipBrowserRedirect: true,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!data?.url || typeof window === "undefined") {
    throw new Error("Não foi possível iniciar o login com Google.");
  }

  const width = 520;
  const height = 720;
  const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
  const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);

  const popup = window.open(
    data.url,
    "google-auth",
    `popup=yes,width=${width},height=${height},left=${left},top=${top}`,
  );

  if (!popup) {
    throw new Error("Permita popups no navegador para continuar com Google.");
  }

  popup.focus();

  await new Promise<void>((resolve, reject) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        cleanup();
        popup.close();
        resolve();
      }
    });

    const popupWatcher = window.setInterval(() => {
      if (popup.closed) {
        cleanup();
        reject(new Error("Popup fechado antes da conclusão do login."));
      }
    }, 500);

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Tempo esgotado ao aguardar autenticação com Google."));
    }, 120000);

    function cleanup() {
      subscription.unsubscribe();
      window.clearInterval(popupWatcher);
      window.clearTimeout(timeout);
    }
  });
}
