import { RepositoryInterface } from "../../@shared/repositories/repository-interface";
import { Product } from "../entity/product";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}