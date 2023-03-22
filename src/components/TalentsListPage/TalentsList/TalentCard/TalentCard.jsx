import styles from "./TalentCard.module.scss";

export function TalentCard({
    id,
    image,
    firstname,
    lastname,
    skills,
    specialization,
}) {
    return (
        <div className={styles["talent-card"]}>
            <img
                className={styles["talent-photo"]}
                src="https://image.winudf.com/v2/image1/Y29tLmJsYWNrcGVhcmx4LmF2dGFybWFrZXJfc2NyZWVuXzBfMTU1MjI0MTk3M18wODY/screen-0.jpg?h=500&fakeurl=1&type=.jpg"
                alt="Avatar"
            />
            <div className={styles["info"]}>
                <div className={styles["name"]}>
                    {firstname} {lastname}
                    <div className={styles["specialization"]}>
                        {specialization}
                        <div className={styles["skills"]}>{skills}</div>
                    </div>
                    <button className={styles["btn"]}>Apply</button>
                </div>
            </div>
        </div>
    );
}
