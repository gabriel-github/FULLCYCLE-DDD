import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/entity/value-object/address";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repositories/customer-repository";
import { CustomerModel } from "./customer.model";


export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id } });

      const customer = new Customer(customerModel.id, customerModel.name);
      
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );
      customer.changeAddress(address);

      return customer;
    } catch (err) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();

    const customers = customersModel.map((customer) => {
      const customerResult = new Customer(customer.id, customer.name);
      
      customerResult.addRewardPoints(customer.rewardPoints)

      const address = new Address(
        customer.street,
        customer.number,
        customer.zipcode,
        customer.city
      );

      customerResult.Address = address;

      if (customer.active) {
        customerResult.activate()
      }

      return customerResult;
    });

    return customers;
  }
}
