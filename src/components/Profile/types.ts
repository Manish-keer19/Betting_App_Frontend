export type ThemeType = 'green' | 'black';

export type BankDetails = {
  accountNumber: string;
  accountName: string;
  ifscCode: string;
  bankName: string;
  upiId?: string;
};

export type UserData = {
  _id: string;
  profilePic: string;
  username: string;
  email: string;
  Role: string;
  balance: number;
  token?: string;
};