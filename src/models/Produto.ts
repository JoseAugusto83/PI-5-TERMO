import sequelize from "../instances/mysql";
import {Model, DataTypes} from "sequelize";

export interface ProdutoInstance extends Model {
    produto_id: number,
    produto_nome: string,
    produto_categoria: string,
    produto_preco: number,
    produto_quantidade: number,
    user_id: number
}   

export const Product = sequelize.define<ProdutoInstance>("Product", {
    produto_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    produto_nome: {
        type: DataTypes.STRING
    },
    produto_categoria: {
        type: DataTypes.STRING
    },
    produto_preco: {
        type: DataTypes.INTEGER
    },
    produto_quantidade: {
        type: DataTypes.DECIMAL(10, 2)
    },
    user_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "produtos",
    timestamps: false
})