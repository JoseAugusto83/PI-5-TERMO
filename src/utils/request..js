

export const request = async (type, body, page) =>{
	if(type === "" && page == "produtos"){
		const req = await fetch("https://pi-5-termo-production.up.railway.app/produtos", {
			method: "POST",
			body: JSON.stringify({
				name: body[0],
				category: body[1],
				price: body[2].replace(",","."),
				qtt: body[3],
				user_id: "9"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
        
		const response = await req.json();
		return response;
	}

	else if(type === "" && page == "vendidos"){
		const req = await fetch("https://pi-5-termo-production.up.railway.app/vendidos", {
			method: "POST",
			body: JSON.stringify({
				produto_id: body[0],
				venda_qtt: body[1],
				venda_comprador: body[2],
				venda_forma_pagamento: body[3]
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
        
		const response = await req.json();
		return response;
	}

	else if(type == "delete"){
		const req = await fetch(`https://pi-5-termo-production.up.railway.app/${page}/${body}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});
        
		const response = await req.json();
		return response;
	}

	else if(type === "update" && page == "produtos"){
		const req = await fetch(`https://pi-5-termo-production.up.railway.app/produtos/${body[4]}`, {
			method: "PUT",
			body: JSON.stringify({
				name: body[0],
				category: body[1],
				price: body[2].replace(",","."),
				qtt: body[3],
	
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
        
		const response = await req.json();
		return response;
	}

	else if(type === "update" && page == "vendidos"){
		const req = await fetch(`https://pi-5-termo-production.up.railway.app/vendidos/${body[4]}`, {
			method: "PUT",

			body: JSON.stringify({
				id: body[0],
				qtt: body[1],
				comprador: body[2],
				pagamento: body[3],
	
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
        
		const response = await req.json();
		return response;
	}


};

	