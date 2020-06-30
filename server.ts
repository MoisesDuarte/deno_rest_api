import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'

const port = 5000

const app = new Application()

app.use(router.routes()) // inicializando router
app.use(router.allowedMethods()) // permitindo todos métodos (GET, POST, etc...)

console.log(`Servidor rodando na porta ${port}`)

await app.listen({ port })