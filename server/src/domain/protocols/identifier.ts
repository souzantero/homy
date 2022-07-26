export interface Identifier {
  identify(): Promise<string>
}