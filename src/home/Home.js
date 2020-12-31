import React from 'react';
import { withRouter } from 'react-router-dom';

import Items from '../api/items';
import Item from "../components/item";

import {AuthContext} from '../context/authContext';

class Home extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.itemsApi = new Items(); 
        this.state = this.itemsApi.getItems();
        this.error = {};
    }

    get canAddItem(){
        return this.sumOfItems < this.state.totalItems;
      }
    
      get sumOfItems(){
        return this.state.items.reduce((sum , {count}) => sum + count, 0);
      }
    

    setDetails(value) {
            let items = this.state.items;
            if(this.sumOfItems > value){
                items = this.state.items.map(item => ({ ...item, count: 0  }));
            }
            this.validateTotalItems(value);
            this.saveItems({
                totalItems: value,
                items
            });
    }

    updateItemCount(updateItem, changeBy){
        const updatedItems = this.state.items.map(item => item.name === updateItem ? {...item, count: item.count + changeBy} :  item);
        
        this.saveItems({
            ...this.state,
            items: updatedItems
        });
    }

    validateTotalItems(value) {
        const isValid = !isNaN(value) && value > 0;
        this.error.totalItems = null;
        if(!isValid) {
            this.error.totalItems = 'Total Items should be a Number and > 0';
        } 
    }

    saveItems(data) {
        this.setState(data, ()=> {
            this.itemsApi.updateItems(data);
            console.log(this.state);
        });        
    }

    logOut(){
        this.props.authApi.logOut();
        this.props.history.push("/login");
    }

    render(){
        console.log(this.context);
        return (
            <div>
                <h1>Home</h1>
                <button onClick={this.logOut.bind(this)}>Logout</button>
                {this.props.isUserAdmin && <div>
                <label htmlFor="totalItems">Total Items</label>
                <input type="text" name="totalItems" id="totalItems"
                value={this.state.totalItems} onChange={(e) => this.setDetails(e.target.value)}/>
                <div>{this.error.totalItems}</div>
                </div>}
                <div>
                    <ul>
                    {this.state.items.map((item, inx) => 
                        (<li key={inx}>
                            <Item item={item} isAddAllowed={this.props.isUserAdmin && this.canAddItem} 
                            updateItemCount={this.updateItemCount.bind(this)}/>
                            </li>)
                    )}
                        </ul>
                    </div>
                </div>
        )
    }
  }
  
  export default withRouter(Home);
  