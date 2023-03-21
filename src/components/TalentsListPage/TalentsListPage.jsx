import React from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "../TalentsListPage/SearchPanel/SearchPanel";
import { Filter } from "./Filter";
import { TalentsList } from "./TalentsList/TalentsList";
export function TalentsListPage() {
    return (
        <Layout>
            <SearchPanel />
            <Filter />
            <TalentsList />
        </Layout>
    );
}
