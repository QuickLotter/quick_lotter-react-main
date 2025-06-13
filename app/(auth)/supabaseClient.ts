import { createClient } from "@supabase/supabase-js";

// Coloque aqui sua URL e KEY do Supabase
const supabaseUrl = "https://hlthyxpkwvfdqqrihlkg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsdGh5eHBrd3ZmZHFxcmlobGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDkwOTgsImV4cCI6MjA2MDgyNTA5OH0.Ru4x0I0EcnVNtTor0nJec1gtATkfu8A0gv-31kJjqDA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
