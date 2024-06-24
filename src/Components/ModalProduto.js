import React from "react";
import styles from "./ModalProduto.module.css";
import propTypes from "prop-types";
import ModalSetProduto from "./ModalSetProduto";
import ModalSetVenda from "./ModalSetVenda";
import { UseContext } from "../Context/UseContext";


const ModalProduto = ({setModalIsOpen, modalIsOpen}) => {
	const contexto = React.useContext(UseContext);
	function handleCloseModal(event){
		if(event.target.className.includes("background") || event.target.className.includes("close")){
			setModalIsOpen(false);
			contexto.setUpdateItem(null);
		}
	}
	const url = window.location.href;
	console.log(url);

	
	return (
		<div onClick={handleCloseModal} className={modalIsOpen == true ? `${styles.background} ${styles.visible}`: styles.background}>
			<div className={styles.modal_container}>

				{url == "https://estoque360.netlify.app/" ? <ModalSetProduto setModalIsOpen={setModalIsOpen}/> : <ModalSetVenda setModalIsOpen={setModalIsOpen}/>}
			</div>
		</div>
	);
};

export default ModalProduto;

ModalProduto.propTypes = {
	setModalIsOpen: propTypes.shape()
}.isRequired;