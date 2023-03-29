import React from "react";
import { Button } from "../../../../../../shared/components";
import s from "./PageNumber.module.scss";

export function PageNumber({ index, page, size, pageNumbers, number, handlerPage }) {
	
	return (
		<>
			{index === pageNumbers.length - 1 && page < pageNumbers.length - 3 && (
				<div>...</div>
			)}
			<Button	
				className={`${s.page} ${page === index ? s.selected : ""}`}
				key={number}
				onClick={() => handlerPage(index)}>
				{number}
			</Button>
			{index === 0 && page > 2 && <div>...</div>}
		</>
	);
}
