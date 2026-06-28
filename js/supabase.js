// ======================================================
// Dakota Wilder Website
// Shared Supabase Connection
// ======================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://ypgxwzgcvnkssvhsqxai.supabase.co",
  "sb_publishable_0Hg47TrZSDV_mkIGqpcbYQ_O8FzDR32"
);