import express from 'express'
const router = express.Router()

const fornecedores = [
{id: 1, nome: "ExtaPrint"},
{id: 2, nome: "Jacinto"},
{id: 3, nome: "Atacarejo"}
]

router.get("/",(req,res)=>{
    res.status(200).send(fornecedores)
})



export default router