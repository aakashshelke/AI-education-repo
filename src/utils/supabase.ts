import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qgmwvqyisenjgvzmwlwl.supabase.co";
// import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbXd2cXlpc2Vuamd2em13bHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTY1NzksImV4cCI6MjA1ODIzMjU3OX0.PRmDYD1QQvyJnFJlWGv5QxsOz60sAkgOsAnxq8JaXcA";
// import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);