import axiosWithConfig from "../api";

export const login = async (email: String, password: String) => {
  try {
    const response = await axiosWithConfig.post(`/users/login`, {
      User_Email: email,
      User_Password: password,
    });

    if (!response.data) {
      return {
        success: false,
        message: response.data.message || "Data login tidak ditemukan",
      };
    }

    localStorage.setItem("token", response.data.data.User_Token);

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};
