import React from "react";
import { SearchPanel } from "./components/SearchPanel";
import { Filters } from "./components/Filters";
import { TalentsList } from "./components/TalentsList";
import { Title } from "./components/Title";
import styles from "./TalentsListPage.module.scss";
import { Pagination } from "./components/Pagination/Pagination";


export function TalentsListPage() {

	return (
		<>
			{/* <div className={styles.grid_container}>
				<SearchPanel />
				<Title />
				<Filters talents={talents} />
				<TalentsList talents={talents} />
			</div> */}
			<TalentsList /> {/*temporarily*/}
			<Pagination />
		</>
	);
}
