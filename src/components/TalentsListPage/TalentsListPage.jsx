import React from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "./SearchPanel";
import { Filter } from "./Filter";
import { TalentsList } from "./TalentsList/TalentsList";
import styles from "./TalentsList/TalentsList.module.scss";
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
