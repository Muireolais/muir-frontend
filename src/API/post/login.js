import api from "../API";

const login = async ({ formData }) => {
  try {
    const payload =
      formData.email && formData.code
        ? {
            loginType: "company",
            email: formData.email,
            company_key: formData.code,
          }
        : {
            loginType: "worker",
            username: formData.fullName,
            password: formData.password,
          };

    const response = await api.post("/auth/login", payload);

    const token = response.data.accessToken;
    localStorage.setItem("accessToken", token);

    return {
      token,
      role: response.data.role,
    };
  } catch (error) {
    return null;
  }
};

export default login;