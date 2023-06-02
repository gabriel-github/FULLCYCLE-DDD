import express, {Request, Response} from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../customer/repositories/sequelize/customer.repository';
import { ListCustomersUseCase } from '../../../usecase/customer/list/list.customer.usecase';
import { ProductRepository } from '../../product/repositories/sequelize/product.repository';
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase';
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.get('/', async (req: Request, res: Response) => {
  const productRepository = new ProductRepository()
  const usecase = new ListProductUseCase(productRepository);
  
  try {
    const output = await usecase.execute(req.body);
    res.send(output)
  } catch(err) {
    res.status(500).send(err)
  }

})
productRoute.post('/', async (req: Request, res: Response) => {
  const productRepository = new ProductRepository()
  const usecase = new CreateProductUseCase(productRepository);

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price
    }

    const output = await usecase.execute(productDto);

    res.send(output)
  } catch(err) {
    res.status(500).send(err)
  }
})