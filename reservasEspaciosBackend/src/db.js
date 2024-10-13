import dotenv from 'dotenv'; // Importar dotenv para cargar variables de entorno
import { createClient } from '@supabase/supabase-js'; // Importar Supabase

// Cargar las variables de entorno desde .env
dotenv.config();

// Crear el cliente de Supabase utilizando las variables de entorno
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Exportar el cliente de Supabase
export default supabase;
