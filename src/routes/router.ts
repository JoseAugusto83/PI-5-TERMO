import express, { Router, Request, Response } from "express";
import { InsertProduct, deleteProduct, getProducts, updateProduct } from "../controllers/produtosController";
import { deleteSell, getSell, insertSell, updateSell } from "../controllers/produtosVendidosController";

const router = Router();

router.get("/produtos", getProducts)
router.post("/produtos", InsertProduct)
router.delete('/produtos/:id', deleteProduct)
router.put("/produtos/:id", updateProduct)
router.get("/vendidos", getSell)
router.post("/vendidos", insertSell)
router.put("/vendidos/:id", updateSell)
router.delete("/vendidos/:id", deleteSell)


export default router

