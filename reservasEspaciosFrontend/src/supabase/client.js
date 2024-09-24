import { createClient } from '@supabase/supabase-js'

const projectURL = import.meta.env.VITE_SUPABASE_URL;
const projectKey = import.meta.env.VITE_SUPABASE_KEY

console.log(projectURL,projectKey)

export const supabase = createClient(projectURL,projectKey)