import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { FindProductUseCase } from "./find.product.usecase";


const product = ProductFactory.create('a', 'Product 1', 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test find a product use case', () => {
  it('shoul be find a product', async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const output = await findProductUseCase.execute({id: product.id})

    expect(output.id).toEqual(product.id)
    expect(output.name).toEqual(product.name)
    expect(output.price).toEqual(product.price)
  })
})