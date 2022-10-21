import { Account } from './../shared/models/account.model';
export interface User {
  username: string;
  sessionId: string;
  account: Account;
}
