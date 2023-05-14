import { OrderItem } from "./order_item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Item qtd must be grater then 0");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greather then 0");
    }

    return true;
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  total(): number {
    const totalPrice = this._items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return totalPrice
  }

  changeItemQuantity(itemId: string, quantity: number) {
    const itemIndex = this._items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) throw new Error("Item not found");

    this._items[itemIndex].changeQuantity(quantity);
    this._total = this.total()
  }
}
