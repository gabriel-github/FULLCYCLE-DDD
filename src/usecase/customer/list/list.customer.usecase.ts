import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repositories/customer-repository";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";


export class ListCustomersUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) { }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

   return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customersData: Customer[]): OutputListCustomerDto {
    return {
      customers: customersData.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city
        }
      }))
    }
  }
}