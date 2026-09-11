// 1. Copie este arquivo e renomeie a cópia para "config.js"
// 2. Substitua os valores abaixo pelos dados do seu projeto Supabase
//    (Project Settings > API, no painel do Supabase)
// 3. O config.js está no .gitignore e nunca será enviado ao GitHub

const SUPABASE_URL = "sb_publishable_WBtHI_Gy-gzbSEE5v_mXqw_gTC2Vn8p";
const SUPABASE_ANON_KEY = "https://ufyvevjtrsyxbcflodpe.supabase.co";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);