import Button from "../Button/Button";
import styles from "./Search.module.css";
import icon from "./Search_icon.svg";

const Search = ({ placeholder, onChange, value }) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder={placeholder}
        maxLength={80}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button borderedButton="true">
        <img styles={"width: 100px"} src={icon} alt="Search Icon" />
      </Button>
    </div>
  );
};

export default Search;
