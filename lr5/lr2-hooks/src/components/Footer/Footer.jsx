import "../Navbar/navbar.css";

function Footer() {
  const name = "Oksana";
  const lastname = "Shumakova";
  return (
    <>
      <div className="footer">
        <nav className="navbar">
          <h1>2024 Created by {lastname + " " + name}</h1>
        </nav>
      </div>
    </>
  );
}

export default Footer;
