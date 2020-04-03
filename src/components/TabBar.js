import React from 'react'

class TabBar extends React.Component {
    render() {
        const { tabs, selected, onClickTab } = this.props
        return (
            <div style={{width: '100%', textAlign: 'center', marginTop: '10px', marginBottom: '20px'}}>
                {tabs.map(tab => 
                    (<div key={tab} className={"tab-button " + (selected === tab ? 'tab-button-selected' : '')}
                        onClick={() => onClickTab(tab)}>{tab}</div>))
                }
            </div>
          )
    }
}

export default TabBar;