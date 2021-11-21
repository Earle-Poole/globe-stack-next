import useUIStore from '@/components/organisms/ui-overlay/uiStore'

const callClientSide = (fn: () => void) => {
  if (typeof window !== 'undefined') {
    fn()
  }
}

// accepts a number that represents meters. returns a that number converted to km or mi, based on useUIStore's uom
const useConvertMetersToKmOrMi = (meters: number) => {
  const uom = useUIStore((state) => state.uom)
  const conversion = uom === 'mi' ? 0.000621371 : 0.001
  return meters * conversion
}

export { callClientSide, useConvertMetersToKmOrMi }
