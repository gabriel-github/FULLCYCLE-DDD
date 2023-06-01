import { Address } from "../../../domain/customer/entity/value-object/address";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address("Street", 123, "Zip", "City"))

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: "Street updated",
    number: 1234,
    zip: "Zip updated",
    city: "City updated"
  }
}

const MockRepository = () => { 
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe('Unit test for customer update use case', () => {

  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})