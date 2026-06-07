import api from "../API"

// need to replace ship to vessel
async function addVessel(data) {
    const response = await api.post("/vessel", {
        vessel_name: data.vessel_name,
        vessel_type: data.vessel_type,
        imo_number: data.imo_number,
    });
    return response.data;
}

export default addVessel;