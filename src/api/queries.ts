/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const ListZellerCustomers = /* GraphQL */ `
  query ListZellerCustomers {
    listZellerCustomers {
      items {
        email
        id
        name
        role
      }
    }
  }
`;

export const ListZellerCustomersByRole = /* GraphQL */ `
  query ListManagerCustomers($role: String!) {
    listZellerCustomers(filter: { role: { eq: $role } }) {
      items {
        email
        id
        name
        role
      }
    }
  }
`;
