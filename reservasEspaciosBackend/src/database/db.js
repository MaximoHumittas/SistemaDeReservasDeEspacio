import 'dotenv/config'; 
import { createClient } from '@supabase/supabase-js';

//se conecta a la supbase

export const connectSupabase = async () => {

    try {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

        console.log("Conectado correctamente a supabase")
        return supabase;
        
    } catch (error) {
        console.log(error)
        
    }

}

