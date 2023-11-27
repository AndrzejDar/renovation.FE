export interface FilteredUser {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  status: string;
  data: {
    user: FilteredUser;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
  phoneNumber: string;
  organisation: string;
  country: string;
  createdAt: string;
  commarchId: string;
  totalProjects: number;
  comarch: boolean;
}

export interface UsersFilter {
  email?: string;
}

export interface projectTile {
  id: number;
  name: string;
  customer: string;
  description: string;
  tags: string[];
  createdById: number;
  archived: boolean;
  uuid: string;
  imagePath: string;
  createdAt: string;
}

export interface ProjectFilter {
  fromDate?: Date;
  toDate?: Date;
  name?: string;
  customer?: string;
  tags?: string;
}

export interface ProjectFilterPayload {
  fromDate?: string;
  toDate?: string;
  name?: string;
  customer?: string;
  tags?: string[];
}

export const defaultProjectFilterValues: ProjectFilter = {
  fromDate: undefined,
  toDate: undefined,
  name: "",
  customer: "",
  tags: "",
};

export const defaultProjectFilterPayloadVaules: ProjectFilterPayload = {
  fromDate: "",
  toDate: "",
  name: "",
  customer: "",
  tags: [],
};
