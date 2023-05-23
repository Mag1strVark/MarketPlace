import React, { Component } from 'react'
import s from './Main.module.css'
import Item from './Item/Item'

class Main extends Component {
    render() {
        return (
            <div className={s.container}>
                {this.props.items.map(el => (
                    <Item
                        onShowItem={this.props.onShowItem}
                        key={el.id}
                        item={el}
                        onAdd={this.props.onAdd}
                        toggleFavorite={this.props.toggleFavorite}
                    />
                ))}
            </div>
        )
    }
}

export default Main 