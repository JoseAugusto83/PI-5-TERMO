import React from "react";
import styles from "./CreateAccontPage.module.css";
import InputText from "./InputText";
import LogoLogin from "../img/Logo.png";
import { validaInput } from "../utils/validaInput";
import { Link } from "react-router-dom";

const CreateAccontPage = () => {

	const [name, setName] = React.useState();
	const [email, setEmail] = React.useState([]);
	const [senha, setSenha] = React.useState([]);
	const [confirmaSenha, setConfirmaSenha] = React.useState();
	const [error, setError] = React.useState(null);

	async function handleSubmit(){
		setError(true);
	

		if(email && senha){
			let contador = 0;
			const validacoes = [validaInput("email", email), validaInput("password", senha), validaInput("confirmasenha", [senha, confirmaSenha])];
			validacoes.map((validacao) => {
				if(!validacao){
					contador += 1;
				}
			});

			if(contador == 2){
				console.log(contador);
			}

		}
	}


	return (
		<div className={styles.container}>
			<div className={styles.container_login}>
				<img src={LogoLogin} className={styles.logo}/>
				<div className={styles.input_container}>
					<InputText state={name} placeholder="Nome" setState={setName} idInput="name" error={error} typeInput="text"/>
				</div>
				<div className={styles.input_container}>
					<InputText state={email} placeholder="E-mail" setState={setEmail} idInput="email" error={error} typeInput="email"/>
				</div>
				<div className={styles.input_container}>
					<InputText  state={senha} placeholder="Senha" setState={setSenha} idInput="password" error={error}
						typeInput="password"/>
				</div>
				<div className={styles.input_container}>
					<InputText  state={confirmaSenha} placeholder="Confirmar senha" setState={setConfirmaSenha} idInput="password" error={error}
						typeInput="password"/>
				</div>
				<div className={styles.navigation}>
					<Link to="/login">Login</Link>
					<button className={styles.button} onClick={handleSubmit}>Cadastrar</button>
				</div>
			</div>
		</div>
	);
	
};

export default CreateAccontPage;