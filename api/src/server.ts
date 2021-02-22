import express from 'express'

const app = express()

/**
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => deletar
 * PATCH => Alteração específica
 */

app.get("/", (request, response) => {
    return response.send("Hello World")
})

app.post("/", (request, response) => {
    return response.json({message: "Os dados foram salvos com sucesso!"})
})

app.listen(3333, () => console.log('eae'))
