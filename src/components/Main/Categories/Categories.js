import React, { Component } from 'react'
import s from './Categories.module.css'
import axios from "axios";

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            sortOrder: 'asc'
        }
    }

    toggleSortOrder = () => {
        const newSortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
        this.setState({ sortOrder: newSortOrder }, () => {
            this.props.sortItemsByPrice(newSortOrder);
        });
    }

    componentDidMount() {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(res => {
                const categories = res.data.map(category => ({key: category, name: category.charAt(0).toUpperCase() + category.slice(1)}))
                categories.unshift({key: 'all', name: 'All'})
                categories.push({ key: 'favorite', name: 'Favorite Items' })
                this.setState({categories})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div className={s.container}>
                <input type="text" placeholder="Search products" className={s.searchInput} value={this.props.searchTerm} onChange={this.props.onSearchChange} />
                <div className={s.categories}>
                    {this.state.categories.map(el => (
                        <div className={s.categories_items} key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
                    ))}
                    <div className={s.categories_items} onClick={this.toggleSortOrder}>Sort Price {this.state.sortOrder === 'asc' ? '↓'  : '↑' }</div>
                </div>
            </div>
        )
    }
}

export default Categories