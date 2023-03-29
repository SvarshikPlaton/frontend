import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { TalentPage } from "../components/TalentPage";
import { TalentsListPage } from "../components/TalentsListPage";
import "./App.scss";

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Navigate to="/talents" replace={true} />} />
				<Route path="talents" element={<TalentsListPage />} />
				<Route
					path="proofs"
					element={<Navigate to="/talents" replace={true} />}
				/>
				<Route path="talents/:id" element={<TalentPage />} />
				<Route path="*" element={<Navigate to="/talents" replace={true} />} />
			</Route>
		</Routes>
	);
}
