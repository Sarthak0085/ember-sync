export type Profile = {
  id: string;
  fullName: string;
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
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
