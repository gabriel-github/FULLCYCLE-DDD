import { Address } from "../../../domain/customer/entity/value-object/address"
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import { ListCustomersUseCase } from "./list.customer.usecase"


const customer = CustomerFactory.createWithAddress('John', new Address("Street", 123, "Zip", "City"))
const customer2 = CustomerFactory.createWithAddress('John 2', new Address("Street 2", 222, "Zip 2", "City 2"))


const input = {}

const MockRepository = () => { 
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
    find: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for listing customer use case', () => {
  it('should list all customers', async () => {
    const customerRepository = MockRepository()
    const listCustomersUseCase = new ListCustomersUseCase(customerRepository);

    const output = await listCustomersUseCase.execute(input)

    expect(output.customers).toHaveLength(2);
    expect(output.customers[0].id).toEqual(customer.id)
    expect(output.customers[0].name).toEqual(customer.name)
    expect(output.customers[0].address.street).toEqual(customer.Address.street)

    expect(output.customers[1].id).toEqual(customer2.id)
    expect(output.customers[1].name).toEqual(customer2.name)
    expect(output.customers[1].address.street).toEqual(customer2.Address.street)
  })
})