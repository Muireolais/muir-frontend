import api from "../API";

const login = async ({ loginType, formData }) => {
  try {
    const payload =
      loginType === "company"
        ? {
          loginType: "company",
          email: formData.email,
          company_key: formData.code,
        }
        : {
          loginType,
          username: formData.fullName,
          password: formData.password,
        };

    const response = await api.post("/auth/login", payload);

    const token = response.data.accessToken;
    localStorage.setItem("accessToken", token);

    return token;
  } catch (error) {
    return null;
  }
};

export default login;