import React from 'react';

const teamMember = props => {
    return (
        <div class="oneTeamMember">
            {
                props.teamMembers.map(
                    member => {
                        return (
                            <div key={member.id}>
                                <h1>{member.name}</h1>
                                <h2>{member.role}</h2>
                                <h3>{member.email}</h3>
                            </div>
                        )
                    }

                )
            }
        </div>
)
}