import styles from "../styles/CompanyPageVessels.module.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const vessels = [
  { name: "Titanic", id: 452653, status: "Active", performance: 65 },
  { name: "Santa Maria", id: 246532, status: "Active", performance: 10 },
  { name: "Victory", id: 893463, status: "Active", performance: 27 },
  { name: "Bismarck", id: 163126, status: "Active", performance: 50 },
  { name: "Enterprise", id: 183270, status: "Active", performance: 79 },
  { name: "Cutty Sark", id: 963257, status: "Active", performance: 100 },
  { name: "Mayflower", id: 863453, status: "Active", performance: 91 },
  { name: "Queen Mary 2", id: 132564, status: "Inactive", performance: 0 },
  { name: "HMS Endeavour", id: 472819, status: "Active", performance: 58 },
  { name: "Golden Hind", id: 915204, status: "Inactive", performance: 12 },
  { name: "USS Constitution", id: 381627, status: "Active", performance: 84 },
  { name: "Black Pearl", id: 724519, status: "Active", performance: 33 },
  { name: "Flying Dutchman", id: 159302, status: "Inactive", performance: 97 },
];

const CompanyPageVessels = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredVessels = useMemo(() => {
    const q = query.trim().toLowerCase();

    return vessels.filter((v) => {
      const matchesQuery =
        v.name.toLowerCase().includes(q) || v.id.toString().includes(q);

      const matchesStatus =
        statusFilter === "All" ? true : v.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const activeCount = vessels.filter((v) => v.status === "Active").length;
  const inactiveCount = vessels.filter((v) => v.status !== "Active").length;

  const getPerformanceTone = (value) => {
    if (value >= 80) return styles.performanceExcellent;
    if (value >= 50) return styles.performanceGood;
    if (value >= 20) return styles.performanceMedium;
    return styles.performanceLow;
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.leftSide}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>

            <input
              type="text"
              placeholder="Search by vessel name or ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />

            {query ? (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            ) : null}
          </div>

          <div className={styles.filters}>
            <button
              type="button"
              className={`${styles.filterChip} ${
                statusFilter === "All" ? styles.filterChipActive : ""
              }`}
              onClick={() => setStatusFilter("All")}
            >
              All
            </button>

            <button
              type="button"
              className={`${styles.filterChip} ${
                statusFilter === "Active" ? styles.filterChipActive : ""
              }`}
              onClick={() => setStatusFilter("Active")}
            >
              Active
            </button>

            <button
              type="button"
              className={`${styles.filterChip} ${
                statusFilter === "Inactive" ? styles.filterChipActive : ""
              }`}
              onClick={() => setStatusFilter("Inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("./add")}
          className={styles.addVessel}
          type="button"
        >
          <span className={styles.addIcon}>+</span>
          <span style={{ color: "#ffffff" }}>New Vessel</span>
        </button>
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Total Vessels</span>
          <span className={styles.summaryValue}>{vessels.length}</span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Active</span>
          <span className={styles.summaryValue}>{activeCount}</span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Inactive</span>
          <span className={styles.summaryValue}>{inactiveCount}</span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Showing</span>
          <span className={styles.summaryValue}>{filteredVessels.length}</span>
        </div>
      </div>

      <div className={styles.vesselGrid}>
        {filteredVessels.map((v) => {
          const gradientWidth =
            v.performance > 0 ? `${100 / (v.performance / 100)}%` : "100%";

          return (
            <article key={v.id} className={styles.vesselCard}>
              <div className={styles.imageWrap}>
                <div className={styles.vesselPicture} />

                <div className={styles.imageOverlay}>
                  <span
                    className={`${styles.statusBadge} ${
                      v.status === "Active"
                        ? styles.statusActive
                        : styles.statusInactive
                    }`}
                  >
                    {v.status}
                  </span>

                  <span
                    className={`${styles.performanceBadge} ${getPerformanceTone(
                      v.performance,
                    )}`}
                  >
                    {v.performance}%
                  </span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.name}>{v.name}</h3>
                    <p className={styles.shipId}>Vessel ID #{v.id}</p>
                  </div>

                  <button type="button" className={styles.detailsButton}>
                    View
                  </button>
                </div>

                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Status</span>
                    <span className={styles.metaValue}>{v.status}</span>
                  </div>

                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Category</span>
                    <span className={styles.metaValue}>Cargo Vessel</span>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>Performance</span>
                    <span className={styles.progressPercent}>
                      {v.performance}%
                    </span>
                  </div>

                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${v.performance}%` }}
                    >
                      <div
                        className={styles.progressGradient}
                        style={{ width: gradientWidth }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredVessels.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🚢</div>
          <h3>No vessels found</h3>
          <p>Try changing the search text or selected status filter.</p>
        </div>
      ) : null}
    </div>
  );
};

export const total_vessels = vessels.length;
export default CompanyPageVessels;
