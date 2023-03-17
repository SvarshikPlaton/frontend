import styles from "./Header.module.scss";

const Header = (props) => {
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Search Talents", link: "/talents" },
    { label: "Talents Alerts", link: "/proofs" },
  ];

  return (
    <header className={styles.header}>
      <div className="__container">
        <div className={styles.logo}>
          Proved<span>Code</span>
        </div>
        <nav className={styles.nav}>
          {menuItems.map(({ label, link }, index) => (
            <a href={link} key={index}>
              {label}
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
};

export default Header;
