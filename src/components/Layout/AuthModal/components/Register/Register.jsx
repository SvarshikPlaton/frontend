import React from "react";
import { Button, Input } from "../../../../../shared/components";
import s from "./Register.module.scss";

const advices = [
	{
		title: "Fill out your account.",
		text: "Upload the best avatar, you’ve ever had and write bio",
	},
	{
		title: "Time to let the world know you",
		text: "Write your proofs — text with links that describes your activity. It’s better to follow 1 rule: 1 activity - 1 proof ;)",
	},
	{
		title: "Keep improving yourself",
		text: "If you need time to think about your proof for editing sometime - save it to drafts and return in any convenient time.",
	},
	{
		title: "Share your goals",
		text: "When you are confident in writing the proof - press “Publish” button to upload it on your profile.",
	},
];

export function Register() {
	return (
		<>
			<form action="#" className={s.form}>
				<Input type="text" className={s.input}></Input>
				<Input type="text" className={s.input}></Input>
				<Input type="text" className={s.input}></Input>
				<Input type="text" className={s.input}></Input>
				<Button type="submit" className={s.btn}>
					Register
				</Button>
			</form>
			<div className={s.info}>
				<div className={s.title}>Already have an account?</div>
				<ul className={s.advices}>
					{advices.map(({ title, text }) => (
						<li key={title}>
							<h4>{title}</h4>
							<p>{text}</p>
						</li>
					))}
				</ul>
				<Button className={s.btn}>Login</Button>
			</div>
		</>
	);
}
