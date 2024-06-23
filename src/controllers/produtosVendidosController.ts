import { Sell } from "../models/ProdutoVendido";
import { Request, Response } from "express";
import sequelize from "../instances/mysql"
import { Product } from "../models/Produto";
import dataAtual from "../utils/date"


export const getSell = async (req: Request, res: Response) =>{
    
    res.json(await Sell.findAll({include: Product}))
}

export const insertSell = async (req: Request, res: Response) =>{
    let {produto_id, venda_qtt, venda_comprador, venda_forma_pagamento} = req.body
    const product = await Product.findByPk(produto_id)

    if(produto_id && venda_qtt && venda_comprador && venda_forma_pagamento){
        const newSell = await Sell.create({
            produto_id: produto_id,
            venda_data: dataAtual,
            venda_qtt: venda_qtt,
            venda_comprador: venda_comprador,
            venda_forma_pagamento: venda_forma_pagamento
    })

    if(product)
    product.produto_quantidade -= venda_qtt
    await product?.save()

    res.json({newSell})
    }else{
        res.json({error: "Está faltando parâmetros"})
    }

    
}


export const deleteSell = async (req: Request, res: Response) =>{
    const params = req.params

    await Sell.destroy({
        where: {venda_id: params.id}
    })

    res.status(202)

}


export const updateSell = async (req: Request, res: Response) =>{
    const params = req.params
    const {id, qtt, comprador, pagamento} = req.body

    const sell = await Sell.findByPk(params.id)

    if(sell){
        sell.produto_id = id,
        sell.venda_data = dataAtual,
        sell.venda_qtt = qtt,
        sell.venda_comprador = comprador,
        sell.venda_forma_pagamento = pagamento
        
        await sell.save()
        res.json({sell})
    }else{
        res.json({error: "Venda não encontrada"})
    }
}