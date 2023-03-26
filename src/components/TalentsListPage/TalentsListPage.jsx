import React, { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "./components/SearchPanel";
import { Filters } from "./components/Filters";
import { TalentsList } from "./components/TalentsList";
import { Title } from "./components/Title";
import styles from "./TalentsListPage.module.scss";
import data from './shared/data/response.json';


export function TalentsListPage() {
	const [talents, setTalents] = useState([]);

	useEffect(() => {
		setTalents(data.content);
	}, []);

	return (
		<Layout>
			{/* <div className={styles.grid_container}>
				<SearchPanel />
				<Title />
				<Filters talents={talents} />
				<TalentsList talents={talents} />
			</div> */}
				<TalentsList talents={talents} /> {/*temporarily*/}
		</Layout>
	);
}
