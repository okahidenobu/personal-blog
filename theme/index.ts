import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { styles } from './styles'
import { Container } from './components/container'

export const theme = extendTheme({
  colors,
  styles,
  components: {
    Container,
  },
})
