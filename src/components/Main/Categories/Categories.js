import React, { Component } from 'react'
import s from './Categories.module.css'

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories:[
                {
                    key: 'all',
                    name: 'Всё',
                },
                {
                    key: 'chairs',
                    name: 'Стулья',
                },
                {
                    key: 'tables',
                    name: 'Столы',
                },
                {
                    key: 'sofa',
                    name: 'Диваны',
                }
            ]
        }
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