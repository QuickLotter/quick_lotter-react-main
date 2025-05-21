// Path: services/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Substitua pelos dados reais do seu projeto
const SUPABASE_URL = "https://kfygjgzvegimisnkqzao.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmeWdqZ3p2ZWdpbWlzbmtxemFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1MTE5MjQsImV4cCI6MjAzMjA4NzkyNH0.6orQJ9mQTeBMK_fe4n_aYMEpk-ncmQewEfBhkZHH5QQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
