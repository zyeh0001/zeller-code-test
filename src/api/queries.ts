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

//query to get Customer by Role
export const ListZellerCustomersByRole = (role: string) => {
  return `query ListManagerCustomers {
  listZellerCustomers(filter: { role: { eq: "${role.toUpperCase()}" } }) {
    items {
      email
      id
      name
      role
    }
  }
}`;
};
