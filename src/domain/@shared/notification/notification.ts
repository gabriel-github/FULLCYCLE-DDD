

export type NotificationErrorProps = {
  message: string;
  context: string;
}

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors
  }

  messages(context?: string): string {
    let message = "";

    this.errors.forEach((error) => {
      if(context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`
      } 
    })

    return message;
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }
}