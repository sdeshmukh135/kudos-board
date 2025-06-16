import "./Header.css";
import KudosImage from "/src/assets/kudosImage.webp";

const Header = () => {
  return (
    <header>
      <img className="Kudos-Image" src={KudosImage} alt="Kudos Image" />
      <h2>Kudos Board</h2>
    </header>
  );
};

export default Header;
