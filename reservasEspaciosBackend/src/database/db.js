import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

export const connectSupabase = () => {
    try {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        console.log("Conectado a supabase")
        return supabase;
    } catch (error) {
        console.log(error)
    }
}
export default connectSupabase.s