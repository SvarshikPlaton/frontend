import { useCallback, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./TalentCard.module.scss";
import placeholder from "./images/image-placeholder.svg";
import { UserContext } from "../../../../../../context/UserContext/UserContext";
import { TalentsContext } from "../../../../../../context/TalentsContext";

export function TalentCard({ talent }) {
	const { auth } = useContext(UserContext);

	return (
		<Link
			to={
				auth
					? `/talents/${talent.id}`
					: `/talents#auth`
			}
			state={{redirect: `/talents/${talent.id}`}}
			className={s.talent_card}>
			{/* <Link to={path} className={s.talent_card}> */}
			<div className={s.photo}>
				<img
					src={talent.image ? talent.image : placeholder}
					alt="talent_photo"
				/>
			</div>
			<div className={s.info}>
				<div className={s.name}>{talent.first_name + " " + talent.last_name}</div>
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
