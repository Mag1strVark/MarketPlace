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
        this.state = {
            orders: [],
            currentItems: [],
            items: null,
            showItem: false,
            fullItem: {},
            currentCategory: null,
            searchTerm: '',
            favoriteItems: false
        };
        this.addToOrder = this.addToOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.chooseCategory = this.chooseCategory.bind(this);
        this.onShowItem = this.onShowItem.bind(this);
    }

    componentDidMount() {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                const items = res.data;
                this.setState({ items, currentItems: items });
            })
            .catch(function (error){
                console.log(error);
            });
    }

    render() {
        return (
            <div className={s.wrapper}>
                <Header
                    orders={this.state.orders}
                    onDelete={this.deleteOrder}
                    searchTerm={this.state.searchTerm}
                    onSearchChange={this.onSearchChange}
                />
                <Categories
                    chooseCategory={this.chooseCategory}
                    sortItemsByPrice={this.sortItemsByPrice}
                    onShowItem={this.onShowItem}
                    onSearchChange={this.onSearchChange}
                    searchTerm={this.state.searchTerm}
                    favoriteItems={this.state.favoriteItems}
                />
                <Main
                    onShowItem={this.onShowItem}
                    items={this.state.currentItems}
                    onAdd={this.addToOrder}
                    favoriteStatus={this.favoriteStatus}
                    favoriteItems={this.state.favoriteItems}
                />
                {this.state.showItem &&
                    <ShowItem
                        onShowItem={this.onShowItem}
                        item={this.state.fullItem}
                        onAdd={this.addToOrder}
                        favoriteStatus={this.favoriteStatus}
                        favoriteItems={this.state.favoriteItems}
                    />}
                <Footer/>
                <button className={s.scrollToTopBtn} onClick={this.handleScrollToTop}>↑</button>
                <ToastContainer />
            </div>
        );
    }

    onShowItem(item) {
        this.setState({fullItem: item});
        this.setState({showItem: !this.state.showItem});
    }

    chooseCategory(category) {
        if (category === "all") {
            this.setState({ currentItems: this.state.items, currentCategory: null, favoriteItems: false }); // Обнуляем текущую категорию при выборе всех товаров
            return;
        }
        if (category === "favorite") {
            const favoriteItems = this.state.items.filter((el) => el.favorite);
            this.setState({
                currentItems: favoriteItems,
                currentCategory: category,
                favoriteItems: true
            });
            return;
        }
        this.setState({
            currentCategory: category, // Сохраняем текущую категорию в состоянии компонента
            currentItems: this.state.items.filter((el) => el.category === category),
            favoriteItems: false
        });
    }

    sortItemsByPrice = (direction) => {
        let sortString = direction === "asc" ? "?sort=asc" : "?sort=desc";
        let itemsToSort = this.state.currentItems;
        if (this.state.items && this.state.currentItems.length === this.state.items.length) {
            itemsToSort = this.state.items;
        }
        axios.get(`https://fakestoreapi.com/products${sortString}&price`)
            .then(res => {
                const sortedItems = res.data;
                // Фильтруем все товары по текущему поисковому запросу
                const filteredItems = sortedItems.filter((el) => {
                    return !this.state.searchTerm || el.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
                });
                // Если установлена текущая категория, то фильтруем товары также по ней
                const filteredAndCategorizedItems = filteredItems.filter((el) => {
                    return !this.state.currentCategory || el.category === this.state.currentCategory;
                });
                this.setState({
                    currentItems: filteredAndCategorizedItems
                });
            })
            .catch(error => console.error(error));
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
        this.state.orders.forEach(el => {
            if (el.id === item.id)
                isInArray = true;
        });
        if (!isInArray) {
            this.setState({orders: [...this.state.orders, item]});
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
            toast.success('This order is already in the cart!', {
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

    favoriteStatus(item){
        item.favorite = !item.favorite;
        const newItems = [...this.state.items];
        const index = newItems.findIndex(el => el.id === item.id);
        newItems[index] = item;
        const filteredItems = newItems.filter((el) => {
            return !this.state.searchTerm || el.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
        });
        const filteredAndCategorizedItems = filteredItems.filter((el) => {
            return !this.state.currentCategory || el.category === this.state.currentCategory;
        });
        this.setState({
            items: newItems,
            currentItems: filteredAndCategorizedItems,
        });
    }

    onSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm }, () => {
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
        this.setState({ currentItems: filteredItems });
    }

    handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

export default App;
