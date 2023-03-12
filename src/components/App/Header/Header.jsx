import styles from "./Header.module.scss";

const Header = (props) => {
  const menuBtns = [
    { name: "Home", label: "Home" },
    { name: "searchTalents", label: "Search Talents" },
    { name: "talentsAlerts", label: "Talents Alerts" },
    { name: "employers", label: "Employers" },
    { name: "careerAdvice", label: "Career Advice" },
  ];

  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Proved</h1>
      <div className={styles.menu}>
        <ul>
          {
            menuBtns.map(({name, label}, index)=>(
              <li key={index}>
                <button type="button" key={name}>
                  {label}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
      <button className={styles.login}>Login</button>
      <button className={styles.register}>Register</button>
    </div>
  );
};

export default Header;
