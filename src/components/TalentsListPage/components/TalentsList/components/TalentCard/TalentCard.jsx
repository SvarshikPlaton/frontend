import s from "./TalentCard.module.scss";

export function TalentCard({ talent }) {
	return (
		<a href="/talents" className={s.talent_card}>
			<div className={s.photo}>
				<img src={talent.image} alt="talent_photo" />
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
		</a>
	);
}
