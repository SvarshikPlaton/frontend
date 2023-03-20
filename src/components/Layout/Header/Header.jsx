import { useMemo } from "react";
import styles from "./Header.module.scss";

export function Header() {
	const menuItems = useMemo(
		() => [
			{ title: "Home", link: "/" },
			{ title: "Talents", link: "/talents" },
			{ title: " Proofs", link: "/proofs" },
		],
		[]
	);

	return (
		<header className={styles.header}>
			<div className="__container">
				<div className={styles.logo}>
					Proved<span>Code</span>
				</div>
				<nav className={styles.nav}>
					{menuItems.map(({ title, link }, index) => (
						<a href={link} key={index}>
							{title}
						</a>
					))}
				</nav>
				<div className={styles.btns}>
					<button className={styles.btn}>Login</button>
					<button className={styles.btn}>Register</button>
				</div>
			</div>
		</header>
	);
}
