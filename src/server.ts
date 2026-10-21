import express from "express"
import "./connection/connection.js"
import { clienteRouter } from "./routes/clientes.routes.js"
const app = express()
const port = 3000

app.use(express.json())

app.use("/clientes", clienteRouter )

app.listen(port, () =>{
    console.log("Servidor ligado na porta", port)
})