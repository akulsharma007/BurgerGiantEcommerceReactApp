import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 5.5,
    cheese: 10.5,
    meat: 14,
    bacon: 7
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        canPurchase: false,
        isOrdered: false
    }

    updateCanPurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map(key=>ingredients[key])
                    .reduce((sum,ele)=>sum+ele,0);
        this.setState({
            canPurchase: sum>0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
         
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
        })
        this.updateCanPurchase(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
         
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
        })
        this.updateCanPurchase(updatedIngredients);
    }

    isOrderedHandler = () => {
        this.setState({isOrdered:true});
    }

    isOrderedCancelHandler = () => {
        this.setState({isOrdered:false});
    }

    isOrderedContinueHandler = () => {
        alert('You continued!');
    }

    render () {
        let disabledInfo = {...this.state.ingredients};
        for(let o in disabledInfo){
            disabledInfo[o] = disabledInfo[o]<=0;
        }
        return (
            <>
                <Modal show={this.state.isOrdered} modalClosed={this.isOrderedCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continueHandler={this.isOrderedContinueHandler}
                        cancelHandler={this.isOrderedCancelHandler}
                    />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    canPurchase={this.state.canPurchase}
                    isOrderedHandler={this.isOrderedHandler}
                    />
            </>
        );
    }

}

export default BurgerBuilder;