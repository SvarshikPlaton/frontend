import { useMemo } from "react";
import styles from "./SearchPanel.module.scss";
//import st from "../../Layout/Header/Header.module.scss";
export function SearchPanel() {
    const inputNames = useMemo(
        () => [
            { name: "Job title" },
            { name: "Location" },
            { name: "Distance" },
        ],
        []
    );
    return (
        <div className={styles["search-panel"]}>
            {inputNames.map(({ name }) => (
                <input
                    type="text"
                    className={styles["search-input"]}
                    placeholder={name}
                />
            ))}
            <button className={styles.btn}>Search</button>
        </div>
    );
}
