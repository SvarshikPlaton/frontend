import React, { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "./components/SearchPanel";
import { Filters } from "./components/Filters";
import { TalentsList } from "./components/TalentsList";
import { Title } from "./components/Title";
import styles from "./TalentsListPage.module.scss";
import data from "./shared/data/response.json";
import { Pagination } from "./components/Pagination/Pagination";

const BASE_URL = "http://18.194.159.42:8081/api";

export function TalentsListPage() {
	const [talents, setTalents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);
	const [countOfPages, setCountOfPages] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		try {
			fetch(`${BASE_URL}/talents?page=${page}&size=${size}`).then((response) => {
				return response.json();
			}).then((data) => {
				setTalents(data.content);
				setIsLoading(false);
			})
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			setTalents(data.content);
		}
	}, [page, size]);
	useEffect(() => {
		try {
			fetch(`${BASE_URL}/talents`)
				.then((response) => {
					return response.json();
				})
				.then((res) => {
					console.log(res.total_pages);
					setCountOfPages(res.total_pages);
				});
		} catch (error) {
			console.log(error);
		}
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
			<Pagination countOfPages={countOfPages} page={page} setPage={setPage} />
		</Layout>
	);
}
