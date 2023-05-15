import { EventDispatcher } from "../../@shared/event/event-dispatcher";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { SendConsoleLogFirstHandler } from "./handler/send-console-log-first.handler";
import { SendConsoleLogWhenCustomerChangeAddress } from "./handler/send-console-log-when-customer-change-address.handler";

describe('Domain events customer address changed', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogFirstHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogWhenCustomerChangeAddress();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)
    
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler)

    eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0)
  })

  it('should unregister all events handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogWhenCustomerChangeAddress();



    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)
    
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined()
  })

  it('should notify all events handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogWhenCustomerChangeAddress();


    const spyEnventHandler = jest.spyOn(eventHandler, "handle")


    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)
    
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler)


    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "123",
      nome: "Customer 1",
      endereco: "Street 1, 1, 18970-09, São paulo"
    })

    // Quando o notify for executado o sendMailWhenProductIsCreatedHandle.handle() deve ser chamado
    eventDispatcher.notify(customerAddressChangedEvent)

    expect(spyEnventHandler).toHaveBeenCalled()
  })
})