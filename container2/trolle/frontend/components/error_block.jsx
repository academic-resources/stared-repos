import React from 'react'

export default ({ errors }) => (
  <ul className="error-block">
    {errors.map((err, i) => (
      <li key={i}>{err}</li>
    ))}
  </ul>
)
