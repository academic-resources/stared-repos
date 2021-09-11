import React from 'react'

export default ({ label, handleThumbSelect, selected }) => {
  return (
    <div className={`board-bg-thumb ${label}`} onClick={handleThumbSelect}>
      {selected ? <i className="fas fa-check" /> : ''}
    </div>
  )
}
