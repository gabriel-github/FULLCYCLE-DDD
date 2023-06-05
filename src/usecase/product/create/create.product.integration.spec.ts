import { Sequelize } from "sequelize-typescript";
import { CreateProductUseCase } from "./create.product.usecase"
import { ProductModel } from "../../../infra/product/repositories/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repositories/sequelize/product.repository";
import { Product } from "../../../domain/product/entity/product";

describe('Unit test create a product use case', () => {
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

  it('should be create a product', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product 1',
      price: 100
    }

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })
})