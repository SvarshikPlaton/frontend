import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./shared/styles/index.scss";
import { App } from "./App";
import { TalentsProvider } from "./context/TalentsContext";
import { UserProvider } from "./context/UserContext/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<UserProvider>
		<TalentsProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</TalentsProvider>
	</UserProvider>
	// </React.StrictMode>
);
