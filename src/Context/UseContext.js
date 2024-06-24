import React from "react";
import {propTypes} from "prop-types";

export const UseContext = React.createContext();

export const GlobalStorage = ({ children }) =>{

	const [requestType, setRequestType] = React.useState("");

	const [updateItem, setUpdateItem] = React.useState(null);

	return (
		<UseContext.Provider value={{requestType, setRequestType, updateItem, setUpdateItem}}>
			{children}
		</UseContext.Provider>
	);
};

GlobalStorage.propTypes = {
	children: propTypes 
}.isRequired;