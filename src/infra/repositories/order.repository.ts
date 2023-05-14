import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export class OrderRepository {
  async create(entity: Order): Promise<void> {
    const orderModdel = await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    for (const item of entity.items) {
      await OrderItemModel.update(
        {
          quantity: item.quantity,
          price: item.price,
        },
        {
          where: {
            id: item.id,
          },
        }
      );
    }

    await OrderModel.update(
      {
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: CustomerModel }, { model: OrderItemModel }],
    });

    if (orderModel && orderModel.customer && orderModel.items) {
      const customer = new Customer(
        orderModel.customer_id,
        orderModel.customer.name
      );

      const address = new Address(
        orderModel.customer.street,
        orderModel.customer.number,
        orderModel.customer.zipcode,
        orderModel.customer.city
      );

      customer.changeAddress(address);

      const orderItems = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });

      const order = new Order(
        orderModel.id,
        customer.id,
        orderItems,
      );

      return order;
    }
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [{ model: CustomerModel }, { model: OrderItemModel }],
    });

    const orders = ordersModel.map(orderModel => {
      if (orderModel && orderModel.customer && orderModel.items) {
        const customer = new Customer(
          orderModel.customer_id,
          orderModel.customer.name
        );
  
        const address = new Address(
          orderModel.customer.street,
          orderModel.customer.number,
          orderModel.customer.zipcode,
          orderModel.customer.city
        );
  
        customer.changeAddress(address);
  
        const orderItems = orderModel.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
        });
  
        const order = new Order(
          orderModel.id,
          customer.id,
          orderItems,
        );
  
        return order;
      }
    })

    return orders
  }
}
