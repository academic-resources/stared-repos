import React, { Component } from 'react'

import Layout from '../components/layout'
import FiveList from '../components/five-list'
import PeopleList from '../components/people-list'

import data from '../shared/dummyData'
import { DanAbramov, KevinRose, QuincyLarson, TimFerris, VeniKunche } from '../images'

export default class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 2,
      items: [
        TimFerris,
        QuincyLarson,
        KevinRose,
        VeniKunche,
        DanAbramov,
      ],
      curators: []
    }
  }

  componentDidMount() {
    const curators = Object.keys(data).reduce((arr, curator) => arr.push(data[curator]) && arr, [])
    this.setState({ curators })
  }

  currentCurator = () => {
    const { curators, selectedIndex } = this.state
    const current = curators.find((_, i) => i === selectedIndex)
    if (current) {
      const { name, recs } = current
      return <FiveList key={name} recs={recs} />
    }
    return
  }

  clickHandler = (i) => {
    const selectedIndex = this.state.items.indexOf(i)
    this.setState({ selectedIndex })
  }

  render() {
    const { items, selectedIndex } = this.state
    return (
      <Layout>
        <PeopleList items={items} selectedIndex={selectedIndex} clickHandler={this.clickHandler} />
        {this.currentCurator()}
      </Layout>
    )
  }
}
