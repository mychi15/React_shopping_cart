import React, {Component} from 'react';
import Items from '../Database';

class Menu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            curValue: null,
            sum: 0
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler =  this.onClickHandler.bind(this);
    }


    static getDerivedStateFromProps(props, state) {
      return {sum: props.sum};
    }

    onChangeHandler(event) {
        this.setState({curValue: event.target.value}, () => {
            console.log(this.state.curValue);
        });
    }

    onClickHandler() {
        this.props.addToCart(this.state.curValue);
    }

    render() {
        return (
            <div id="menu">
                <select id="cataloge" onChange={this.onChangeHandler}>
                    <option value="selectitems">Please select items</option>
                    {Items.map((item) => {
                        return (
                            <option value={item.name} key={item.name}>{item.name}</option>
                        )
                    })}
                </select>
                <button onClick={this.onClickHandler}>Add to Cart</button>
                <span>Total sum: {this.state.sum.toFixed(2)}</span>
            </div>
        )
    }
}

export default Menu;