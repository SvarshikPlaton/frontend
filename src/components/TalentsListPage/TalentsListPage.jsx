import React, { useContext, useEffect } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { Filters } from "./components/Filters";
import { TalentsList } from "./components/TalentsList";
import { Title } from "./components/Title";
import styles from "./TalentsListPage.module.scss";
import { Pagination } from "./components/Pagination/Pagination";
import { TalentsContext } from "../../context/TalentsContext";
import { useSearchParams } from "react-router-dom";
import { ProofBlock } from "../TalentPage/components/ProofBlock/ProofBlock";
import { ListProofs } from "../TalentPage/components/ListProofs/ListProofs";

export function TalentsListPage() {
    const { talents, page, setPage, size, setSize } =
        useContext(TalentsContext);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has("page") && searchParams.has("size")) {
            setPage(Number(searchParams.get("page")));
            setSize(Number(searchParams.get("size")));
        }
    }, [searchParams, setPage, setSize]);
    useEffect(() => {
        if (!searchParams.has("page") || !searchParams.has("size")) {
            let sParams = {};
            sParams.page = page;
            sParams.size = size;
            setSearchParams(sParams, { replace: true });
        }
    }, [page, searchParams, setSearchParams, size]);

    return (
        <>
            <TalentsList talents={talents} />
            <Pagination />
            <ListProofs />
        </>
    );
}
