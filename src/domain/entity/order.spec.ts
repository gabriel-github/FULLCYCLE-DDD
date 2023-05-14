import { Order } from "./order";
import { OrderItem } from "./order_item";


describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", [])
    }).toThrowError("Id is required")
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", [])
    }).toThrowError("CustomerId is required")
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", [])
    }).toThrowError("Item qtd must be grater then 0")
  });

  it("should calculate total", () => {
    const item = new OrderItem("I1", "Item 1", 100, "p1", 2)
    const item2 = new OrderItem("I2", "Item 2", 200, "p2", 2)

    const order = new Order("O1", "C1", [item])

    let total = order.total()

    expect(total).toBe(200)


    const order2 = new Order("O1", "C1", [item, item2])

    total = order2.total()

    expect(total).toBe(600)
  });

  it("should throw error if the item quantity is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("I1", "Item 1", 100, "p1", 0)

      const order = new Order("O1", "C1", [item])
    }).toThrowError("Quantity must be greather then 0")
  });
});
