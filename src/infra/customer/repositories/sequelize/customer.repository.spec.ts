import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from "./customer.repository";
import { CustomerModel } from "./customer.model";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/entity/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")

    customer.Address = address;

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({where: {id: "123"}})

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")

    customer.Address = address;

    await customerRepository.create(customer)

    customer.changeName("Customer 2")

    await customerRepository.update(customer)

    const customerModel = await CustomerModel.findOne({where: {id: "123"}})

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })  

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")

    customer.Address = address;

    await customerRepository.create(customer)

    const foundCustomer = await customerRepository.find(customer.id)

    expect(customer).toStrictEqual(foundCustomer)
  })
  it("should throw error when customer is not found", async () => {
    const customerRepository = new CustomerRepository()
    
    expect(async () => {
      await customerRepository.find("9u3bnsj")
    }).rejects.toThrow("Customer not found")
  })

  it("should findAll customers", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")

    customer.Address = address;
    customer.addRewardPoints(10);
    customer.activate()

    await customerRepository.create(customer)

    const customer2 = new Customer("1234", "Customer 2")
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2")

    customer2.Address = address2;
    customer2.addRewardPoints(20);
    customer2.activate()

    await customerRepository.create(customer2)

    const foundCustomers = await customerRepository.findAll()
    const customers = [customer, customer2]

    expect(customers).toStrictEqual(foundCustomers)
    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer)
    expect(customers).toContainEqual(customer2)
  })
});
