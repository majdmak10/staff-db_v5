export enum UserRole {
  Admin = "Admin",
  Editor = "Editor",
  Guest = "Guest",
}

export interface IUser {
  _id: string;
  profilePicture?: string;
  fullName: string;
  sex: string;
  position: string;
  email: string;
  password: string;
  role: UserRole;
}
