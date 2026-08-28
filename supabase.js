const SUPABASE_URL = "TON_PROJECT_URL";
const SUPABASE_ANON_KEY = "TA_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
