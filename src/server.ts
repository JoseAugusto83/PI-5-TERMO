import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import cors from "cors"

dotenv.config()

const server = express();
server.use(cors())
server.use(express.json());
server.use(router)

server.listen(process.env.PORT, () => console.log("Servidor ta rodando"))