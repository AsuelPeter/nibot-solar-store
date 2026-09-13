export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export function getBankDetails(): BankDetails {
  return {
    bankName: process.env.NEXT_PUBLIC_BANK_NAME || "Moniepoint MFB",
    accountName: process.env.NEXT_PUBLIC_ACCOUNT_NAME || "NIBOT Solar Store",
    accountNumber: process.env.NEXT_PUBLIC_ACCOUNT_NUMBER || "0000000000",
  };
}
