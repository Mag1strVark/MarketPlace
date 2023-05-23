import React, { Component } from 'react'
import s from './Item.module.css'
import { MdFavoriteBorder, MdFavorite} from "react-icons/md";

class Item extends Component {
    constructor(props) {
        super(props);
        this.itemRef = React.createRef(); // create a reference to the item element
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside); // listen for clicks on the document
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside); // cleanup the event listener on unmount
    }

    handleClickOutside = (event) => {
        const { onClose } = this.props;
        if (this.itemRef.current && !this.itemRef.current.contains(event.target)) { // check if click target is outside the item element
            onClose();
        }
    }

    toggleFavorite = () => {
        const { item } = this.props;
        item.favorite = !item.favorite;
        this.forceUpdate();
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
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{description}</p>
                <b>{this.props.item.price}$</b>
                <div className={s.addToCart1} onClick={() => this.props.onAdd(this.props.item)}>+</div>
                <div
                    className={this.props.item.favorite ? s.favoriteIconActive : s.favoriteIcon}
                    onClick={this.toggleFavorite}
                >
                    {this.props.item.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
                </div>
            </div>
        )
    }
}

export default Item;
