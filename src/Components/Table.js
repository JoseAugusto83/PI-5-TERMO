import React from "react";
import propTypes from "prop-types";
import style from "./Table.module.css";
import {ReactComponent as Editar} from "../assets/editar.svg";
import {ReactComponent as Excluir} from "../assets/excluir.svg";
import { request } from "../utils/request.";
import { UseContext } from "../Context/UseContext";

const Table = ({produtos, setModal}) => {
	const contexto = React.useContext(UseContext);


	async function deleteProduct(id){
		const requesicao = await request("delete", id, "produtos");
		window.location.reload();
		console.log(requesicao);
	}

	async function deleteSell(id){
		const requesicao = await request("delete", id, "vendidos");
		window.location.reload();
		console.log(requesicao);
	}
	
	function handleUpdate(item){

		setModal(true);
		contexto.setRequestType("update");
		contexto.setUpdateItem(item);
	}
	
	if (produtos.length > 0) 
		return (
			<table className={style.table}>
				<thead>
					{produtos[0].venda_id &&
					<tr className={style.table_title}>
						<th>Venda</th>
						<th>Nome</th>
						<th>Quantidade</th>
						<th>Preço</th>
						<th>Comprador</th>
						<th>Pagamento</th>
						<th>Data</th>
						<th>Ação</th>
					</tr>
				|| 

				<tr className={style.table_title}>
					<th>Item</th>
					<th>Nome</th>
					<th>Preço</th>
					<th>Categoria</th>
					<th>Quantidade</th>
					<th>Ação</th>
				</tr>}
				</thead>
				<tbody>
					{produtos[0].venda_id && produtos.map((produto, index) => (
						<>
							<tr>
								<th >{index + 1}</th>
								<th >{produto.Product.produto_nome}</th>
								<th> {produto.venda_qtt}</th>
								<th >{produto.Product.produto_preco * produto.venda_qtt}</th>
								<th >{produto.venda_comprador}</th>
								<th >{produto.venda_forma_pagamento}</th>
								<th >{produto.venda_data}</th>
								<th><Editar style={{"cursor": "pointer"}} onClick={() => handleUpdate([produto.Product.produto_id, produto.venda_forma_pagamento, produto.Product.produto_quantidade, produto.venda_comprador, produto.venda_id, produto.venda_qtt])}/><Excluir onClick={() => deleteSell(produto.venda_id)} style={{"cursor": "pointer"}}/></th>
							
							</tr>
						</>
					)) || produtos.map((produto, index) => (
						<>
							<tr>
								<th >{index + 1}</th>
								<th >{produto.produto_nome}</th>
								<th >{produto.produto_preco}</th>
								<th >{produto.produto_categoria}</th>
								<th className={produto.produto_quantidade == 0 ? style.zerado : ""}>{produto.produto_quantidade}</th>
								<th><Editar style={{"cursor": "pointer"}} onClick={() => handleUpdate([produto.produto_nome, produto.produto_preco, produto.produto_quantidade, produto.produto_categoria, produto.produto_id])}/><Excluir onClick={() => deleteProduct(produto.produto_id)} style={{"cursor": "pointer"}}/></th>
							</tr>
						</>))
					}
				
				</tbody>
			</table>
		);
};

export default Table;

Table.propTypes = {
	products: propTypes.shape({})
}.isRequired;