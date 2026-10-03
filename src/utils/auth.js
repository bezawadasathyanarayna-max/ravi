const ITERATIONS = 120_000

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function fromHex(value) {
  return new Uint8Array(value.match(/.{2}/g).map((part) => Number.parseInt(part, 16)))
}

export function publicUser(user) {
  const { password, passwordHash, passwordSalt, ...profile } = user
  return profile
}

export function storedUser(user) {
  const { password, ...account } = user
  return account
}

export async function hashPassword(password, saltHex = toHex(crypto.getRandomValues(new Uint8Array(16)))) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: fromHex(saltHex), iterations: ITERATIONS, hash: 'SHA-256' }, key, 256)
  return { passwordSalt: saltHex, passwordHash: toHex(new Uint8Array(bits)) }
}

export async function verifyPassword(password, salt, expectedHash) {
  const result = await hashPassword(password, salt)
  return result.passwordHash === expectedHash
}
