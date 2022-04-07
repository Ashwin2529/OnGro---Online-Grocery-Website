function signout() {
    window.location.href="home.htm";
}
function prdctlst() {
    window.location.href="prdctlst.html";
}
function packtfds() {
    document.getElementById('content1').style.transform='translateX(0px)';
    document.getElementById('content2').style.transform='translateX(100%)';
    document.getElementById('content3').style.transform='translateX(100%)';
    document.getElementById('btn1').style.background= 'rgb(231, 39, 39)';
    document.getElementById('btn1').style.color='#fff';
    document.getElementById('btn2').style.background= '#fff';
    document.getElementById('btn2').style.color='#000';
    document.getElementById('btn3').style.background= '#fff';
    document.getElementById('btn3').style.color='#000';
}

function vegtbls() {
    document.getElementById('content2').style.transform='translateX(0px)';
    document.getElementById('content1').style.transform='translateX(100%)';
    document.getElementById('content3').style.transform='translateX(100%)';
    document.getElementById('btn1').style.background= '#fff';
    document.getElementById('btn1').style.color='#000';
    document.getElementById('btn2').style.background= 'rgb(231, 39, 39)';
    document.getElementById('btn2').style.color='#fff';
    document.getElementById('btn3').style.background= '#fff';
    document.getElementById('btn3').style.color='#000';
}

function fruts() {
    document.getElementById('content3').style.transform='translateX(0px)';
    document.getElementById('content1').style.transform='translateX(100%)';
    document.getElementById('content2').style.transform='translateX(100%)';
    document.getElementById('btn2').style.background= '#fff';
    document.getElementById('btn2').style.color='#000';
    document.getElementById('btn1').style.background= '#fff';
    document.getElementById('btn1').style.color='#000';
    document.getElementById('btn3').style.background= 'rgb(231, 39, 39)';
    document.getElementById('btn3').style.color='#fff';
}

function opencart() {
    window.location.href="cart.html";
}

let carts = document.querySelectorAll('.add-crt');
let products=[
    {
        name:'sreegolduraddal',
        quantity:'1kg',
        price:40,
        incart:0
    },
    {
        name:'aachichickenmasala',
        quantity:'500g',
        price:20,
        incart:0
    },
    {
        name:'tatasalt',
        quantity:'1kg',
        price:30,
        incart:0
    },
    {
        name:'madhursugar',
        quantity:'1kg',
        price:55,
        incart:0
    },
    {
        name:'potato',
        quantity:'1kg',
        price:60,
        incart:0
    },
    {
        name:'Carrot',
        quantity:'1kg',
        price:30,
        incart:0
    },
    {
        name:'tomato',
        quantity:'1kg',
        price:40,
        incart:0
    },
    {
        name:'beetroot',
        quantity:'1kg',
        price:150,
        incart:0
    },
    {
        name:'apple',
        quantity:'1kg',
        price:80,
        incart:0
    },
    {
        name:'orange',
        quantity:'1kg',
        price:60,
        incart:0
    },
    {
        name:'watermelon',
        quantity:'1kg',
        price:100,
        incart:0
    },
    {
        name:'bannana',
        quantity:'1kg',
        price:40,
        incart:0
    }
]

for(let i=0;i<carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartnumbers(products[i]);
        ttlcost(products[i]);
    });
}

function onloadcartno(){
    let productnumbers = localStorage.getItem('cartnumbers');

    if(productnumbers){
        document.querySelector('.count').textContent=productnumbers;
    }
}

function cartnumbers(product){
    let productnumbers = localStorage.getItem('cartnumbers');
    productnumbers = parseInt(productnumbers);

    if(productnumbers){
        localStorage.setItem('cartnumbers',productnumbers+1);
        document.querySelector('.count').textContent=productnumbers+1;
    }else{
        localStorage.setItem('cartnumbers',1);
        document.querySelector('.count').textContent=1;
    }

    setitm(product);
}
function setitm(product) {
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].incart += 1;
    }else{
        product.incart = 1;
        cartItems = {
            [product.name]:product
        }
    }
    
    localStorage.setItem('productsincart', JSON.stringify(cartItems));
}

function ttlcost(product) {
    let cartcost = localStorage.getItem('totalcost');
    if (cartcost != null) {
        cartcost = parseInt(cartcost);
        localStorage.setItem('totalcost', cartcost + product.price);
    }else{
        localStorage.setItem('totalcost', product.price);
    }
}

function displaycart() {
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);
    let productcontainer = document.querySelector('.productslst');
    let cartcost = localStorage.getItem('totalcost');

    if (cartItems) {
        productcontainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productcontainer.innerHTML +=`
            <div class="product-hr">
            <div class="prdct-ttl1">
                <i class="material-icons">highlight_off</i>
                <img src="images/${item.name}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price1">Rs.${item.price}.00</div>
            <div class="count-prdct1">
                <i class="material-icons">remove_circle_outline</i>
                <span>${item.incart}</span>
                <i class="material-icons">add_circle_outline</i>
            </div>
            <div class="totalofprdct1">Rs.${item.incart * item.price}.00</div>
            </div>    
            `;
        });

        productcontainer.innerHTML += `
            <div class="basketttlcontnr">
                <h4 class="basket_ttltitle">
                    Cart Total
                </h4>
                <h4 class="baskettotal">
                    Rs.${cartcost}.00 /-
                </h4>
        `
    }else{
        productcontainer.innerHTML += `
        <div class="noitem">
            No items in the cart
        </div>
        `
    }
}

onloadcartno();
displaycart();