import React, { Component } from 'react'
import s from './ShowItem.module.css'

class ShowItem extends Component {
    render() {
        return (
            <div className={s.fullItem}>
                <div>
                    <img src={this.props.item.img} alt="icon" onClick={() => this.props.onShowItem(this.props.item)}/>
                    <h2>{this.props.item.title}</h2>
                    <p>{this.props.item.desc}</p>
                    <b>{this.props.item.price}$</b>
                    <div className={s.addToCart2} onClick={() => this.props.onAdd(this.props.item)}>+</div>
                </div>
            </div>
        )
    }
}

export default ShowItem