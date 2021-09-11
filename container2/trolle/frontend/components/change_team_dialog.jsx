import React from 'react'

export default ({
  team_id,
  teamOptions,
  close,
  showTeamDialog,
  handleTeamSelect,
  changeTeam,
  showCreateTeam
}) => {
  const title = team_id === -1 ? 'Add to a Team' : 'Change Team'
  return (
    <div className="changing-team">
      <div className="top-row">
        <i onClick={showTeamDialog} className="fas fa-chevron-left back" />
        <div className="title">{title}</div>
        <i onClick={close} className="fas fa-times close" />
      </div>
      <div className="part-of">This board is part of...</div>
      <select value={team_id} onChange={handleTeamSelect}>
        {teamOptions.map(o => (
          <option key={o.id} value={o.id}>
            {o.title}
          </option>
        ))}
        >
      </select>
      <div className="bottom-row">
        <div onClick={changeTeam} className="change-btn">
          Change
        </div>
        <div onClick={showCreateTeam} className="create-link">
          Create Team
        </div>
      </div>
    </div>
  )
}
