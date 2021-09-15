// @flow

import enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import consoleError from './consoleError'

consoleError()

enzyme.configure({ adapter: new Adapter() })
