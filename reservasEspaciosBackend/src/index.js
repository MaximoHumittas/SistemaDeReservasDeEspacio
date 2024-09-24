
import app from './app.js'
import { connectSupabase } from './database/db.js'


connectSupabase()
app.listen(3000)
console.log("Escuchando por el ", 3000)

export default app