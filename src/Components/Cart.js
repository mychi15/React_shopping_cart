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
        this.calculateSum = this.calculateSum.bind(this);
    }

    calculateSum() {
      return this.state.items.reduce(((a, b) => a + b.price * b.quantity), 0);
    }

    addSelectiontoCart(itemName) {
        const itemIndex = Items.findIndex((item) => {
            return item.name === itemName
        })
        const newItem = {...Items[itemIndex], quantity: 1}
        const index = this.state.items.map((i) => i.id).indexOf(newItem.id);
        if (index !== -1) {
          const newItems = [...this.state.items];
          newItems[index].quantity++;
          this.setState({items: newItems});
        } else {
            this.setState({items: [...this.state.items, newItem]});
        }
    }

    closeItem(index) {
        const items = Object.assign([], this.state.items);
        items.splice(index, 1);
        this.setState({items});
    }

    addQuantity(index, event) {
        console.log('index', index)
        const quantity = parseInt(event.target.value, 10) || 0;
        const newItems = Object.assign([], this.state.items);
        const newItem = newItems[index];
        newItem.quantity = quantity
        this.setState({items: newItems});
    }

    renderItem(item, index) {
        return (
            <div key={item.id} className="cart-item">
                <h2>{item.name}</h2>
                <img className="item-image" src={item.image} alt={item.name}/>
                <div className="item-details">
                    <span className="item-price">{item.price}</span>
                    <button className="btn btn-cart cart-item" type="button">
                      <input
                        type="number"
                        onChange={this.addQuantity.bind(this, index)}
                        value={item.quantity}
                        placeholder="Quantity" />
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
                    sum={this.calculateSum()}
                />
                <div className="cart-container" id="wrapper">
                    {this.state.items.map((item, i) => this.renderItem(item, i))}
                </div>
            </>
        );
    };
}

export default Cart;