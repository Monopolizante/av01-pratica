import e, { type Request, type Response } from "express";
import { Router } from "express";
import { clienteServices } from "../services/clientes.services.js";
import { Client } from "pg";

export const clienteRouter = Router() 

clienteRouter.get("/", async (req, res) => {
    try {
        const data = await clienteServices.getAll()
        return res.status(200).json(data)
    } catch (error) {
        console.log("Erro na rota 'Clientes':", error)
    }

})

clienteRouter.get("/:id", async (req, res) => {
    try {
        const idCliente = req.params.id
        if (!idCliente) {
            return res.json({"message": "Id não inserido"})
        }
        const data = await clienteServices.getById(idCliente)
        if (!data) {
            return res.status(404).json({"message": "Id inserido não é valido/  Cliente não encontrado"})
        }
        return res.status(200).json(data)
    } catch (error) {
        console.log("Erro na rota por id:", error)
    }
})
clienteRouter.patch("/:id", async (req, res) =>{
    try {
        const idCliente = req.params.id
        if (!req.body) {
            return res.json({"message": "Parâmetros de mudança não inseridos"})
        }
        const {nome, telefone, dt_nascimento, email} = req.body
        const data = await clienteServices.patchById(nome, telefone, dt_nascimento, email, idCliente)
        if (!data) {
            return res.json({"message": "Id inserido não é valido/  Cliente não encontrado"})
        }
        return res.status(201).json(data) //Código a ser mandado de resposta não foi específicado
    } catch (error) {
        console.log("Erro na rota de patch por Id:", error)
    }
})
clienteRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.json({"message": "Parâmetros não inseridos"})
        }
        const {nome, telefone, dt_nascimento, email} = req.body
        const result = await clienteServices.createCliente(nome, telefone, dt_nascimento, email)
        if (!result) {
            return res.json({"message": "Valores inseridos são inválidos"})
        }
        return res.status(201).json(result)
    } catch (error) {
        console.log("Erro na rota de criação de clientes:", error)
    }
})
clienteRouter.delete("/:id", async (req, res) =>{
    try {
        const idCliente = req.params.id
        if (!idCliente) {
            return res.json({"message": "Id não inserido"})
        }
        const data = await clienteServices.deleteById(idCliente)
        if (data == true) return res.status(200).json({"message": "Conta deletada com sucesso"}) //Código a ser mandado de resposta não foi específicado
        if (data == false) return res.json({"message": "Cliente não encontrado/ Id inserido inválido"})
    } catch (error) {
        console.log("Erro na rota de patch por Id:", error)
    }
})
