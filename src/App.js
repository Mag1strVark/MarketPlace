import s from './App.module.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import React from 'react';
import Categories from './components/Main/Categories/Categories';
import ShowItem from './components/Main/ShowItem/ShowItem';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        const storedState = JSON.parse(localStorage.getItem('appState')) || {}; // get the stored state from local storage or initialize with an empty object
        this.state = {
            orders: storedState.orders || [],
            currentItems: storedState.currentItems || [],
            items: null,
            showItem: false,
            fullItem: {},
            currentCategory: storedState.currentCategory || null,
            searchTerm: '',
        };
        this.addToOrder = this.addToOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.chooseCategory = this.chooseCategory.bind(this);
        this.onShowItem = this.onShowItem.bind(this);
    }

    componentDidMount() {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                const items = res.data.map(item => ({...item, favorite: false}))
                this.setState({items}, () => {
                    this.filterItems()
                });
            })
            .catch(function (error) {
                console.log(error)
            });

        window.addEventListener('beforeunload', this.saveStateToLocalStorage)
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveStateToLocalStorage)
    }

    saveStateToLocalStorage = () => {
        const {orders, currentItems, currentCategory, items} = this.state;
        const appState = {orders, currentItems, currentCategory, items};
        localStorage.setItem('appState', JSON.stringify(appState));
    }

    render() {
        return (
            <div className={s.wrapper}>
                <Header
                    orders={this.state.orders}
                    onDelete={this.deleteOrder}
                    searchTerm={this.state.searchTerm}
                    onSearchChange={this.onSearchChange}
                    onUpdate={this.onUpdate}
                />
                <Categories
                    chooseCategory={this.chooseCategory}
                    sortItemsByPrice={this.sortItemsByPrice}
                    onShowItem={this.onShowItem}
                    onSearchChange={this.onSearchChange}
                    searchTerm={this.state.searchTerm}
                />
                <Main
                    onShowItem={this.onShowItem}
                    items={this.state.currentItems}
                    onAdd={this.addToOrder}
                />
                {this.state.showItem &&
                    <ShowItem
                        onShowItem={this.onShowItem}
                        item={this.state.fullItem}
                        onAdd={this.addToOrder}
                    />}
                <Footer/>
                <button className={s.scrollToTopBtn} onClick={this.handleScrollToTop}>↑</button>
                <ToastContainer/>
            </div>
        );
    }

    onShowItem(item) {
        this.setState({fullItem: item});
        this.setState({showItem: !this.state.showItem});
    }

    chooseCategory(category) {
        if (category === "all") {
            this.setState({currentItems: this.state.items, currentCategory: null})
            return;
        } else if (category === "favorite") {
            const favoriteItems = this.state.items.filter((el) => el.favorite)
            this.setState({
                currentCategory: category,
                currentItems: favoriteItems,
            });
        } else {
            this.setState({
                currentCategory: category, // Сохраняем текущую категорию в состоянии компонента
                currentItems: this.state.items.filter((el) => el.category === category),
            });
        }
    }

    sortItemsByPrice = (direction) => {
        if (!this.state.items) {
            return;
        }
        let sortString = direction === "asc" ? "?sort=asc" : "?sort=desc";
        let itemsToSort = this.state.currentItems;
        if (this.state.items && this.state.currentItems.length === this.state.items.length) {
            itemsToSort = this.state.items;
        }
        const sortedItems = [...itemsToSort].sort((a, b) => {
            if (direction === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        // Фильтруем все товары по текущему поисковому запросу
        const filteredItems = sortedItems.filter((el) => {
            return !this.state.searchTerm || el.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
        });
        // Если установлена текущая категория, то фильтруем товары также по ней
        let filteredAndCategorizedItems = [];
        if (this.state.currentCategory === "favorite") {
            filteredAndCategorizedItems = filteredItems.filter((el) => {
                return el.favorite === true;
            });
        } else {
            filteredAndCategorizedItems = filteredItems.filter((el) => {
                return !this.state.currentCategory || el.category === this.state.currentCategory;
            });
        }
        this.setState({
            currentItems: filteredAndCategorizedItems
        });
    }

    deleteOrder(id) {
        this.setState({orders: this.state.orders.filter(el => el.id !== id)});
        toast.success('Order deleted successfully!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    addToOrder(item) {
        let isInArray = false;
        const updatedOrders = this.state.orders.map(el => {
            if (el.id === item.id) {
                isInArray = true;
                return {...el, count: el.count + 1};
            } else {
                return el;
            }
        });
        if (!isInArray) {
            const newItem = {...item, count: 1};
            this.setState({orders: [...this.state.orders, newItem]});
            toast.success('Order added successfully!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            this.setState({orders: updatedOrders});
            toast.success('Item count updated successfully!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    onSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({searchTerm}, () => {
            this.filterItems();
        });
    }

    filterItems = () => {
        let filteredItems = [];
        if (this.state.searchTerm !== '') {
            filteredItems = this.state.items.filter(item =>
                item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            );
        } else {
            filteredItems = this.state.items;
        }
        this.setState({currentItems: filteredItems});
    }

    onUpdate = (updatedItem) => {
        const {orders} = this.state;
        const updatedOrders = orders.map(item => {
            if (item.id === updatedItem.id) {
                return updatedItem;
            }
            return item;
        });
        const count = updatedOrders.reduce((total, item) => total + item.count, 0); // calculate the new count based on the updated orders
        this.setState({orders: updatedOrders, count: count}); // set the updated orders and count in state
    };

    handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

export default App;
