import app from './app.js'
import { connectSupabase } from './database/db.js'

connectSupabase()
app.listen(3000, () => {
    console.log('Backend Corriendo en http://localhost:3000');
});

export default app