const callClientSide = (fn: () => void) => {
  if (typeof window !== 'undefined') {
    fn()
  }
}

export { callClientSide }
