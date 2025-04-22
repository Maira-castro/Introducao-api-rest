import express from "express"
import usuarioRoutes from "./routes/routesUsuario.js" //importar o que está em exportar em routesUsuario.js, neste caso, as rotas
import fornecedorRoutes from "./routes/routesfornecedor.js" 
const app = express()
app.use(express.json()) //permitir usar JSON 

const port = 3000
const localhost = "127.0.0.1"

//rota inicial
app.get("/", (req, res) => {
    // res.statusCode = 202 - adicionar um codigo ao retornar
    res.send(`Bem vindo a minha API!`)
})

//para usar as rotas de usuario - apartir de uma rota inicial 
app.use("/usuarios",usuarioRoutes)
app.use("/fornecedores",fornecedorRoutes)
//servidor vai rodar neste caminho
app.listen(port, localhost, () => {
    console.log(`disponivel em -> http://${localhost}:${port}`);
})