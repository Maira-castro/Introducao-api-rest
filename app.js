import express from "express"

const app = express()

const port = 3000 //numero da porta que será as conexões
const localhost = "127.0.0.1"

//permitir ler JSON no corpo da requisição
app.use(express.json())

const usuario = [
    {
        id: 1,
        nome: "Joao",
        email: "joao@email.com"
    },
    {
        id: 2,
        nome: "ana",
        email: "ana@email.com"
    }
]
//app -> variavel que guardamos o express
//.get -> metodo de tratamento 
//"" -> o que esta dentro de aspas é o caminho da requisição
//(req,res) -> o req é a mensagem do que o usuario pedi para o servidor, 
// res é o que vamos mandar de voltar(tudo que esta dentro da arrow function)
app.get("/usuario", (req, res) => {
    res.send(`-->Hello World!<--`)
})

app.get("/criarUsuario", (req, res) => {
    //para receber pelo body, no nosso caso JSON por isso as {}
    const { nome } = req.body
    res.send(nome)
})

//para receber por parametro 
app.put("/usuario/:id", (req, res) => {
    let { id } = req.params
    res.send(id)
    const {novoNome, novoEmail} = req.body
    const usuario = usuario.find(
        usuario => usuario.id === parseInt(id)
    )
    usuario.nome = novoNome
    usuario.email = novoEmail

    res.send(usuario)

})

//listen é ouvir, colocaremos o servidor no AR para ouvir solicitações
app.listen(port, localhost, () => {
    console.log(`disponivel em -> http://${localhost}:${port}`);
})