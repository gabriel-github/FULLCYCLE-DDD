import express, {Request, Response} from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../customer/repositories/sequelize/customer.repository';
import { ListCustomersUseCase } from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.get('/', async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository()
  const usecase = new ListCustomersUseCase(customerRepository);
  try {
    const output = await usecase.execute(req.body);

    res.send(output)
  } catch(err) {
    res.status(500).send(err)
  }

})
customerRoute.post('/', async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository()
  const usecase = new CreateCustomerUseCase(customerRepository);

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      }
    }

    const output = await usecase.execute(customerDto);

    res.send(output)
  } catch(err) {
    res.status(500).send(err)
  }
})