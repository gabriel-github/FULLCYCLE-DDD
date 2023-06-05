import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repositories/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repositories/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";

describe('Unit test update a product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      ProductModel
    ]);
    await sequelize.sync();
  }, 10000);

  afterEach(async () => {
    await sequelize.close();
  });

  it('shoul be update a product', async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product('123', 'Product 1', 100);

    await productRepository.create(product)

    const input = {
      id: product.id,
      name: 'Product 1 updated',
      price: 150
    }

    const output = await updateProductUseCase.execute(input)

    expect(output.id).toEqual(input.id)
    expect(output.name).toEqual(input.name)
    expect(output.price).toEqual(input.price)
  })
})