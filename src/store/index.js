import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, data){
      state.products=data
    },

    loadBag(state, data){
      state.productsInBag=data
    },

    addToBag(state,product){
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag',JSON.stringify(state.productsInBag))
    },

    removeFromBag(state,productId){
      var updateBag=state.productsInBag.filter(item=> item.id!=productId);
      state.productsInBag=updateBag;
      localStorage.setItem('productsInBag',JSON.stringify(state.productsInBag))
    }
  },
  actions: {
    loadProducts({commit}){
      axios.get('https://fakestoreapi.com/products')
    .then(response=>{
      commit('loadProducts',response.data)
    });
    },

    loadBag({commit}){
     if(localStorage.getItem('productsInBag')){
      commit('loadBag',JSON.parse(localStorage.getItem('productsInBag')));
     }
    },

    addToBag({commit},product){
      commit('addToBag',product);
    },

    removeFromBag({commit},productId){
      if(confirm('Do you want to remove item from the cart?')){
      commit('removeFromBag',productId);
    }
    }
  },
  modules: {
  }
})
