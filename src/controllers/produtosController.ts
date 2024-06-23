import { Request, Response } from "express";
import sequelize from "../instances/mysql";
import {Product} from "../models/Produto";
import {Sell} from "../models/ProdutoVendido"

export const getProducts = async (req: Request, res: Response) =>{

    res.json(await Product.findAll())
}

export const InsertProduct = async (req: Request, res: Response) =>{
    let {name, category, price, qtt, user_id} = req.body;

    if(name && category && price && qtt && user_id){
        if(parseInt(qtt) && parseFloat(price))
            await Product.create({
                produto_nome: name,
                produto_categoria: category,
                produto_preco: price,
                produto_quantidade: qtt,
                user_id: user_id
            })

        res.status(201)
        res.json({name, category, price, qtt, user_id})
    }else{
        res.status(400)
        res.json({error: 'Está faltando parametros'})
    }
}

export const deleteProduct = async (req: Request, res: Response) =>{
    let {id} = req.params
    
    
    
    await Sell.destroy({
    where: {produto_id: id}
    })

    await Product.destroy({
        where: {produto_id: id}
    })
    res.json({deletou: "Deletado com sucesso"})}


export const updateProduct = async (req: Request, res: Response) => {
    let {id} = req.params
    let {name, category, price, qtt} = req.body;

    let product = await Product.findByPk(id)

    if(product){
        product.produto_nome = name
        product.produto_categoria = category
        product.produto_preco = price
        product.produto_quantidade = qtt
        
        await product.save()
        res.json({name, category, price, qtt})

    }else{
        res.json({error: "Produto não encontrado"})
    }

}