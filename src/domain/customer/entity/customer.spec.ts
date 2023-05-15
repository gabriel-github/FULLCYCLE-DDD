import { Customer } from "./customer";
import { Address } from "./value-object/address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Gabriel");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "Jhon");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São paulo");

    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");

      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactive();

    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    const customer = new Customer("1", "Customer 1");

    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20)
  })
});
