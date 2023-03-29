import React from "react";
import { Button, Input } from "../../../../../shared/components";
import s from "./Login.module.scss";

const advices = [
	{
		title: "Searching and connecting",
		text: "You can search for the talents all around the globe and connect with them easily",
	},
	{
		title: "Upload any quantity of proofs",
		text: "It is allowed for you to upload any quantity of proofs you want.",
	},
	{
		title: "Job alerts",
		text: " You will be immediately recognised, when employers will want to make connection.",
	},
	{
		title: "Free CV review",
		text: "It is allowed to have the CV review for free!",
	},
];

export function Login() {
	return (
		<>
			<form action="#" className={s.form}>
				<Input type="text" className={s.input}></Input>
				<Input type="text" className={s.input}></Input>
				<Button type="submit" className={s.btn}>
					Login
				</Button>
			</form>
			<div className={s.info}>
				<div className={s.title}>Not Registered?</div>
				<ul className={s.advices}>
					{advices.map(({title, text}) => (
						<li key={title}>
							<h4>{title}</h4>
							<p>
								{text}
							</p>
						</li>
					))}
				</ul>
				<Button className={s.btn}>Register</Button>
			</div>
		</>
	);
}
