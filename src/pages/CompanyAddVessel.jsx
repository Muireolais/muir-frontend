"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/CompanyAddVessel.module.css";
import DataInput from "../components/UI/Input/DataInput";
import addVessel from "../API/post/addVessel";

function CompanyAddVessel() {
  const navigate = useNavigate();

  const [vesselData, setVesselData] = useState([]);
  const [vesselIndex, setVesselIndex] = useState(0);

  const [formData, setFormData] = useState({
    vessel_type: "",
    imo_number: "",
    vessel_name: "",
  });

  const [errors, setErrors] = useState({});

  //must be replaced by fetching these data from S3 + DB
  useEffect(() => {
    fetch("/Vessel_type.json")
      .then((res) => res.json())
      .then((data) => setVesselData(data.vessels || []))
      .catch((err) => console.error("JSON Loading error:", err));
  }, []);

  const nextSlide = () => {
    if (!vesselData.length) return;
    setVesselIndex((prev) => (prev + 1) % vesselData.length);
  };

  const prevSlide = () => {
    if (!vesselData.length) return;
    setVesselIndex((prev) => (prev === 0 ? vesselData.length - 1 : prev - 1));
  };

  const chooseVesselType = (type) => {
    setFormData((prev) => ({
      ...prev,
      vessel_type: type,
    }));

    setErrors((prev) => ({
      ...prev,
      vessel_type: false,
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vessel_type) {
      newErrors.vessel_type = true;
    }

    if (!formData.imo_number.trim()) {
      if(!/^\d{7}$/.test(formData.imo_number))
      newErrors.imo_number = true;
    }

    if (!formData.vessel_name.trim()) {
      newErrors.vessel_name = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    await addVessel(formData);

    navigate(-1);
  };

  const visibleVessels = vesselData.slice(vesselIndex, vesselIndex + 3);

  if (visibleVessels.length < 3) {
    visibleVessels.push(...vesselData.slice(0, 3 - visibleVessels.length));
  }

  return (
    <>
      <h2>Vessel type</h2>

      {errors.vessel_type && <p className={styles.error}>Choose vessel type</p>}

      <div>
        {vesselData.length > 0 && (
          <div className={styles.slider}>
            <button type="button" className={styles.arrow} onClick={prevSlide}>
              ‹
            </button>

            <div className={styles.cards}>
              {visibleVessels.map((vessel, index) => (
                <div
                  className={`${styles.card} ${
                    formData.vessel_type === vessel.title
                      ? styles.selectedCard
                      : ""
                  }`}
                  key={`${vessel.title}-${index}`}
                >
                  <div className={styles.cardOverlay}>
                    <h3>{vessel.title}</h3>
                    <p>{vessel.description}</p>

                    {vessel.info?.map(([icon, title, desc], i) => (
                      <div className={styles.info} key={i}>
                        <h4>{title}</h4>
                        <p>{desc}</p>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="hollow-button"
                      onClick={() => chooseVesselType(vessel.title)}
                    >
                      Choose
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className={styles.arrow} onClick={nextSlide}>
              ›
            </button>
          </div>
        )}
      </div>

      <h2>Vessel IMO</h2>
      <DataInput
        type="text"
        placeholder="Enter your vessel's IMO"
        value={formData.imo_number}
        onChange={(e) =>
          handleChange(
            "imo_number",
            e.target.value.replace(/\D/g, "").slice(0, 7),
          )
        }
        className={errors.imo_number ? styles.errorInput : ""}
      />

      <h2>Vessel name</h2>
      <DataInput
        type="text"
        placeholder="Enter Vessel name"
        value={formData.vessel_name}
        onChange={(e) => handleChange("vessel_name", e.target.value)}
        className={errors.vessel_name ? styles.errorInput : ""}
      />

      <h2>Maybe there should be summary like what will be created</h2>

      <div>
        <button type="button" onClick={handleSubmit}>
          Add vessel
        </button>
      </div>
    </>
  );
}

export default CompanyAddVessel;
