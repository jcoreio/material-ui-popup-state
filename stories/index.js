import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Hello from '../src/index'

storiesOf('react-library-skeleton', module)
  .add('Hello', () => (
    <Hello />
  ))
