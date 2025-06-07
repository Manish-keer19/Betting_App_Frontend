import axiosInstance from "./axiosInstance";

class AuthService {
  public async login(data: any) {
    try {
      const res = await axiosInstance.post("/auth/login", data);

      // console.log("Login response:", res.data);
      if (res.data.success) {
        // console.log("Login successful:", res.data);
        // Store the token in local storage or handle it as needed
        return res.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
  public async signup(data: any) {
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      // console.log("signup response:", res.data);
      if (res.data.success) {
        // console.log("signup successful:", res.data);
        // Store the token in local storage or handle it as needed
        return res.data;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }

  public async generateOtp(data: any) {
    try {
      const res = await axiosInstance.post("/auth/generate-otp", data);

      // console.log("generateOtp response:", res.data);
      if (res.data.success) {
        // console.log("generateOtp successful:", res.data);
        // Store the token in local storage or handle it as needed
        return res.data;
      }
    } catch (error) {
      console.error("Error during generateOtp:", error);
      throw error;
    }
  }

  async resetPassword(data: any) {
    try {
      const res = await axiosInstance.post("/auth/reset-password", data);
      // console.log("Reset password response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
