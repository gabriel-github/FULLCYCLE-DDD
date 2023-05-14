import { ProductRepository } from "./product.repository";
import { Address } from "./../../domain/entity/address";
import { CustomerRepository } from "./customer.repository";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { Customer } from "../../domain/entity/customer";
import { Product } from "../../domain/entity/product";
import { OrderItem } from "../../domain/entity/order_item";
import { Order } from "../../domain/entity/order";
import { OrderRepository } from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderItemModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Custmer 1");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should change a quantity of item into order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Custmer 1");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    order.changeItemQuantity("1", 4);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price, // price of order item after update
          quantity: 4,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1234", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("should findAll orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1234", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      1
    );
    const order = new Order("123", customer.id, [orderItem]);

    const order2 = new Order("1234", customer.id, [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = [order, order2];

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual(orders);
  });
});