import { Link } from "react-router-dom";
import styles from "./MasterMenu.module.css";
import Search from "../Search/Search";
import Button from "../Button/Button";
import ModalWindow from "../ModalWindow/ModalWindow";
import filter from "../Filter/filter.png";
import formatDate from "../../../functions/formatDate";

const MasterMenu = ({
  links,
  searchQuery,
  handleSearchChange,
  isOpen,
  setIsOpen,
  selectedIds,
  confirmDeleting,
}) => {
  return (
    <div className={styles.menu}>
      <div className={styles.tabs}>
        <div className={styles.tab}>Dashboard</div>
        <div className={`${styles.tab} ${styles.active}`}>Crew</div>
        <div className={styles.tab}>Statistics</div>
      </div>

      <div className={styles.buttons}>
        <div className={styles.search_container}>
          <Search
            placeholder="Who are you looking for?"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <Button className={styles.filter} borderedButton="true">
          <img className={styles.filter_img} src={filter} alt="" />
          Filter
        </Button>

        <Link to={links?.add || "/"}>
          <Button className={styles.spaces} borderedButton="true">
            Add
          </Button>
        </Link>

        <Button
          className={styles.spaces}
          borderedButton="true"
          onClick={() => setIsOpen(true)}
        >
          Delete
        </Button>

        <ModalWindow
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          newStyles={styles.modal_padding}
        >
          <h2 className={styles.modal_header}>
            Confirm deletion of the listed entries
          </h2>

          <div className={styles.scroll_list}>
            {selectedIds.length === 0 ? (
              <h4 className={styles.empty_message}>
                Please select entries to delete
              </h4>
            ) : (
              selectedIds.map((selected) => (
                <li key={selected.id}>
                  {selected.position_name} {selected.full_name}{" "}
                  {formatDate(selected.date_of_birth)}
                </li>
              ))
            )}
          </div>

          <div className="container" style={{ width: "100%" }}>
            <Button
              onClick={confirmDeleting}
              disabled={selectedIds.length === 0}
            >
              Confirm
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </ModalWindow>
      </div>
    </div>
  );
};

export default MasterMenu;
