import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

class AdminService {
  async getAllPendingWithdraws(token: any) {
    try {
      const res = await axiosInstance.get("/admin/getAllPendingWithdraws", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Pending Withdraws:", res.data);
      if (res.data.success) {
        return res.data;
      }
      toast.error("Failed to fetch pending withdraws");
    } catch (error) {
      toast.error("Failed to fetch pending withdraws");
      console.error("Error fetching pending withdraws:", error);
    }
  }
  async getAllPendingDeposits(token: any) {
    try {
      const res = await axiosInstance.get("/admin/getAllPendingDeposits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Pending deposits:", res.data);
      if (res.data.success) {
        return res.data;
      }
      toast.error("Failed to fetch pending deposits");
    } catch (error) {
      toast.error("Failed to fetch pending  deposits");
      console.error("Error fetching pending  deposits:", error);
    }
  }

  async verifyDeposit(data: any, token: String) {
    try {
      const res = await axiosInstance.post("/admin/verify-deposit", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deposit verification response:", res.data);
      if (res.data.success) {
        toast.success("Deposit verified successfully");
        return res.data;
      }
      toast.error("Failed to verify deposit");
    } catch (error) {
      toast.error("Failed to verify deposit");
      console.error("Error verifying deposit:", error);
    }
  }

  async verfyWithdraw(data: any, token: any) {
    try {
      const res = await axiosInstance.post("/admin/verify-withdraw", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Withdraw verification response:", res.data);
      if (res.data.success) {
        toast.success("Withdraw verified successfully");
        return res.data;
      }
      toast.error("Failed to verify withdraw");
    } catch (error) {
      toast.error("Failed to verify withdraw");
      console.error("Error verifying withdraw:", error);
    }
  }

  async getAllApprovedDeposits(token: any) {
    try {
      const res = await axiosInstance.get("/admin/getAllApprovedDeposits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Approved deposits:", res.data);
      if (res.data.success) {
        return res.data;
      }
      toast.error("Failed to fetch approved deposits");
    } catch (error) {
      toast.error("Failed to fetch approved deposits");
      console.error("Error fetching approved deposits:", error);
    }
  }
  async getAllApprovedWithdraws(token: any) {
    try {
      const res = await axiosInstance.get("/admin/getAllApprovedWithdraws", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Approved withdraws:", res.data);
      if (res.data.success) {
        return res.data;
      }
      toast.error("Failed to fetch approved withdraws");
    } catch (error) {
      toast.error("Failed to fetch approved withdraws");
      console.error("Error fetching approved withdraws:", error);
    }
  }
  async getAllDepositHistory(token: any) {
    try {
      const res = await axiosInstance.get("/admin/gellAllDepositHistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deposit history:", res.data);
      if (res.data.success) {
        return res.data;
      }
      toast.error("Failed to fetch deposit history");
    } catch (error) {
      toast.error("Failed to fetch deposit history");
      console.error("Error fetching deposit history:", error);
    }
  }
  async getAllWithdrawHistory(token: any) {
    try {
      const res = await axiosInstance.get("/admin/getAllWithdrawHistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Withdraw history:", res.data);
      if (res.data.success) {
        return res.data;
      }
      toast.error("Failed to fetch withdraw history");
    } catch (error) {
      toast.error("Failed to fetch withdraw history");
      console.error("Error fetching withdraw history:", error);
    }
  }

  async rejectDeposit(data: any, token: any) {
    try {
      const res = await axiosInstance.post("/admin/reject-deposit", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deposit rejection response:", res.data);
      if (res.data.success) {
        toast.success("Deposit rejected successfully");
        return res.data;
      }
      toast.error("Failed to reject deposit");
    } catch (error) {
      toast.error("Failed to reject deposit");
      console.error("Error rejecting deposit:", error);
    }
  }

  async rejectWithdraw(data: any, token: any) {
    try {
      const res = await axiosInstance.post("/admin/reject-withdraw", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Withdraw rejection response:", res.data);
      if (res.data.success) {
        toast.success("Withdraw rejected successfully");
        return res.data;
      }
      toast.error("Failed to reject withdraw");
    } catch (error) {
      toast.error("Failed to reject withdraw");
      console.error("Error rejecting withdraw:", error);
    }
  }
}

export const adminService = new AdminService();
