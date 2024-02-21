export interface UserData {
  name: string;
  intro: string;
  jobTitle: string;
}

export interface User {
  id: string;
  email: string;
  signer: string;
  role: string;
  avatar?: string;
  twUserData: UserData;
  cnUserData: UserData;
  enUserData: UserData;
}

export type UsersArray = User[];
