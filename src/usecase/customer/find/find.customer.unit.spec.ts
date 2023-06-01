import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/entity/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City")
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit Test find customer use case', () => {

  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123',
    }

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: 'Zip'
      }
    }

    const result = await findCustomerUseCase.execute(input);

    expect(result).toStrictEqual(output)
  })

  it('should not find a customer', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found")
    })
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123',
    }

    expect(() => {
      return findCustomerUseCase.execute(input)
    }).rejects.toThrow("Customer not found")

  })
})