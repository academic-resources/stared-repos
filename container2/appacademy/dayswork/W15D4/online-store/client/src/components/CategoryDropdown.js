import React from 'react'

const CategoryDropdown = (props) => {

  const {onChange, categories} = props

    return (
      <select onChange={onChange}>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
    )
}

export default CategoryDropdown