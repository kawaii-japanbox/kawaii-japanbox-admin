import { Role } from "./data";

export interface IUserResponse {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  createdAt: string;
}

export interface ICreateUserForm {
  name?: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUpdateUserForm {
  id: string;
  data: { name: string; email: string; role: Role; phone?: string };
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export interface UserFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  user: IUserResponse | null;
}

export interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export interface UserTableProps {
  users: IUserResponse[] | null;
  roleColors: Record<string, string>;
  handleEditUser: (user: IUserResponse) => void;
  handleDelete: (id: string) => void;
}
