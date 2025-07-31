export type Profile = {
  id: string;
  displayName: string;
  username: string;
  email: string;
  image: string;
  phoneNumber?: string;
  description: string;
  degree: string;
  field?: string;
  institute: string;
  grade: string;
  startYear: Date;
  passYear: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
