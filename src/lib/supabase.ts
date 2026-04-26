import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iyorylspakpvtfgdpiai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5b3J5bHNwYWtwdnRmZ2RwaWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMzM3MzQsImV4cCI6MjA5MjgwOTczNH0.tt_3vGm_jypOqh2rDYWurrbMkYEZC9pkOn_VwiTySCI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
