import { ComponentSingleStyleConfig } from '@chakra-ui/react'

export const Container: ComponentSingleStyleConfig = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    full: {
      px: 0,
      maxW: '100%',
    },
    default: {
      maxW: '1100px',
    },
    narrow: {
      maxW: '888px',
    },
  },
  // Styles for the visual style variations
  variants: {},
}
