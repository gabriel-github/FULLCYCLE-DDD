import { v4 as uuid } from "uuid";
import { CustomerRepositoryInterface } from "../../../domain/customer/repositories/customer-repository";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/entity/value-object/address";


export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) { }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zip, input.address.city))

    await this.customerRepository.create(customer);

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