import React from 'react'
import PropTypes from 'prop-types'

import {
  Article,
  Audio,
  Book,
  Code,
  Event,
  Instagram,
  JS,
  ReactIcon,
  Tech,
  Video,
} from '../icons'

const IconPicker = (type) => {
  switch (type) {
    case 'audio':
      return <Audio />
    case 'book':
      return <Book />
    case 'code':
      return <Code />
    case 'event':
      return <Event />
    case 'instagram':
      return <Instagram />
    case 'js':
      return <JS />
    case 'react':
      return <ReactIcon />
    case 'tech':
      return <Tech />
    case 'video':
      return <Video />
    default:
      return <Article />
  }
}

const Item = ({ children, type, url }) => (
  <div className="item-container">
    {IconPicker(type)}
    <a href={url}>{children}</a>
  </div>
)

Item.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Item
