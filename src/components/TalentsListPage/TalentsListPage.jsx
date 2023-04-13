import React, { useContext, useEffect } from "react";
import { TalentsList } from "./components/TalentsList";
import { Pagination } from "./components/Pagination/Pagination";
import { TalentsContext } from "../../context/TalentsContext";
import { useSearchParams } from "react-router-dom";
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
        </>
    );
}
