import Vue from 'vue'
import App from './App.vue'
import { parseComponent } from 'vue-template-compiler'


Vue.component('product-review',{
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
    
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data(){
      return{
        name : null,
        review : null,
        rating : null,
        errors : []
      }
    },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating) {
              let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
              }
              this.$emit('review-submitted', productReview)
              this.name = null
              this.review = null
              this.rating = null
            } else {
              if(!this.name) this.errors.push("Name required.")
              if(!this.review) this.errors.push("Review required.")
              if(!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
    props:{
      premium:{
        type : Boolean,
        required : true
      }
    },
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

      <p> Shipping : {{shipping}}</p>
 
      <product-details :details="details"></product-details>
      
      <!-- Update Image when mouse over -->
      <div v-for="(variant,index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ 'background-color': variant.variantColor }"
            v-on:mouseover="updateProduct(index)">
      </div>

      <button v-on:click=addToCart
              :disabled="!inStock"
              :class="{ disabledButton: !inStock}">Add to Cart</button>

      <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                 <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
      </div>      

      <product-review @review-submitted="addReview" ></product-review>

    </div>
  </div>
</div>`,
    data() {
       return {
        product : 'Socks',
        brand : 'Vue Mastery -',
        alttxt : 'green_socks_image',
        selectedVariant : 0,
        details : ['80% cotton', '20% polyester', 'Gender-neutral1'],
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
        wishlist:10,
        reviews : []
      }
    },
    methods:{
      addToCart: function(){
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct(index){
        this.selectedVariant = index
        console.log(index)
      },
      wishList:function(){
        this.wishlist -=1
      },
      addReview(productReview){
        this.reviews.push(productReview)
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
      },
      shipping(){
        if(this.premium){
          return "Free"
        } return 2.99
      }            
    }    
})

var app = new Vue({
  el: '#app',
  data:{
    premium : true,
    cart:[]
  },
  methods: {
    updateCart(id){
      this.cart.push(id)
    }
  }
})