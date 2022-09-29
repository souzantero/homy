export interface Decrypter {
  decrypt<T = any>(ciphertext: string): Promise<T>
}
