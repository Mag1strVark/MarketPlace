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
            fullItem: {}
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
                <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
                <Categories chooseCategory={this.chooseCategory}/>
                <Main onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
                {this.state.showItem && <ShowItem onShowItem={this.onShowItem} item={this.state.fullItem}  onAdd={this.addToOrder}/>}
                <Footer/>
                <ToastContainer />
            </div>
        );
    }

    onShowItem(item) {
        this.setState({fullItem: item});
        this.setState({showItem: !this.state.showItem});
    }

    chooseCategory(category) {
        if(category === 'all'){
            this.setState({currentItems: this.state.items});
            return;
        }
        this.setState({
            currentItems: this.state.items.filter(el => el.category === category)
        });
    }

    deleteOrder(id) {
        this.setState({orders: this.state.orders.filter(el => el.id !== id)});
        toast.success("Order deleted successfully!");
    }

    addToOrder(item) {
        let isInArray = false;
        this.state.orders.forEach(el => {
            if (el.id === item.id)
                isInArray = true;
        });
        if (!isInArray) {
            this.setState({orders: [...this.state.orders, item]});
            toast.success("Order added successfully!");
        } else {
            toast.success("This order is already in the cart!");
        }
    }
}

export default App;
