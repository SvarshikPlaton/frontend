import styles from "./TalentsList.module.scss";
import { TalentCard } from "./TalentCard/TalentCard";
import talents from "./shared/data/talents.json";

export function TalentsList() {
    return (
        <div className={styles["talents-lists"]}>
            {talents.map(
                ({
                    id,
                    image,
                    firstname,
                    lastname,
                    skills,
                    specialization,
                }) => {
                    return (
                        <TalentCard
                            key={id}
                            image={image}
                            firstname={firstname}
                            lastname={lastname}
                            skills={skills}
                            specialization={specialization}
                        />
                    );
                }
            )}
        </div>
    );
}
