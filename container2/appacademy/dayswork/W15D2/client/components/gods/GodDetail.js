import React from 'react'
import { Query } from 'react-apollo'
import Queries from '../../graphql/queries'
import NameDetail from '../detail/NameDetail'
import TypeDetail from '../detail/TypeDetail'
import DescriptionDetail from '../detail/DescriptionDetail'
import DomainDetail from '../detail/DomainDetail'

const { FETCH_GOD } = Queries

const GodDetail = props => {
  return (
    <Query query={FETCH_GOD} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading || !data) return <p>Loading...</p>
        if (error) return <p>Error</p>
        const { god } = data
        return (
          <div className="detail">
            <NameDetail id={god.id} god={god} />
            <TypeDetail id={god.id} god={god} />
            <DescriptionDetail id={god.id} god={god} />
            <DomainDetail id={god.id} god={god} />
            <p>abode: {god.abode.name}</p>
            <p>
              emblems:
              {god.emblems.map(emblem => {
                return <span key={emblem.id}>{emblem.name}</span>
              })}
            </p>
            <p>
              parents:
              {god.parents.map(parent => {
                return <span key={parent.id}>{parent.name}</span>
              })}
            </p>
            <p>
              children:
              {god.children.map(child => {
                return <span key={child.id}>{child.name}</span>
              })}
            </p>
            <p>
              siblings:
              {god.siblings.map(sibling => {
                return <span key={sibling.id}>{sibling.name}</span>
              })}
            </p>
          </div>
        )
      }}
    </Query>
  )
}

export default GodDetail
