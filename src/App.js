import "./App.css";
import React from "react";
import Inventario from "./Components/Inventario";
import {BrowserRouter, Routes , Route} from "react-router-dom";
import {GlobalStorage} from "./Context/UseContext";
import LoginPage from "./Components/LoginPage";
import CreateAccontPage from "./Components/CreateAccontPage";

function App() {
	return (
		<GlobalStorage>
			<BrowserRouter>			
				<Routes>
					<Route path="/" element={<Inventario requisicao={"https://pi-5-termo-production.up.railway.app/produtos"}/>}/>
					<Route path="/vendidos" element={<Inventario requisicao={"https://pi-5-termo-production.up.railway.app/vendidos"}/>}/>
					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/criar-conta" element={<CreateAccontPage/>}/>
				</Routes>
			</BrowserRouter>
		</GlobalStorage>

	);
}

export default App;
