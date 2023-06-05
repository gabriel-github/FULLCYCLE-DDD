import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repositories/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repositories/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe('Unit test find a product use case', () => {
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

  it('shoul be find a product', async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = new Product('123', 'Product 1', 100)
    await productRepository.create(product)

    const output = await findProductUseCase.execute({id: product.id})

    expect(output.id).toEqual(product.id)
    expect(output.name).toEqual(product.name)
    expect(output.price).toEqual(product.price)
  })
})