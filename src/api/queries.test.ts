import { ListZellerCustomersByRole } from "./queries";

describe("ListZellerCustomersByRole", () => {
  it("should return the correct GraphQL query by given role", () => {
    const role = "MANAGER";
    const expectedQuery = `
query ListManagerCustomers {
  listZellerCustomers(filter: { role: { eq: "MANAGER" } }) {
    items {
      email
      id
      name
      role
    }
  }
}`;
    expect(ListZellerCustomersByRole(role)).toBe(expectedQuery.trim());
  });

  it("should show uppercase the role in the query", () => {
    const role = "manager";
    const expectedQuery = `
query ListManagerCustomers {
  listZellerCustomers(filter: { role: { eq: "MANAGER" } }) {
    items {
      email
      id
      name
      role
    }
  }
}`;
    expect(ListZellerCustomersByRole(role)).toBe(expectedQuery.trim());
  });
});
