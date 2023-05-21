import React, { Component } from 'react'
import s from './Order.module.css'
import {FaTrash} from 'react-icons/fa'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    incrementCount = () => {
        this.setState({count: this.state.count + 1});
    }

    decrementCount = () => {
        if (this.state.count > 0) {
            this.setState({count: this.state.count - 1});
        }
    }

    render() {
        return (
            <div className={s.item}>
                <img src={this.props.item.image} alt="icon"/>
                <h2>{this.props.item.title}</h2>
                <b>{this.props.item.price}$</b>
                <div className={s.counter}>
                    <button onClick={this.decrementCount}>-</button>
                    <span>{this.state.count}</span>
                    <button onClick={this.incrementCount}>+</button>
                </div>
                <FaTrash className={s.trash} onClick={() => this.props.onDelete(this.props.item.id)}/>
            </div>
        )
    }
}

export default Order
