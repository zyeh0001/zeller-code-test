export interface Auth {
  role: string;
}

export interface Customer {
  email: string;
  id: string;
  name: string;
  role: string;
}

export interface CustomerData {
  listZellerCustomers: {
    items: Customer[];
  };
  loading: boolean;
  error: string | undefined;
}

export interface GraphQLResponse<T> {
  data: T;
}
