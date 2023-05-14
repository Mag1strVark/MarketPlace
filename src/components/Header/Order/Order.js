import React, { Component } from 'react'
import s from './Order.module.css'
import {FaTrash} from 'react-icons/fa'

class Order extends Component {
    render() {
        return (
            <div className={s.item}>
                <img src={this.props.item.image} alt="icon"/>
                <h2>{this.props.item.title}</h2>
                <b>{this.props.item.price}$</b>
                <FaTrash className={s.trash} onClick={() => this.props.onDelete(this.props.item.id)}/>
            </div>
        )
    }
}

export default Order