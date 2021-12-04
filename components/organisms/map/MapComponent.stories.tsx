import React from 'react'
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react'

import Map from './MapComponent'

export default {
  title: 'Organisms/Map',
  component: Map,
} as ComponentMeta<typeof Map>

const Template: ComponentStory<typeof Map> = () => <Map />
const Main = Template.bind({})
Main.args = {} as Meta

export { Main }
