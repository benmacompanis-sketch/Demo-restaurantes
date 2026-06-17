import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://rikoolpoltygufhegudq.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_a3oLzw447cZMzl0qqlt35w_68XMMgyw';

export const supabase = createClient(url, key);
