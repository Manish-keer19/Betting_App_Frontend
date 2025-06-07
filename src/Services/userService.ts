// import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

class UserService {
  async getUserDeposits(userId: string, token: String) {
    try {
      const res = await axiosInstance.get(`/user/get-user-deposits/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Deposits response:", res.data);
      if (res.data.success) {
        // console.log("Deposits fetched successfully:", res.data);
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching deposits:", error);
      throw error;
    }
  }

  async depositMoney(data: any, token: string) {
    try {
      const res = await axiosInstance.post("/user/deposit-money", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Deposit response:", res.data);
      if (res.data.success) {
        // console.log("Deposit successful:", res.data);
        return res.data;
      }
    } catch (error) {
      console.error("Error during deposit:", error);
      throw error;
    }
  }

  async getuserBankDetails(userId: string, token: string) {
    // console.log("Fetching bank details for user:", userId);
    try {
      const res = await axiosInstance.get(
        `/user/getUserBankDetails/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Bank details response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      throw error;
    }
  }

  async widhdrawMoney(data: any, token: string) {
    try {
      const res = await axiosInstance.post(
        "/user/create-withdraw-request",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Withdraw response:", res.data);
      if (res.data.success) {
        // console.log("Withdraw successful:", res.data);
        return res.data;
      }
    } catch (error) {
      console.error("Error during withdraw:", error);
      throw error;
    }
  }

  async getUserWithdrawHistory(userId: string, token: string) {
    try {
      const res = await axiosInstance.get(
        `/user/get-user-withdraw-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Withdraw history response:", res.data);
      if (res.data.success) {
        return res.data;
      } else {
        // toast.error(res.data.message || "Failed to fetch withdraw history");
      }
    } catch (error) {
      console.error("Error fetching withdraw history:", error);
      // toast.error("Something went wrong while fetching withdraw history");
    }
  }

  async getUserBalance(token: string) {
    try {
      const res = await axiosInstance.get("/user/get-user-balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("User balance response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
      throw error;
    }
  }

  async saveBankDetails(data: any, token: string) {
    try {
      // console.log("Saving bank details in userservice:", data);
      const res = await axiosInstance.post(
        "/user/save-user-Bank-Details",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Bank details response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error saving bank details:", error);
      throw error;
    }
  }

  async changePassword(data: any, token: string) {
    try {
      const res = await axiosInstance.post("/auth/change-password", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Change password response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }

  async getUserBonus(userId: string, token: string) {
    try {
      const res = await axiosInstance.get(`/user/get-user-bonus/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("User bonus response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching user bonus:", error);
      throw error;
    }
  }

  async getUserBetHistoryHeadTail(token: string) {
    try {
      const res = await axiosInstance.get("/user/get-head-tail-gameHistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("User bet history response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching user bet history:", error);
      throw error;
    }
  }

  async getUserBetHistoryByGameTyp(token: string,gameType:String) {

    try {
      const res = await axiosInstance.get(`/user/get-bet-history/${gameType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("User bet history response:", res.data);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching user bet history:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
