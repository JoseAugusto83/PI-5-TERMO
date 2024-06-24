export const validaInput = (type, valor) =>{
	if(!valor || valor == ""){
		return "Digite um valor";
	}else if(type == "number"){
		const validar = new RegExp("^[,.1234567890]+$").test(valor);
		if(validar == false)
			return "Digite apenas números";
		return null;
	}
	else if(type == "email"){
		const validarEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(validarEmail.test(valor) == false){
			return("Digite um E-mail válido!");
		}
		else{
			return null;
		}	
	}

	else if(type == "password"){
		if(valor.length < 7){
			return "Digite uma senha com pelo menos 7 caracteres";
		}
	}
	else{
		return null;
	}  
};