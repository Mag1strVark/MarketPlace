import React, { Component } from 'react'
import s from './Item.module.css'
import { MdFavoriteBorder, MdFavorite} from "react-icons/md";

class Item extends Component {
    constructor(props) {
        super(props);
        this.itemRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside); // listen for clicks on the document
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside); // cleanup the event listener on unmount
    }

    render() {
        const maxLength = 200; // Максимальное количество символов в description

        const description = this.props.item.description.length > maxLength
            ? this.props.item.description.slice(0, maxLength) + '...' // Обрезаем description и добавляем многоточие
            : this.props.item.description;

        return (
            <div className={s.item} ref={this.itemRef}>
                <img src={this.props.item.image} alt="icon" onClick={() => this.props.onShowItem(this.props.item)}/>
                <h2>{this.props.item.title}</h2>
                <p className={s.description}>{description}</p>
                <b>{this.props.item.price}$</b>
                <div className={s.addToCart1} onClick={() => this.props.onAdd(this.props.item)}>+</div>
                <div
                    className={this.props.item.favorite ? s.favoriteIconActive : s.favoriteIcon}
                    onClick={() => this.props.toggleFavorite(this.props.item.id)}
                >
                    {this.props.item.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
                </div>
            </div>
        )
    }
}

export default Item;
