import { ListZellerCustomersByRole } from "./queries";

describe("ListZellerCustomersByRole", () => {
  it("should have ListZellerCustomersByRole query with role parameter", () => {
    expect(ListZellerCustomersByRole).toBeDefined();
    expect(ListZellerCustomersByRole).toContain("query ListManagerCustomers");
    expect(ListZellerCustomersByRole).toContain("$role: String!");
    expect(ListZellerCustomersByRole).toContain(
      "filter: { role: { eq: $role } }"
    );
  });
});
