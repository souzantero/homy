import { Notifier } from "../../domain/protocols/notifier"
import { useApp } from "../../App"

export function useNotifier(): Notifier {
  const notify = useApp().useNotify()
  return { notify }
}