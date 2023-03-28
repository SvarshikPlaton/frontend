import { Routes, Route, Navigate } from "react-router-dom";
import { TalentsListPage } from "../components/TalentsListPage";
import "./App.scss";

export function App() {
    return(
        <Routes>
            <Route path="/" element={<TalentsListPage />}/>
            <Route path="/talents" element={<TalentsListPage />}/>
            <Route path="/proofs" element={<TalentsListPage />}/>
            {/* <Route path="/talents/:id" element={<TalentPage />}/> */}
            {/* <Route path="/*" element={<NotFoundPage />}/> */}
            <Route path="*" element={<Navigate to="/talents" />}/>
        </Routes>
    );
}
