import React, { useContext, useEffect, useMemo, useState } from "react";
import { PageNumber } from "./components/PageNumber";
import s from "./Pagination.module.scss";
import { Link } from "react-router-dom";
import { TalentsContext } from "../../../../context/TalentsContext";
import { Button } from "../../../../shared/components";
import { Link } from "react-router-dom";


export function Pagination() {
	const { countOfPages, page, size, setPage } = useContext(TalentsContext);


	const pageNumbers = useMemo(() => {
		let arr = [];
		for (let i = 0; i < countOfPages; i++) {
			arr.push(i + 1);
		}
		return arr;
	}, [countOfPages]);

	const handlerPage = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			{countOfPages > 1 ? (
				<div className={s.pagination}>

					<Button						
						className={s.left}
						onClick={()=>handlerPage(page-1)}></Button>

					<div className={s.pages}>
						{pageNumbers.map((number, index) => {
							if (index >= page - 1 && index <= page + 1) {
								// three numbers are always displayed
								return (
									<PageNumber
										key={index}
										index={index}
										page={page}
										size={size}
										pageNumbers={pageNumbers}
										number={number}
										handlerPage={handlerPage}
									/>
								);
							}
							if (page === 0 || page === pageNumbers.length - 1) {
								// three numbers are always displayed, even if it`s start or end position
								if (index >= page - 2 && index <= page + 2) {
									return (
										<PageNumber
											key={index}
											index={index}
											page={page}
											size={size}
											pageNumbers={pageNumbers}
											number={number}
											handlerPage={handlerPage}
										/>
									);
								}
							}
							if (index === 0 && page >= 2) {
								// first page are always displayed if selected page index is equal or more than 3
								return (
									<PageNumber
										key={index}
										index={index}
										page={page}
										size={size}
										pageNumbers={pageNumbers}
										number={number}
										handlerPage={handlerPage}
									/>
								);
							}
							if (
								index === pageNumbers.length - 1 &&
								page <= pageNumbers.length - 3
							) {
								// last page are always displayed if selected page index is equal or less than 3
								return (
									<PageNumber
										key={index}
										index={index}
										page={page}
										size={size}
										pageNumbers={pageNumbers}
										number={number}
										handlerPage={handlerPage}
									/>
								);
							}
							return "";
						})}
					</div>
					<Button						
						className={s.right}
						onClick={()=>handlerPage(page+1)}></Button>

				</div>
			) : (
				""
			)}
		</>
	);
}
