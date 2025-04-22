import express from 'express'
const router = express.Router()

const produtos = [
    { id: 1, nome: 'Mouse', preco: 50 },
    { id: 2, nome: 'Teclado', preco: 100 },
    { id: 3, nome: 'Carregador', preco: 250 },
    { id: 4, nome: 'Webcam', preco: 350 }
]

router.get("/produtos", (req, res) => {
    res.status(200).json(produtos)
})

router.post("/produtos", (req, res) => {
    const { nome, preco } = req.body
    let novo = {
        id: produtos[produtos.length - 1].id + 1,
        nome,
        preco
    }
    produtos.push(novo)
    res.status(201).json({ message: "Produto adicionado com sucesso!" })
})

router.put("/produtos/:id", (req, res) => {
    const { id } = req.params
    const { novoNome, novoPreco } = req.body

    const indice = produtos.findIndex((produtos) => {
        return produtos.id == id
    })
    if (indice === -1) {
        return res.status(404).send({ error: "Id não encontrado!" })
    }

    produtos[indice].nome = novoNome
    produtos[indice].preco = novoPreco

    res.send(produtos)
})

router.delete("/produtos/:id", (req, res) => {
    const { id } = req.params

    const indice = produtos.findIndex((produtos) => {
        return produtos.id == id
    })

    if (indice === -1) {
        return res.status(404).send({ error: "Id não encontrado!" })
    }
    produtos.splice(indice, 1)
    res.send(produtos)
})

router.get("/produtos/:id", (req, res) => {
    const { id } = req.params

    const indice = produtos.findIndex((produtos) => {
        return produtos.id == id
    })
    if (indice === -1) {
        res.status(404).send({ error: "Id não encontrado!" })
    }
    const produto = produtos[indice]
    res.send(produto)
})

export default router