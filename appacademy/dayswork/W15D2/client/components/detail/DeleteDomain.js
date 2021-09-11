import React from 'react'
import { Mutation } from 'react-apollo'
import Mutations from '../../graphql/mutations'

const { UPDATE_DOMAINS } = Mutations

const DeleteDomain = props => {
  const thisDomain = props.domain
  const domains = props.god.domains.filter(domain => domain !== thisDomain)

  return (
    <Mutation mutation={UPDATE_DOMAINS}>
      {(updateDomain, data) => (
        <div
          onClick={() =>
            updateDomain({
              variables: { id: props.god.id, domains: domains }
            })
          }
        >
          &times;
        </div>
      )}
    </Mutation>
  )
}

export default DeleteDomain
