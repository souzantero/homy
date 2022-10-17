export type Message = {
  status: 'success' | 'error'
  title: string
  description: string
}

export type Notify = (message: Message) => void

export interface Notifier {
  notify: Notify
}
