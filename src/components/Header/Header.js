import React, {useState} from 'react'
import s from './Header.module.css'
import {FaShoppingBasket} from 'react-icons/fa'
import Order from './Order/Order'
import axios from "axios";

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

const showNothing = () => {
    return (
        <div className={s.empty}>
            <h2>Товаров нет</h2>
        </div>
    )
}


const Header = (props) => {
    let [cartOpen, setCartOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');

    const [suggestedItems, setSuggestedItems] = useState([]);
    const onInputChange = (event) => {
        const searchTermValue = event.target.value;
        setSearchTerm(searchTermValue);
        if (searchTermValue.length > 0) {
            axios.get(`https://fakestoreapi.com/products?title_like=${searchTermValue}`)
                .then(res => {
                    setSuggestedItems(res.data);
                })
                .catch(error => console.error(error));
        } else {
            setSuggestedItems([]);
        }
    };

    return (
        <div className={s.container}>
            <div className={s.navigation}>
                <span className={s.logo}>MarketPlace</span>
                <div className={s.search}>
                    <input type="text" placeholder="Search" value={searchTerm} className={s.searchInput} onChange={onInputChange} />
                    {suggestedItems.length > 0 &&
                        <div className={s.suggestedItems}>
                            {suggestedItems.map(item => (
                                <div key={item.id} className={s.suggestedItem} onClick={() => {
                                    setSearchTerm(item.title);
                                    props.onSearchChange({target: {value: item.title}});
                                    setSuggestedItems([]);
                                }}>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    }
                </div>
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
