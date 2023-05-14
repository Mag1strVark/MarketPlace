import React, { useState } from 'react'
import s from './Header.module.css'
import { FaShoppingBasket } from 'react-icons/fa'
import Order from './Order/Order'

const showOrders = (props) => {
    let summa = 0
    props.orders.forEach(el => summa += Number.parseFloat(el.price))
    return (<div>
        {props.orders.map(el => (
            <Order onDelete={props.onDelete} key={el.id} item={el}/>
        ))}
        <p className={s.summa}>Сумма: {new Intl.NumberFormat().format(summa)}$</p>
    </div>)
}

const showNothing = () =>{
    return(
        <div className={s.empty}>
            <h2>Товаров нет</h2>
        </div>
    )
}

const Header = (props) => {
    let [cartOpen, setCartOpen] = useState(false)

    return (
        <div className={s.container}>
            <div className={s.navigation}>
                <span className={s.logo}>Logo</span>
                <div className={s.menu}>
                    <FaShoppingBasket onClick={() => setCartOpen(cartOpen = !cartOpen)}
                                      className={cartOpen ? s.cartButtonActive : s.cartButton}/>
                    {cartOpen && (
                        <div className={s.shopCart}>
                            {props.orders.length > 0 ? showOrders(props) : showNothing()}
                        </div>
                    )}
                </div>
            </div>
            <div className={s.presentation}></div>
        </div>
    )
}

export default Header
