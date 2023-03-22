import React from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "./SearchPanel";
import { Filter } from "./Filter";
import { TalentsList } from "./TalentsList";
import styles from "./TalentsListPage.module.scss";
export function TalentsListPage() {
    return (
        <Layout>
            <SearchPanel />

            <div className={styles["grid-container"]}>
                <div className={styles["grid-filter"]}>
                    <div className={styles["page_title"]}>
                        <span> Talents</span> Found
                    </div>
                    <Filter />
                </div>

                <TalentsList />
            </div>
        </Layout>
    );
}
