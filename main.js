import express from "express"

const app = express()
app.use(express.json()) //permitir usar JSON 

const port = 3000
const localhost = "127.0.0.1"

//banco de dados (fake) em memoria
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

//boas vindas
app.get("/", (req, res) => {
    // res.statusCode = 202 - adicionar um codigo ao retornar
    res.send(`Bem vindo a minha API!`)
})

//retornar lista de usuarios
app.get("/usuarios", (req, res) => {
    // res.send(usuario)
    // res.json(usuario) - para retornar no formato json
    res.status(200).json(usuario) // res.status(200) = coloca o status 200 e .json(usuario) retorna a lista de usuario
})

//criar usuario
app.post("/criarUsuario", (req, res) => {
    const { nome, email } = req.body

    let novo = {
        id: usuario[usuario.length - 1].id + 1,
        nome: nome,
        email: email
    }
    usuario.push(novo)
    res.status(201).send(usuario)
})

//deletar usuario
app.delete("/usuario/:id", (req, res) => {
    const { id } = req.params
    const indice = usuario.findIndex((usuarios) => {
        return usuarios.id == id
    })
    if (indice === -1) {
        return res.status(404).send({ message: "Id não encontrado" })
    }
    usuario.splice(indice, 1)
    res.status(200).send({ message: "Usuario excluido!" })
})

//para receber por parametro()
app.put("/usuario/:id", (req, res) => {
    const { id } = req.params //vai receber por parametro 
    const { novoNome, novoEmail } = req.body //vai receber pela body

    //usuario(lista)  usuarios(variavel que vamos atribuir cada item da lista)
    const indice = usuario.findIndex((usuarios) => {
        return usuarios.id == id
    })

    // try{
    //     usuario[indice].nome = novoNome
    //     usuario[indice].email = novoEmail
    //     res.send(usuario)
    // }catch{
    //     // usuario[indice].nome = novoNome
    //     // usuario[indice].email = novoEmail
    //     // res.send(usuario)
    // }
    // OU ASSIM  - para retornar uma mensagem de erro 404 caso o id não exista
    if (indice === -1) {
        return res.status(404).send({ message: "Id não encontrado" })
    }
    usuario[indice].nome = novoNome
    usuario[indice].email = novoEmail

    // res.send(usuario)
    res.status(204).send(usuario)
})

//servidor vai rodar neste caminho
app.listen(port, localhost, () => {
    console.log(`disponivel em -> http://${localhost}:${port}`);
})
