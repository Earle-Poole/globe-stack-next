import React from 'react'
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react'

import UIOverlay from './UIOverlay'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/templates/home/Home'

const selectedTheme = 'dark'

export default {
  title: 'Organisms/UIOverlay',
  component: UIOverlay,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme[selectedTheme]}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof UIOverlay>

const Template: ComponentStory<typeof UIOverlay> = () => <UIOverlay />
const Main = Template.bind({})
Main.args = {} as Meta

export { Main }
