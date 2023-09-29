function assertValue<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new Error(message ?? 'value is null or undefined')
  }
  return value
}

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}

export { assertValue, assertNever }
