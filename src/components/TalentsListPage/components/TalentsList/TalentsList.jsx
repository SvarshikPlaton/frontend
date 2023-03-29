import s from "./TalentsList.module.scss";
import { TalentCard } from "./components/TalentCard";
import { useContext } from "react";
import { TalentsContext } from "../../../../context/TalentsContext";


export function TalentsList() {
	const { talents } = useContext(TalentsContext);
	return (
		<div className={s.talents_list}>
			{talents.map((talent) => (
				<TalentCard key={talent.id} talent={talent} />
			))}
		</div>
	);
}
