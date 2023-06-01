import { Address } from "../../../domain/customer/entity/value-object/address";
import { CustomerRepositoryInterface } from "../../../domain/customer/repositories/customer-repository";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";


export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) { }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    if (!customer) {
      throw new Error('Customer not found')
    }


    customer.changeName(input.name),
    customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))
    await this.customerRepository.update(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city
      }
    }
  }

}