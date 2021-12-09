import React from 'react'
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react'

import LeftDrawer from './LeftDrawer'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/templates/home/Home'

const selectedTheme = 'dark'

export default {
  title: 'Molecules/LeftDrawer',
  component: LeftDrawer,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme[selectedTheme]}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof LeftDrawer>

const Template: ComponentStory<typeof LeftDrawer> = () => <LeftDrawer />
const Main = Template.bind({})
Main.args = {} as Meta

export { Main }
