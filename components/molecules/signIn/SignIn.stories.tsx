import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SignIn from './SignIn'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/templates/home/Home'

const selectedTheme = 'dark'

export default {
  title: 'Molecules/SignIn',
  component: SignIn,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme[selectedTheme]}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof SignIn>

const Template: ComponentStory<typeof SignIn> = () => <SignIn />
const Main = Template.bind({})
Main.args = {}

export { Main }
