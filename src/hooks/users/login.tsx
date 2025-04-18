import { useState } from "react";
import axios from "axios";

export default function useAuth() {
  type User = {
    email: string;
  };

  const [user, setUser] = useState<User | null>(null);

  const login = async (email: String, password: String) => {
    try {
      const res = await axios.post("http://localhost:8082/users/login", {
        User_Email: email,
        User_Password: password,
      });

      if (!res.data) {
        return {
          success: false,
          message: res.data.message || "Data login tidak ditemukan",
        };
      }

      const { User_Email } = res.data.data.User_Email;

      localStorage.setItem("token", res.data.data.User_Token);
      setUser({ email: User_Email });
      return { success: true };
    } catch (err: any) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}
