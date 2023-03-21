import styles from "../Filter/Filter.module.scss";

export function Filter() {
    return (
        <div className={styles.filters}>
            <div className={styles.caption}>
                <span> Talents</span> Found
            </div>
            <div className={styles.option}>Filter</div>
            <div className="items"></div>
        </div>
    );
}
