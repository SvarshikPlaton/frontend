import React from "react";
import { useParams } from "react-router";
import { Layout } from "../Layout";
import s from "./TalentPage.module.scss";

export function TalentPage() {
	const params = useParams();

	return (
		<Layout>
			<h1>{params?.id}</h1>
		</Layout>
	);
}
