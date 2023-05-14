import React, { Component } from 'react'
import s from './Item.module.css'

class Item extends Component {
    render() {
        const maxLength = 200; // Максимальное количество символов в description

        const description = this.props.item.description.length > maxLength
            ? this.props.item.description.slice(0, maxLength) + '...' // Обрезаем description и добавляем многоточие
            : this.props.item.description;

        return (
            <div className={s.item}>
                <img src={this.props.item.image} alt="icon" onClick={() => this.props.onShowItem(this.props.item)}/>
                <h2>{this.props.item.title}</h2>
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{description}</p>
                <b>{this.props.item.price}$</b>
                <div className={s.addToCart1} onClick={() => this.props.onAdd(this.props.item)}>+</div>
            </div>
        )
    }
}

export default Item;
