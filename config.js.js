// 1. Copie este arquivo e renomeie a cópia para "config.js"
// 2. Substitua os valores abaixo pelos dados do seu projeto Supabase
//    (Project Settings > API, no painel do Supabase)
// 3. O config.js está no .gitignore e nunca será enviado ao GitHub

const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_AQUI";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
