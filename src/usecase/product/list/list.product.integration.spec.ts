import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repositories/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repositories/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";


describe('Unit test list all products', () => {
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

  it('should be able list all products', async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const product = new Product('123', 'Product 1', 100);
    const product2 = new Product('1234', 'Product 2', 200);

    await productRepository.create(product)
    await productRepository.create(product2)

    const output = await listProductUseCase.execute({});

    expect(output.products).toHaveLength(2);
    expect(output.products[0].id).toEqual(product.id)
    expect(output.products[0].name).toEqual(product.name)
    expect(output.products[0].price).toEqual(product.price)

    expect(output.products[1].id).toEqual(product2.id)
    expect(output.products[1].name).toEqual(product2.name)
    expect(output.products[1].price).toEqual(product2.price)
  })
})