import styles from "./Filter.module.scss";

export function Filter() {
    return (
        <div className={styles.filters}>
            <div className={styles["page_title"]}>
                <span> Talents</span> Found
            </div>
            <div className={styles.title}>Filter</div>
            <div className="items"></div>
        </div>
    );
}
