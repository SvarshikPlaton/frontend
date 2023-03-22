import styles from "./SearchPanel.module.scss";

const inputNames = ["Job title", "Location", "Distance"];

export function SearchPanel() {
    return (
        <div className={styles["search-panel"]}>
            {inputNames.map((name) => (
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
