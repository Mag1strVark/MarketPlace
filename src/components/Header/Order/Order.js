import React, { Component } from 'react'
import s from './Order.module.css'
import {FaMinus, FaPlus, FaTrash} from 'react-icons/fa'

class Order extends Component {

    handleIncrement = () => {
        const { item, onUpdate } = this.props;
        onUpdate({...item, count: item.count + 1});
    }

    handleDecrement = () => {
        const { item, onUpdate } = this.props;
        if (item.count === 1) {
            return;
        }
        onUpdate({...item, count: item.count - 1});
    }

    render() {
        const { item, onDelete } = this.props;
        const totalPrice = item.price * item.count;
        const formattedPrice = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        return (
            <div className={s.item}>
                <img src={item.image} alt="icon"/>
                <h2>{item.title}</h2>
                <div className={s.counter}>
                    <FaMinus className={s.minus} onClick={this.handleDecrement}/>
                    <span className={s.quantity}>{item.count}</span>
                    <FaPlus className={s.plus} onClick={this.handleIncrement}/>
                </div>
                <b>{formattedPrice}</b>
                <FaTrash className={s.trash} onClick={() => onDelete(item.id)}/>
            </div>
        )
    }
}

export default Order
