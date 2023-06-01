import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 100);

const input = {
  id: product.id,
  name: 'Product 1 updated',
  price: 150
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test update a product use case', () => {
  it('shoul be update a product', async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input)

    expect(output.id).toEqual(input.id)
    expect(output.name).toEqual(input.name)
    expect(output.price).toEqual(input.price)
  })
})