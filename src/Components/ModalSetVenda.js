import React from "react";
import { getProducts } from "../utils/produto";
import styles from "./ModalSetVenda.module.css";
import propTypes from "prop-types";
import ButtonCancelar from "./ButtonCancelar";
import ButtonIncluir from "./ButtonIncluir";
import InputText from "./InputText";
import { UseContext } from "../Context/UseContext";
import { request } from "../utils/request.";

const ModalSetVenda = ({ setModalIsOpen }) => {
	const [error, setError] = React.useState(false);
	const contexto = React.useContext(UseContext);
	const [produtos, setProdutos] = React.useState([]);
	const [id, setId] = React.useState(null);
	const [formaPagamento, setFormaPagamento] = React.useState("Pix");
	const [quantidade, setQuantidade] = React.useState("");
	const [comprador, setComprador] = React.useState("");
	const [selectQuantidade, setSelectQuantidade] = React.useState([]);

	React.useEffect(() => {
		if (contexto.updateItem !== null) {
			let update = contexto.updateItem.map((x) => x);
			setId(update[0]);
			setFormaPagamento(update[1]);
			setComprador(update[3]);
			setQuantidade(update[5]);
		}
	}, [contexto.updateItem]);

	React.useEffect(() => {
		async function get() {
			const requesicao = await getProducts("https://pi-5-termo-production.up.railway.app/produtos");
			setProdutos(requesicao);
		}
		get();
	}, [setModalIsOpen]);

	function quantidadeFunction() {
		if (id) {
			const produto = produtos.find((produto) => produto.produto_id == id);
			let quantidade = [];
			if (produto) {
				for (var i = 1; i <= produto.produto_quantidade; i++) {
					quantidade.push(i);
				}
				setSelectQuantidade(quantidade);
			}
		}
	}

	async function handlePost(event) {
		event.preventDefault();
		if (contexto.updateItem == null) {

			try {
				const req = await fetch("https://pi-5-termo-production.up.railway.app/vendidos", {
					method: "POST",
					body: JSON.stringify({
						produto_id: id,
						venda_qtt: quantidade,
						venda_comprador: comprador,
						venda_forma_pagamento: formaPagamento
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await req.json();
				if (req.ok) {
					console.log("Venda registrada com sucesso:", data);
					setModalIsOpen(false);
					location.reload();
				} else {
					throw new Error(data.message || "Erro ao registrar a venda");
				}
			} catch (error) {
				console.error("Erro ao registrar a venda:", error);
				setError(true);
			}
		}
		else if(comprador.length > 0 && quantidade > 0 && id !== null && contexto.updateItem !== null){
			const insert = await request(contexto.requestType, [id, quantidade, comprador, formaPagamento, contexto.updateItem[4]], "vendidos");
			contexto.setRequestType("");
			contexto.setUpdateItem(null);
			console.log("update not null");
			console.log(insert);
			location.reload();
		}
	}

	return (
		<>
			<div className={styles.title_container}>
				<h2>Adicionar Produto</h2>
				<p onClick={() => setModalIsOpen(false)} className={styles.close}>X</p>
			</div>
			<form onSubmit={handlePost}>
				<label>Nome</label>
				<select
					name="name"
					onChange={({ target }) => setId(target.value)}
					onClick={quantidadeFunction}
					className={styles.input}
				>
					<option value="" data-default disabled selected>
						Selecione um item
					</option>
					{produtos.map((produto) => (
						<option key={produto.produto_id} value={produto.produto_id}>
							{produto.produto_nome}
						</option>
					))}
				</select>
				<div className={styles.input_small}>
					<div>
						<label htmlFor="pagamento">Forma de pagamento</label>
						<select
							name="pagamento"
							onChange={({ target }) => setFormaPagamento(target.value)}
							className={styles.input}
						>
							<option value="Pix">Pix</option>
							<option value="Cartão">Cartão</option>
							<option value="Boleto">Boleto</option>
						</select>
					</div>
					<div>
						<label>Quantidade</label>
						<select
							name="quantidade"
							onChange={({ target }) => setQuantidade(target.value)}
							onClick={quantidadeFunction}
							className={styles.input}
						>
							{selectQuantidade.map((qtt) => (
								<option key={qtt} value={qtt}>
									{qtt}
								</option>
							))}
						</select>
					</div>
				</div>
				<InputText
					state={comprador}
					placeholder="Renato"
					setState={setComprador}
					label="Comprador"
					error={error}
					idInput="comprador"
					typeInput="text"
				/>
				<div className={styles.button_container}>
					<ButtonCancelar closeModal={setModalIsOpen} />
					<ButtonIncluir />
				</div>
			</form>
		</>
	);
};

ModalSetVenda.propTypes = {
	setModalIsOpen: propTypes.func.isRequired
};

export default ModalSetVenda;
