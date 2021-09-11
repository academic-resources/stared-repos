import React from 'react'
import SearchResultsList from './search_results_list'
import { connect } from 'react-redux'

const mstp = state => ({
  searchResults: [] // temp
})

const mdtp = dispatch => ({})

class SearchResultsListButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      open: false
    }
    this.toggleSearchResultsList = this.toggleSearchResultsList.bind(this)
  }

  toggleSearchResultsList() {
    this.setState({
      open: !this.state.open
    })
  }

  handleInputChange(e) {
    // update search input
    // debounce 1sec
    // fire search
  }

  render() {
    const { searchResults } = this.props
    const { open, searchString } = this.state

    return (
      <div className="searchbar-container">
        <div className="searchbar-box">
          <input
            value={searchString}
            onFocus={() => {
              if (!open) this.toggleSearchResultsList()
            }}
            onBlur={() => {
              if (open) this.toggleSearchResultsList()
            }}
            onChange={this.handleInputChange.bind(this)}
          />
          {!open && <span className="magnify" />}
        </div>

        {open && <SearchResultsList searchResults={searchResults} />}
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(SearchResultsListButton)
