import "./Header.scss";

const Header = (props) => {
  const menuBtns = [
    { name: "Home", label: "Home" },
    { name: "searchTalents", label: "Search Talents" },
    { name: "talentsAlerts", label: "Talents Alerts" },
    { name: "employers", label: "Employers" },
    { name: "careerAdvice", label: "Career Advice" },
  ];

  const buttons = menuBtns.map(({ name, label }) => {
    return (
      <li>
        <button type="button" key={name}>
          {label}
        </button>
      </li>
    );
  });
  return (
    <div className="header">
      <h1 className="logo">Proved</h1>
      <div id="menu">
        <ul>{buttons}</ul>
      </div>
      <button className="login">Login</button>
      <button className="register">Register</button>
    </div>
  );
};

export default Header;
