import React from 'react'
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react'

import LeftBar from './LeftBar'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/templates/home/Home'

const selectedTheme = 'dark'

export default {
  title: 'Organisms/LeftBar',
  component: LeftBar,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme[selectedTheme]}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof LeftBar>

const Template: ComponentStory<typeof LeftBar> = () => <LeftBar />
const Main = Template.bind({})
Main.args = {} as Meta

export { Main }
