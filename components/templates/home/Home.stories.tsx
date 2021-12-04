import React from 'react'
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react'

import Home from './Home'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/templates/home/Home'

const selectedTheme = 'dark'

export default {
  title: 'Templates/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme[selectedTheme]}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = () => <Home />
const Main = Template.bind({})
Main.args = {} as Meta

export { Main }
