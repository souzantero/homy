export interface Notifier {
  notify(params: Notifier.Params): void
}

export namespace Notifier {
  export type Status = 'error' | 'success' 
  export type Params = {
    status: Status
    title: string
    description: string
  }
}