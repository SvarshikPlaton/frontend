import styles from "./SearchPanel.module.scss";

export function SearchPanel() {
    return (
        <div className={styles["search-panel"]}>
            <input
                type="text"
                className={styles["search-input1"]}
                placeholder="Keywords/job title"
            />
            <input
                type="text"
                className={styles["search-input"]}
                placeholder="Location"
            />
            <input
                type="text"
                className={styles["search-input"]}
                placeholder="Distance"
            />

            <button className={styles.btn}>Search</button>
        </div>
    );
}
