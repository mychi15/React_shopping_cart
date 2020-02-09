import React, {Component} from 'react';
import Menu from './Menu';
import Items from '../Database';

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.closeItem = this.closeItem.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
    }

    addSelectiontoCart(itemName) {
        const itemIndex = Items.findIndex((item) => {
            return item.name === itemName
        })
        const items = [...this.state.items, Items[itemIndex]];
        this.setState({items}, () => {
            console.log(this.state.items);
        });
    }

    closeItem(index) {
        const items = Object.assign([], this.state.items);
        items.splice(index, 1);
        this.setState({items});
    }

    addQuantity(event, index) {
        const quantity = parseInt(event.target.value, 10);
        const items = Object.assign([], this.state.items);
        console.log(items[index], quantity);
    }

    renderItem(item) {
        return (
            <div className="cart-item" key={Math.random()*Math.random()}>
                <h2>{item.name}</h2>
                <img className="item-image" src={item.image} alt={item.name}/>
                <div className="item-details">
                    <span className="item-price">{item.price}</span>
                    <button className="btn btn-cart cart-item" type="button">
                        <input type="number" onChange={this.addQuantity} value={item.quantity} placeholder="Quantity"/>
                    </button>
                </div>
                <button id="close" onClick={this.closeItem}>X</button>
            </div>
        )
    }

    render() {
        return (
            <>
                <Menu
                    addToCart={this.addSelectiontoCart.bind(this)}
                />
                <div className="cart-container" id="wrapper">
                    {this.state.items.map(item => this.renderItem(item))}
                </div>
            </>
        );
    };
}

export default Cart;