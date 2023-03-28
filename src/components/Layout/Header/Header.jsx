import { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import { Button } from "../../../shared/components";

export function Header() {
    const menuItems = useMemo(
        () => [
            { title: "Home", link: "/" },
            { title: "Talents", link: "/talents" },
            { title: "Proofs", link: "/proofs" },
        ],
        []
    );

    return (
        <header className={styles.header}>
            <div className="__container">
                <Link to="/" className={styles.logo}>
                    Proved<span>Code</span>
                </Link>
                <nav className={styles.nav}>
                    {menuItems.map(({ title, link }, index) => (
                        <NavLink
                            to={link}
                            key={index}
                            className={({ isActive }) => {
                                return isActive ? styles.active : "";
                            }}
                        >
                            {title}
                        </NavLink>
                    ))}
                </nav>
                <div className={styles.btns}>
                    <Button className={styles.btn}>Login</Button>
                    <Button className={styles.btn}>Register</Button>
                </div>
            </div>
        </header>
    );
}
