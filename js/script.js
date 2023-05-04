//variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

//cart
let cart = [];

//getting products
class Products {
    async getProducts() {
        try {
            let result = await fetch('./js/products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {title, price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image};
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
//display products
class UI {
    displayProducts(products){
        let result = "";
        products.forEach(product => {
            result += `
            <article class="product">
            <div class="img-container">
                <img src=${product.image}>
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    Add to cart
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>R${product.price}</h4>
        </article>
            `
        });
        productsDOM.innerHTML = result;
    }

}
//local storage
class Storage {

}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    //get products
    products.getProducts().then(products => ui.displayProducts(products));
});