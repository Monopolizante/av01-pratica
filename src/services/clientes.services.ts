import { type Request, type Response } from "express";
import { pool } from "../connection/connection.js";
import { json } from "node:stream/consumers";
class ClienteServices{
    async getAll(){
            const data = await pool.query("SELECT * FROM clientes")
            return data.rows
    }
    async getById(idCliente: string){
        try {
            const data = await pool.query("SELECT * FROM clientes WHERE id=$1", [idCliente])
            return data.rows[0]
        } catch (error) {
            console.log(error)
            return 
        }
    }
    async patchById(nome: string, telefone: string, dt_nascimento: string, email: string, idCliente: string){
        //A quantidade de campos para ser mudada não foi especificada!
        try {
            const data = await pool.query("UPDATE clientes SET nome=$1, telefone=$2, dt_nascimento= $3, email=$4 WHERE id=$5 RETURNING *", [nome, telefone, dt_nascimento, email, idCliente])
            return data.rows[0]
        } catch (error) {
            console.log(error)
            return 
        }
    }
    async createCliente(nome: string, telefone: string, dt_nascimento: string, email: string){
        try {
            const result = await pool.query("INSERT INTO clientes(nome, telefone, dt_nascimento, email) VALUES ($1, $2, $3, $4) RETURNING id, nome", [nome, telefone, dt_nascimento, email])
            return result.rows[0]
        } catch (error) {
            console.log(error)
            return 
        }

    }
    async deleteById(idCliente: string){
        try {
            const data = await pool.query("DELETE FROM clientes WHERE id = $1", [idCliente])
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export const clienteServices = new ClienteServices