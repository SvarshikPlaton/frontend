import React from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "./SearchPanel";
import { Filter } from "./Filter";
import { TalentsList } from "./TalentsList";
import styles from "./TalentsListPage.scss";
export function TalentsListPage() {
    return (
        <Layout>
            <div classname={styles["grid-container"]}>
                <SearchPanel />
                <Filter />
                <TalentsList />
            </div>
        </Layout>
    );
}
