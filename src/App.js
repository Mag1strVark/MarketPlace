import s from './App.module.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import React from 'react'
import white_room from '../src/assets/img/white_room.jpg'
import Categories from './components/Main/Categories/Categories'
import ShowItem from './components/Main/ShowItem/ShowItem'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            currentItems: [],
            items: [
                {
                    id: 1,
                    title: 'Стул 1',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'chairs',
                    price: '49.99'
                },
                {
                    id: 2,
                    title: 'Стол 2',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'tables',
                    price: '29.99'
                },
                {
                    id: 3,
                    title: 'Диван 3',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'sofa',
                    price: '149.99'
                },
                {
                    id: 4,
                    title: 'Стул 4',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'chairs',
                    price: '49.99'
                },
                {
                    id: 5,
                    title: 'Стол 5',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'tables',
                    price: '29.99'
                },
                {
                    id: 6,
                    title: 'Диван 6',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'sofa',
                    price: '149.99'
                },
                {
                    id: 7,
                    title: 'Стул 7',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'chairs',
                    price: '49.99'
                },
                {
                    id: 8,
                    title: 'Стол 8',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'tables',
                    price: '29.99'
                },
                {
                    id: 9,
                    title: 'Диван 9',
                    img: white_room,
                    desc: 'Lorem ipsum dolor sit amet',
                    category: 'sofa',
                    price: '149.99'
                }
            ],
            showItem: false,
            fullItem: {}
        }
        this.state.currentItems = this.state.items
        this.addToOrder = this.addToOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.chooseCategory = this.chooseCategory.bind(this)
        this.onShowItem = this.onShowItem.bind(this)
    }

    render() {
        return (
            <div className={s.wrapper}>
                <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
                <Categories chooseCategory={this.chooseCategory}/>
                <Main onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
                {this.state.showItem && <ShowItem onShowItem={this.onShowItem} item={this.state.fullItem}  onAdd={this.addToOrder}/>}
                <Footer/>
            </div>
        )
    }

    onShowItem(item){
        this.setState({fullItem: item})
        this.setState({showItem: !this.state.showItem})
    }

    chooseCategory(category){
        if(category === 'all'){
            this.setState({currentItems: this.state.items})
            return
        }
        this.setState({
            currentItems: this.state.items.filter(el => el.category === category)
        })
    }

    deleteOrder(id){
        this.setState({orders: this.state.orders.filter(el => el.id !== id)})
    }

    addToOrder(item) {
        let isInArray = false
        this.state.orders.forEach(el => {
            if (el.id === item.id)
                isInArray = true
        })
        if (!isInArray)
            this.setState({orders: [...this.state.orders, item]})
    }
}

export default App
