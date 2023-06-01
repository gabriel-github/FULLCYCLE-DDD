import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repositories/product-repository.interface";
import { InputListProductUseCase, OutputListProductUseCase } from "./list.product.dto";


export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductUseCase): Promise<OutputListProductUseCase> {
    const products = await this.productRepository.findAll();

    return OutputMapper.toOutput(products)
  }
}

export class OutputMapper {
  static toOutput(productsData: Product[]): OutputListProductUseCase {
    return {
      products: productsData.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}