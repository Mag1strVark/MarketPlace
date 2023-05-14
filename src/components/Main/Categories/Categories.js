import React, { Component } from 'react'
import s from './Categories.module.css'
import axios from "axios";

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            price: null
        }
    }

    componentDidMount() {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(res => {
                const categories = res.data.map(category => ({key: category, name: category.charAt(0).toUpperCase() + category.slice(1)}))
                categories.unshift({key: 'all', name: 'All'})
                this.setState({categories})
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return (
            <div className={s.categories}>
                {this.state.categories.map(el => (
                    <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
                ))}
            </div>
        )
    }
}

export default Categories