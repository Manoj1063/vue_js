import Vue from 'vue'
import App from './App.vue'
import { parseComponent } from 'vue-template-compiler'

Vue.component('product', {
    template:`<div class="product">
    <div class="product-image">
      <img v-bind:src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else  :class="{ outofstock: !inStock }"
                 :style = "outofstock"
                 >Out of Stock</p>
      <div>

      <ol>
        <li v-for="detail in details">{{ detail }}</li>
      </ol>

      <!-- Update Image when mouse over -->
      <div v-for="(variant,index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ 'background-color': variant.variantColor }"
            @mouseover="updateProduct(index)">
      </div>
      
      <!-- Add to cart button -->
      <div class="cart">
        <p> Cart{{ cart }}></p>
      </div>

      <button v-on:click=addToCart
              :disabled="!inStock"
              :class="{ disabledButton: !inStock}"
      >Add to Cart</button>
    </div>
  </div>
</div>`,
    data() {
       return {
        product : 'Socks',
        brand : 'Vue Mastery -',
        alttxt : 'green_socks_image',
        selectedVariant : 0,
        details : ['80% cotton', '20% polyester', 'Gender-neutral'],
        onSale : true,
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage: '/src/assets/Socks-green-onWhite.jpg',
            variantQuantity: 10,
            alttxt : 'green_socks_image',
            
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: '/src/assets/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0,
            alttxt : 'blue_socks_image'
          }
        ],
        cart:0,
        wishlist:10
      }
    },
    methods:{
      addToCart: function(){
        this.cart +=1
      },
      updateProduct(index){
        this.selectedVariant = index
        console.log(index)
      },
      wishList:function(){
        this.wishlist -=1
      }
    },
    computed:{
      title(){
        return this.brand + ' ' + this.product
      },
      image(){
        return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
        return this.variants[this.selectedVariant].variantQuantity
      },
      sale(){
        if(this.onSale){
          return this.brand + ' ' + this.product + '[ON SALE]'
        }
        return this.brand + ' ' + this.product + '[NOT ON SALE]'
      }            
    }    
})

var app = new Vue({
  el: '#app'
})