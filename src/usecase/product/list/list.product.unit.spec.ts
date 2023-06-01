import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 100);
const product2 = ProductFactory.create('a', 'Product 2', 200);


const input = {}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test list all products', () => {
  it('should be able list all products', async () => {
    const productRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const output = await listProductUseCase.execute(input);

    expect(output.products).toHaveLength(2);
    expect(output.products[0].id).toEqual(product.id)
    expect(output.products[0].name).toEqual(product.name)
    expect(output.products[0].price).toEqual(product.price)

    expect(output.products[1].id).toEqual(product2.id)
    expect(output.products[1].name).toEqual(product2.name)
    expect(output.products[1].price).toEqual(product2.price)
  })
})