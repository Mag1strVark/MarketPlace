import React, { useState, useEffect, useRef } from 'react';
import s from './Header.module.css';
import { FaShoppingBasket } from 'react-icons/fa';
import Order from './Order/Order';
import { useSpring, animated } from 'react-spring';

const showOrders = (props) => {
    const totalPrice = props.orders.reduce((acc, curr) => acc + curr.price * curr.count, 0);
    return (
        <div>
            {props.orders.map((el) => (
                <Order
                    onDelete={props.onDelete}
                    key={el.id}
                    item={el}
                    totalPrice={totalPrice}
                    count={el.count}
                />
            ))}
            <p className={s.summa}>Сумма: {totalPrice}$</p>
        </div>
    );
};


const showNothing = () => {
    return (
        <div className={s.empty}>
            <h2>Товаров нет</h2>
        </div>
    );
};

const Header = (props) => {
    const [cartOpen, setCartOpen] = useState(false);
    const cartRef = useRef(null);
    const styles = useSpring({
        opacity: cartOpen ? 1 : 0,
        transform: cartOpen ? 'translateY(0)' : 'translateY(-100%)',
    });

    useEffect(() => {
        // функция-обработчик клика на странице
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setCartOpen(false);
            }
        };

        // добавление слушателя событий на всю страницу
        document.addEventListener('mousedown', handleClickOutside);

        // удаление слушателя событий при размонтировании компонента
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={s.container}>
            <div className={s.navigation}>
                <span className={s.logo}>MarketPlace</span>
                <div className={s.menu}>
                    <FaShoppingBasket
                        onClick={() => setCartOpen(!cartOpen)}
                        className={cartOpen ? s.cartButtonActive : s.cartButton}
                    />
                    {cartOpen && (
                        <animated.div ref={cartRef} style={styles} className={s.shopCart}>
                            {props.orders.length > 0 ? showOrders(props) : showNothing()}
                        </animated.div>
                    )}
                </div>
            </div>
            <div className={s.presentation}></div>
        </div>
    );
};

export default Header;
