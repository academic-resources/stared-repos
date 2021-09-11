import React from 'react'
import { Transition, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

import './people.css'

const PeopleList = ({ items, clickHandler, selectedIndex }) => (
  <div className="peopleList">
    <Transition
      native
      items={items}
      config={{ ...config.default, precision: 0.01 }}
      from={{ opacity: 0 }}
      enter={[{ opacity: 1 }]}
      leave={[{ opacity: 0.5 }]}
    >
      {(item) => (props) =>
        (
          <animated.div
            key={item}
            style={props}
            className={`person${
              items.indexOf(item) === selectedIndex ? ' person__selected' : ''
            }`}
            onClick={() => clickHandler(item)}
          >
            <img alt="curator" src={item} />
          </animated.div>
        )}
    </Transition>
  </div>
)

PeopleList.propTypes = {
  items: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
}

export default PeopleList
