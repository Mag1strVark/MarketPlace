import React, { Component } from 'react'
import s from './Order.module.css'
import {FaMinus, FaPlus, FaTrash} from 'react-icons/fa'

class Order extends Component {
    state = {
        quantity: 1
    }

    handleIncrement = () => {
        this.setState((prevState) => ({ quantity: prevState.quantity + 1 }))
    }

    handleDecrement = () => {
        if (this.state.quantity === 1) {
            return;
        }
        this.setState((prevState) => ({ quantity: prevState.quantity - 1 }))
    }

    render() {
        const { item, onDelete } = this.props;
        return (
            <div className={s.item}>
                <img src={item.image} alt="icon"/>
                <h2>{item.title}</h2>
                <div className={s.counter}>
                    <FaMinus className={s.minus} onClick={this.handleDecrement}/>
                    <span className={s.quantity}>{this.state.quantity}</span>
                    <FaPlus className={s.plus} onClick={this.handleIncrement}/>
                </div>
                <b>{item.price * this.state.quantity}$</b>
                <FaTrash className={s.trash} onClick={() => onDelete(item.id)}/>
            </div>
        )
    }
}
export default Order
