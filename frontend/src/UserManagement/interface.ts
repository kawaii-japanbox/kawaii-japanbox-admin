interface IUserResponse {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  created_at: Date;
}
