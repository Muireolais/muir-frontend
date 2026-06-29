import { jwtDecode } from "jwt-decode";
import api from "../API"

async function fetchCrew() {
  const token = jwtDecode(localStorage.getItem("accessToken"));
  const response = await api.get("/crew");
  return response.data;
}

export default fetchCrew;