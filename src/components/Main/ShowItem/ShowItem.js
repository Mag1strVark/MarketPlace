import React, { Component } from 'react'
import s from './ShowItem.module.css'
import { GrClose } from 'react-icons/gr'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

class ShowItem extends Component {
    toggleFavorite = () => {
        const { item } = this.props;
        item.favorite = !item.favorite;
        this.forceUpdate();
    }

    render() {
        return (
            <div className={s.fullItem}>
                <div>
                    <button className={s.closeButton} onClick={() => this.props.onShowItem(this.props.item)}><GrClose /></button>
                    <img src={this.props.item.image} alt="icon" />
                    <div className={s.info}>
                        <h2>{this.props.item.title}</h2>
                        <p>{this.props.item.description}</p>
                        <b>{this.props.item.price}$</b>
                        <div
                            className={this.props.item.favorite ? s.favoriteIconActive : s.favoriteIcon}
                            onClick={this.toggleFavorite}
                        >
                            {this.props.item.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
                        </div>
                        <div className={s.addToCart2} onClick={() => this.props.onAdd(this.props.item)}>+</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowItem
