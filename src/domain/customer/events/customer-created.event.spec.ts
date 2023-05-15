import { EventDispatcher } from "../../@shared/event/event-dispatcher";
import { CustomerCreatedEvent } from "./customer-created.event";
import { SendConsoleLogFirstHandler } from "./handler/send-console-log-first.handler";
import { SendConsoleLogSecondHandler } from "./handler/send-console-log-second.handler";

describe('Domain events customer created', () => {
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
    const eventHandler = new SendConsoleLogFirstHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler)
    
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0)
  })

  it('should unregister all events handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogFirstHandler();


    eventDispatcher.register("CustomerCreatedEvent", eventHandler)
    
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined()
  })

  it('should notify all events handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogFirstHandler();
    const eventHandler2 = new SendConsoleLogSecondHandler();

    const spyEnventHandler = jest.spyOn(eventHandler, "handle")
    const spyEnventHandler2 = jest.spyOn(eventHandler2, "handle")


    eventDispatcher.register("CustomerCreatedEvent", eventHandler)
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
    
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2)


    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      nome: "Customer 1",
      endereco: "Street 1, 1, 18970-09, São paulo"
    })

    // Quando o notify for executado o sendMailWhenProductIsCreatedHandle.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEnventHandler).toHaveBeenCalled()
    expect(spyEnventHandler2).toHaveBeenCalled()
  })
})