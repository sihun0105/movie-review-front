type ProviderType = 'google'

function isProviderType(arg: any): arg is ProviderType {
  return arg === 'google'
}

function assertProviderType(arg: any): asserts arg is ProviderType {
  if (!isProviderType(arg)) {
    throw new Error('Invalid provider')
  }
}

export { assertProviderType }
