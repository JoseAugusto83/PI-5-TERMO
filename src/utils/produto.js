export const getProducts = async (requisicao) => {
	const produtos = await fetch(requisicao);
	const json = await produtos.json({type: "", body:[]});
	return json;
};

export const getSells = async () => {
	const vendas = await fetch("https://pi-5-termo-production.up.railway.app/vendidos");
	const json = await vendas.json();
	return json;
};
