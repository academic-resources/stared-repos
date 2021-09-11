import React from 'react'

class Tabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIdx: 0
        }
    }

    render() {
        const { tabs } = this.props
        let content = tabs.filter((t, i) => i === this.state.tabIdx).map(t => t.content)[0]


        return (
            <div className="tabs-outer">
                <h1>Tabs</h1>
                <ul className="tabs-headings">
                  {
                    tabs.map((t, i) => {
                    return <li className={this.setTitleClass(i)}
                               key={i}
                               onClick={() => this.handleTabClick(i)}
                               ><h1>{t.title}</h1></li>
                    })
                  }
              </ul>
              <article>{content}</article>
            </div>
        )
    }

    setTitleClass(index) {
        if (index === this.state.tabIdx) return 'tab-title selected'
        return 'tab-title unselected'
    }

    handleTabClick(index) {
        this.setState({
            tabIdx: index
        })
    }
}

export default Tabs
