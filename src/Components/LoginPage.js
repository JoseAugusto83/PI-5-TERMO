import React from "react";
import styles from "./LoginPage.module.css";
import LogoLogin from "../img/Logo.png";
import InputText from "./InputText";
import { Link, useNavigate } from "react-router-dom";
import { validaInput } from "../utils/validaInput";

const LoginPage = () => {

	const [email, setEmail] = React.useState([]);
	const [senha, setSenha] = React.useState([]);
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	async function handleSubmit(){
		setError(true);
	

		if(email && senha){
			let contador = 0;
			const validacoes = [validaInput("email", email), validaInput("password", senha)];
			validacoes.map((validacao) => {
				if(!validacao){
					contador += 1;
				}
			});

			if(contador == 2){
				console.log(contador);

				
				setTimeout(() => {
					navigate("/");
				}, 1500);
				
			}

		}
	}


	return (
		<div className={styles.container}>
			<div className={styles.container_login}>
				<img src={LogoLogin} className={styles.logo}/>
				<div className={styles.input_container}>
					<InputText state={email} placeholder="E-mail" setState={setEmail} idInput="email" error={error} typeInput="email"/>
				</div>
				<div className={styles.input_container}>
					<InputText  state={senha} placeholder="Senha" setState={setSenha} idInput="password" error={error}
						typeInput="password"/>
				</div>
				<div className={styles.navigation}>
					<Link to="/criar-conta">Criar conta</Link>
					<button className={styles.button} onClick={handleSubmit}>Avançar</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;