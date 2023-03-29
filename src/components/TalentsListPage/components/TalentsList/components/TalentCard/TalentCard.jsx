import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./TalentCard.module.scss";
import placeholder from './images/image-placeholder.svg';

export function TalentCard({ talent }) {
	const location = useLocation();
	const editPath = useCallback(() => {
		return location.pathname + location.search + "#auth";
	}, [location]);

	const path = editPath();

	return (
		// <Link to={`/talents/${talent.id}`} className={s.talent_card}>
		<Link to={path} className={s.talent_card}>
			<div className={s.photo}>
				<img src={talent.image ? talent.image : placeholder} alt="talent_photo" />
			</div>
			<div className={s.info}>
				<div className={s.name}>{talent.firstname + " " + talent.lastname}</div>
				<div className={s.specialization}>{talent.specialization}</div>
				<div className={s.skills}>
					{talent.skills.map((skill, index) => (
						<div className={s.skill} key={index}>
							{skill}
						</div>
					))}
				</div>
			</div>
		</Link>
	);
}
