import React from 'react'
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react'

import Coords from './Coords'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/templates/home/Home'

const selectedTheme = 'dark'

export default {
  title: 'Molecules/Coords',
  component: Coords,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme[selectedTheme]}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof Coords>

const Template: ComponentStory<typeof Coords> = () => <Coords />
const Main = Template.bind({})
Main.args = {} as Meta

export { Main }
