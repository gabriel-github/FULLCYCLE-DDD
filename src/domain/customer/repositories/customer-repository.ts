import { RepositoryInterface } from "../../@shared/repositories/repository-interface";
import { Customer } from "../entity/customer";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
