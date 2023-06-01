

export interface InputListProductUseCase {

}

type Product = {
  id: string;
  name: string;
  price: number;
}

export interface OutputListProductUseCase {
  products: Product[]
}