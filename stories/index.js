import React from 'react'
import { storiesOf } from '@storybook/react'
import Hello from '../src/index'

storiesOf('react-library-skeleton', module)
  .add('Hello', () => (
    <Hello />
  ))
