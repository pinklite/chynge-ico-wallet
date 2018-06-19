export enum KycStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export class User {
  id: string;

  kyc_status: KycStatus;
  receiving_wallet_address: string;

  constructor() {}
}
