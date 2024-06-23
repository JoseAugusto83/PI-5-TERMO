import { Model, DataTypes} from "sequelize";
import sequelize from "../instances/mysql"
import { Product } from "./Produto";

export interface VendaInstance extends Model {
    venda_id: number,
    produto_id: number,
    venda_data: string,
    venda_qtt: number,
    venda_comprador: string,
    venda_forma_pagamento: string
}


export const Sell = sequelize.define<VendaInstance>("Sell", {
    venda_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    produto_id:{
        type: DataTypes.INTEGER,
        allowNull: true,    
    },
    venda_data: {
        type: DataTypes.STRING,
        allowNull: false
    },
    venda_qtt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    venda_comprador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    venda_forma_pagamento:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "vendas",
    timestamps: false
})

Sell.belongsTo(Product, {
    constraints: true,
    foreignKey: "produto_id"

})
