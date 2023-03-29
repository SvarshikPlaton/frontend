import React, { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { SearchPanel } from "./components/SearchPanel";
import { Filters } from "./components/Filters";
import { TalentsList } from "./components/TalentsList";
import { Title } from "./components/Title";
import styles from "./TalentsListPage.module.scss";
import data from "./shared/data/response.json";
import { Pagination } from "./components/Pagination/Pagination";
import { TalentsService } from "../../services/api-services";
import { useSearchParams } from "react-router-dom";

export function TalentsListPage() {
	const [talents, setTalents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);
	const [countOfPages, setCountOfPages] = useState(0);

	const { getTalents, getCountOfPages } = TalentsService;
	const [searchParams, setSearchParams] = useSearchParams();


	useEffect(() => {
		if (searchParams.has("page")) {
			setPage(Number(searchParams.get("page")));
		} else {
			searchParams.set("page", page);
		}
		if (searchParams.has("size")) {
			setSize(Number(searchParams.get("size")));
		} else {
			searchParams.set("size", size);
		}
		setSearchParams(searchParams, { replace: true });
	}, [page, searchParams, setSearchParams, size])

	useEffect(() => {
		setIsLoading(true);
		try {
			getTalents(page, size).then((talents) => {
				setTalents(talents);
				setIsLoading(false);
			})
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			setTalents(data.content);
		}
	}, [getTalents, page, size]);
	
	useEffect(() => {
		try {
			getCountOfPages()
				.then((count) => {
					setCountOfPages(count);
				});
		} catch (error) {
			console.log(error);
		}
	}, [getCountOfPages]);

	return (
		<Layout>
			{/* <div className={styles.grid_container}>
				<SearchPanel />
				<Title />
				<Filters talents={talents} />
				<TalentsList talents={talents} />
			</div> */}
			<TalentsList talents={talents} /> {/*temporarily*/}
			<Pagination countOfPages={countOfPages} page={page} setPage={setPage} size={size} />
		</Layout>
	);
}
