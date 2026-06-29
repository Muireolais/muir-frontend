// React/routing
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// styles
import styles from "../styles/MasterMain.module.css";

// UI
import Button from "../components/UI/Button/Button";
import DataInput from "../components/UI/Input/DataInput";
import ModalWindow from "../components/UI/ModalWindow/ModalWindow";
import Search from "../components/UI/Search/Search";

// API
import addCrew from "../API/post/addCrew";
import fetchPositions from "../API/get/fetchPositions";
import fetchPositionGroups from "../API/get/fetchPositionGroups";

// Functions
import isFutureDate from "../functions/isFutureDate";
import isValidIsoDate from "../functions/isValidIsoDate";

const MasterAdd = ({ links }) => {
  // ==================== NAVIGATION ====================

  const navigate = useNavigate();

  // ==================== STATE ====================

  // Controls position selection modal
  const [isOpen, setIsOpen] = useState(false);

  // Groups of positions (for example: Deck, Engine, etc.)
  const [positionGroups, setPositionGroups] = useState([]);

  // List of available positions
  const [positions, setPositions] = useState([{ id: "1", position: "Master" },{ id: "2", position: "Master" },{ id: "3", position: "Master" }]);

  // Active position group index (used for switching tabs)
  const [active, setActive] = useState(0);

  // Crew records that will be added
  const [records, setRecords] = useState([
    {
      id: Date.now(),
      full_name: "",
      date_of_birth: "",
      sign_on_date: "",
      position_id: "",
      position: "",
    },
  ]);

  // Stores calculated button positions (used for dropdown/modal UI)
  const [buttonPositions, setButtonPositions] = useState([]);

  // Currently selected record for position choosing
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  // Validation errors for each record
  const [errors, setErrors] = useState({});

  // ==================== RECORD MANAGEMENT ====================

  const addRecord = () => {
    setRecords([
      ...records,
      {
        id: Date.now(),
        full_name: "",
        date_of_birth: "",
        sign_on_date: "",
        position_id: "",
      },
    ]);
  };

  const removeRecord = (id) => {
    if (records.length === 1) return;
    setRecords(records.filter((record) => record.id !== id));
  };

  // ==================== INPUT HANDLING ====================

  // Update specific field in a specific record
  const handleChange = (id, field, value) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, [field]: value } : record,
      ),
    );
  };

  // ==================== FORM SUBMIT ====================

  const handleSubmit = async () => {
    const newErrors = {};
    let hasError = false;

    records.forEach((record) => {
      const recordErrors = {};

      if (!record.full_name.trim()) {
        recordErrors.full_name = true;
        hasError = true;
      }
      if (!record.position_id) {
        recordErrors.position_id = true;
        hasError = true;
      }
      if (
        !isValidIsoDate(record.date_of_birth) ||
        isFutureDate(record.date_of_birth)
      ) {
        recordErrors.date_of_birth = true;
        hasError = true;
      }

      if (
        !isValidIsoDate(record.sign_on_date) ||
        isFutureDate(record.sign_on_date)
      ) {
        recordErrors.sign_on_date = true;
        hasError = true;
      }

      if (Object.keys(recordErrors).length > 0) {
        newErrors[record.id] = recordErrors;
      }
    });

    setErrors(newErrors);

    if (hasError) return;

    for (const record of records) {
      await addCrew(record);
    }

    navigate(-1);
  };

  // ==================== POSITION SELECTION ====================

  const choosePosition = (position_id, position) => {
    setRecords(
      records.map((record) =>
        record.id === selectedRecordId
          ? { ...record, position_id, position }
          : record,
      ),
    );

    // Remove position validation error for this record
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (newErrors[selectedRecordId]) {
        delete newErrors[selectedRecordId].position_id;
        if (Object.keys(newErrors[selectedRecordId]).length === 0) {
          delete newErrors[selectedRecordId];
        }
      }

      return newErrors;
    });

    setIsOpen(false);
  };

  // ==================== DATA LOADING ====================

  useEffect(() => {
    async function loadPositionGroups() {
      const data = await fetchPositionGroups();
      setPositionGroups(data);
    }

    async function loadPositions() {
      const data = await fetchPositions();
      setPositions(data);
    }

    loadPositionGroups();
    loadPositions();
  }, []);

  // ==================== RENDER ====================

  return (
    <main>
      <ModalWindow
        isOpen={isOpen}
        newStyles={styles.position_modal_height}
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.position_header}>
          <h3 className={styles.modal_header}>Choose a position</h3>
          <div className={styles.position_header_right}>
            <Search placeholder="Find position..." />
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>
        <div className={styles.position_content}>
          <ul className={styles.position_groups}>
            <div
              key={0}
              className={`${styles.position_group} ${active === 0 ? styles.selected_position_group : ""}`}
              onClick={() => setActive(0)}
            >
              <span>All</span>
            </div>
            {positionGroups.map((group) => (
              <div
                key={group.id}
                className={`${styles.position_group} ${active === group ? styles.selected_position_group : ""}`}
                onClick={() => setActive(group.id)}
              >
                <span>{group.group_name}</span>
              </div>
            ))}
          </ul>
          <div className={styles.position_records}>
            {positions.map((position) => (
              <div
                key={position.id}
                className={styles.position_record}
                onClick={() => choosePosition(position.id, position.position)}
              >
                <h4>{position.position}</h4>
              </div>
            ))}
          </div>
        </div>
      </ModalWindow>
      <div className={`container ${styles.content}`}>
        <div
          className="container"
          style={{ marginBottom: "40px", height: "49px" }}
        >
          <h2>Add new crew member(s)</h2>
        </div>
        <div style={{ width: "90%" }}>
          <table className={styles.add_table}>
            <thead>
              <tr>
                <th>
                  <h4>Full Name</h4>
                </th>
                <th>
                  <h4>Position</h4>
                </th>
                <th>
                  <h4>Date of birth</h4>
                </th>
                <th>
                  <h4>Sign on date</h4>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <DataInput
                      placeholder="Full Name"
                      value={record.full_name}
                      onChange={(e) =>
                        handleChange(record.id, "full_name", e.target.value)
                      }
                      className={`
                        ${styles.date_input}
                        ${errors[record.id]?.full_name ? styles.error_input : ""}
                      `}
                    />
                  </td>
                  <td>
                    <Button
                      className={`${styles.position_button} ${errors[record.id]?.position_id ? styles.error_button : ""}`}
                      borderedButton="true"
                      onClick={() => {
                        setSelectedRecordId(record.id);
                        setIsOpen(true);
                      }}
                    >
                      {record.position || "Position"}
                    </Button>
                  </td>
                  <td>
                    <DataInput
                      type="date"
                      value={record.date_of_birth}
                      onChange={(e) => {
                        handleChange(record.id, "date_of_birth", e.target.value);
                      }}
                      className={`
                        ${styles.date_input}
                        ${errors[record.id]?.date_of_birth ? styles.error_input : ""}
                      `}
                    />
                  </td>
                  <td>
                    <DataInput
                      type="date"
                      value={record.sign_on_date}
                      onChange={(e) => {
                        handleChange(record.id, "sign_on_date", e.target.value);
                      }}
                      className={`
                        ${styles.date_input}
                        ${errors[record.id]?.sign_on_date ? styles.error_input : ""}
                      `}
                    />
                  </td>
                  <td>
                    <Button
                      className={styles.remove_btn}
                      borderedButton="true"
                      onClick={() => removeRecord(record.id)}
                      disabled={records.length === 1}
                    >
                      ✖
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Button className={styles.add_record} onClick={addRecord}>
                    Add record
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.buttons}>
            <Button onClick={handleSubmit}>Add crew</Button>
            <Link to={-1}>
              <Button className={styles.back_arrow_space}>
                Back <div className={styles.back_arrow}></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MasterAdd;
