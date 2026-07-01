import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styles from "../styles/MasterMain.module.css";

import Table from "../components/UI/Table/Table";
import Toast from "../components/UI/Toast/Toast";
import MasterMenu from "../components/UI/MasterMenu/MasterMenu";

import fetchCrew from "../API/get/fetchCrew";
import addCrew from "../API/post/addCrew";
import deleteCrew from "../API/delete/deleteCrew";
import changeBoardStatus from "../API/patch/changeBoardStatus";

const MasterMain = ({ links }) => {
  const itemsPerPage = 10;
  const location = useLocation();

  const [page, setPage] = useState(() => {
    try {
      const memoPage = localStorage.getItem("crewPage");
      return memoPage ? Number(memoPage) : 1;
    } catch (e) {
      return 1;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: crew = [
      {
        id: 1,
        full_name: "Jhon Doe",
        position_name: "Master",
        date_of_birth: "2026-01-12T00:00:00.000Z",
        sign_on_date: "2026-02-12T00:00:00.000Z",
        sign_off_date: null,
        status: 1,
      },
      {
        id: 2,
        full_name: "Jhon G",
        position_name: "Master",
        date_of_birth: "2026-02-12T00:00:00.000Z",
        sign_on_date: "2026-02-12T00:00:00.000Z",
        sign_off_date: null,
        status: 1,
      },
      {
        id: 3,
        full_name: "Jhon SDG",
        position_name: "Master",
        date_of_birth: "2026-02-12T00:00:00.000Z",
        sign_on_date: "2026-02-12T00:00:00.000Z",
        sign_off_date: null,
        status: 1,
      },
      {
        id: 4,
        full_name: "DF H",
        position_name: "Master",
        date_of_birth: "2026-02-12T00:00:00.000Z",
        sign_on_date: "2026-02-12T00:00:00.000Z",
        sign_off_date: null,
        status: 1,
      },
      {
        id: 5,
        full_name: "SG G",
        position_name: "Master",
        date_of_birth: "2026-02-12T00:00:00.000Z",
        sign_on_date: "2026-02-12T00:00:00.000Z",
        sign_off_date: "2026-02-12T00:00:00.000Z",
        status: 1,
      },
    ],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["crew"],
    queryFn: fetchCrew,
    keepPreviousData: true,
  });

  const filteredCrew = useMemo(() => {
    if (!Array.isArray(crew)) return [];

    const query = searchQuery?.toLowerCase().trim() || "";
    if (!query) return crew;

    return crew.filter(
      (person) =>
        person.full_name?.toLowerCase().includes(query) ||
        person.position_name?.toLowerCase().includes(query) ||
        person.date_of_birth?.includes(query),
    );
  }, [crew, searchQuery]);

  const visibleCrew = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredCrew.slice(start, start + itemsPerPage);
  }, [filteredCrew, page]);

  const totalPages = Math.ceil(filteredCrew.length / itemsPerPage) || 1;

  const totalCrew = filteredCrew.length;
  const onBoardCount = filteredCrew.filter(
    (person) => !person.sign_off_date,
  ).length;
  const offBoardCount = filteredCrew.filter(
    (person) => person.sign_off_date,
  ).length;

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setPage(1);
  };

  const confirmDeleting = () => {
    setIsOpen(false);
    return selectedIds.forEach((person) =>
      deleteCrewMutation.mutate(person.id),
    );
  };

  const deleteCrewMutation = useMutation({
    mutationFn: deleteCrew,
    onSuccess: () => {
      queryClient.invalidateQueries(["crew"]);
      setNotification({
        type: "success",
        message: "The deletion was successful ✅",
      });
      setTimeout(() => setNotification(null), 4000);
      setSelectedIds([]);
    },
    onError: () => {
      setNotification({ type: "error", message: "Error while deleting ❌" });
      setTimeout(() => setNotification(null), 4000);
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({ worker_id, date, status }) =>
      changeBoardStatus(worker_id, date, status),

    onSuccess: () => {
      queryClient.invalidateQueries(["crew"]);
    },

    onError: () => {
      setNotification({
        type: "error",
        message: "Error while updating status ❌",
      });

      setTimeout(() => setNotification(null), 4000);
    },
  });
  
  useEffect(() => {
    if (location.state?.notification) {console.log(location.state);
      setNotification(location.state.notification);

      setTimeout(() => {
        setNotification(null);
      }, 4000);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("crewPage", page);
  }, [page]);

  const renderPageHeader = () => (
    <div className={styles.pageHeader}>
      <div className={styles.pageInfo}>
        <div>
          <span className={styles.eyebrow}>Crew management</span>

          <h1 className={styles.pageTitle}>Manage your crew</h1>

          <p className={styles.pageSubtitle}>
            Track crew members, onboard status and assignment readiness in one
            place.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Total crew</span>
            <strong>{totalCrew}</strong>
          </div>

          <div className={styles.statCard}>
            <span>On board</span>
            <strong>{onBoardCount}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Off board</span>
            <strong>{offBoardCount}</strong>
          </div>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <div className={styles.heroText}>
          <strong>Crew readiness</strong>
          <span>Monitor training and boarding progress</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <>
      <Toast notification={notification} />
      {renderPageHeader()}

      <div className={styles.crew_list}>
        <MasterMenu
          links={links}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedIds={selectedIds}
          confirmDeleting={confirmDeleting}
        />

        <Table
          filteredCrew={filteredCrew}
          data={visibleCrew}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          changeStatusMutation={changeStatusMutation}
        />
      </div>
    </>
  );

  if (isLoading)
    return (
      <main>
        <div className="container">
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </main>
    );

  if (isError)
    return (
      <main>
        <div className="container">
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </main>
    );

  return (
    <main>
      <div className="container">
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </main>
  );
};

export default MasterMain;
