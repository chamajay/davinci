let products = [
    {
        "name": "Mona Lisa (copy)",
        "code": "p1",
        "price": 120,
        "qty": 1
    },
    {
        "name": "Virgin and Child (copy)",
        "code": "p2",
        "price": 120,
        "qty": 1
    },
    {
        "name": "Lady with an Ermine Bag",
        "code": "p3",
        "price": 30,
        "qty": 1
    },
    {
        "name": "Leonardo da Vinci Figure",
        "code": "p4",
        "price": 20,
        "qty": 1
    },
    {
        "name": "Mona Lisa Phone Case",
        "code": "p5",
        "price": 19,
        "qty": 1
    },
    {
        "name": "Leonardo da Vinci Sticker",
        "code": "p6",
        "price": 2,
        "qty": 1
    }
]

let total = 0;
let cart = [];  // This array will hold the products added to the cart

// DOM elements
const cartImgEle = document.querySelector('#order-cart-img img');
const cartTableEle = document.getElementById('order-cart');
const totalEle = document.getElementById('order-total');
const orderFormEle = document.forms["order-form"];
const invoiceCartEle = document.getElementById('invoice-cart');
const invoiceNameEle = document.getElementById('invoice-name');
const invoiceEmailEle = document.getElementById('invoice-email');
const invoiceAddrEle = document.getElementById('invoice-addr');
const modalEle = document.querySelector('.modal');
const productChkboxEles = document.querySelectorAll('.checkbox input');
const productQtyEles = document.querySelectorAll('.product-price-qty input');
const modalCloseBtnEle = document.querySelector('.modal .close-button');

// Add event listeners to elements.
// Experienced developers recommend adding event listeners from js
// rather than using inline html property.
// https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick

// On page load
window.onload = function() {
    resetInputs();
    updateNavigation();
}
// Add event listeners to product checkbox elements
productChkboxEles.forEach((ele, num) => {
    ele.addEventListener('change', function(){addRemoveProduct(`p${num + 1}`, ele)});
});
// Add event listeners to product qty elements
productQtyEles.forEach((ele, num) => {
    ele.addEventListener('change', function(){changeQty(`p${num + 1}`, ele)});
})
// Add event listener to the form element
orderFormEle.addEventListener('submit', placeOrder);

// Add event listener to the modal close button
modalCloseBtnEle.addEventListener('click', showHideInvoice);


function addRemoveProduct(code, chkbox) {
    // Add/remove products to the cart
    let product = products.find(p => p.code == code);  // Get the matching product from products array
    if (chkbox.checked) {
        cart.push(product);
        // Set the selected product's background color and text color
        // Have to go back 2 parent elements here
        chkbox.parentNode.parentNode.style.backgroundColor = '#FFE600';
        chkbox.parentNode.parentNode.style.color = '#121212';
    } else {  // if product is not checked, remove it from cart array
        let index = cart.findIndex(p => p.code == code);
        if (index != -1) {
            cart.splice(index, 1);
        }
        // Reset the un-selected product's background color and text color
        chkbox.parentNode.parentNode.style.backgroundColor = '#121212';
        chkbox.parentNode.parentNode.style.color = '#FEFBF6';
    }
    updateCart();
}


function changeQty(code, qtyEle) {
    // Change the selected quantitiy of the product
    // Since objects are passed by reference, we don't have to change
    // the qty of the cart array, changing the product array's object is enough.
    // This will update the cart array's object as well
    let product = products.find(p => p.code == code);
    product.qty = qtyEle.value;
    updateCart();
}


function updateCart() {
    // Clear cart table element before adding new items
    clearCart();

    total = 0;

    // Show/hide cart image depending on if there are any products in the cart
    if (cart.length > 0) {
        cartImgEle.style.display = 'none';
    } else {
        cartImgEle.style.display = 'block';
    }

    // Iterate through the cart array and add each product to the cart table
    cart.forEach(p => {
        let tr = document.createElement('tr');
        
        // Use templete literal to create three html <td> elements 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        // ((product qty * product price) * 100) / 100).toFixed(2) will format the value to 2 decimal places
        let html = `<td>${p.name}</td><td>${p.qty}</td><td>&pound;${(((p.qty * p.price) * 100) / 100).toFixed(2)}</td>`;
        
        // Insert html code inside the <tr> element
        tr.innerHTML = html;
        
        // Append <tr> element to cart table element
        cartTableEle.appendChild(tr);
        
        // Update total
        total += p.qty * p.price;
    })

    // set total element value
    totalEle.innerHTML = `&pound;${((total * 100) / 100).toFixed(2)}`;
}


function clearCart() {
    // Delete all rows(except the first) of the cart table
    while (cartTableEle.rows.length > 1) {
        cartTableEle.deleteRow(1);
    }
}


function resetInputs() {
    // Set all input elements to their default values
    let inputs = document.querySelectorAll('input');
    inputs.forEach(i => {
        i.checked = false;
        i.value = i.defaultValue;
    })
}


function placeOrder(event) {
    // Stop the page from reloading when submitting the form
    event.preventDefault();

    // Validate required fields
    if (cart.length == 0) {
        alert("Add some products to the cart first!")
        return;
    }

    let fname = orderFormEle["fname"].value;
    if (fname == "") {
        alert("First name must be filled out!");
        return;
    }

    let lname = orderFormEle["lname"].value;
    if (lname == "") {
        alert("Last name must be filled out!");
        return;
    }

    let email = orderFormEle["email"].value;
    if (email == "") {
        alert("Email must be filled out!");
        return;
    }

    let addr = orderFormEle["addr"].value;
    if (addr == "") {
        alert("Address must be filled out!");
        return;
    }

    updateInvoice(fname, lname, email, addr);
    showHideInvoice();
} 


function updateInvoice(fname, lname, email, addr) {
    // Set the user details of the invoice
    invoiceNameEle.innerText = fname + " " + lname;
    invoiceEmailEle.innerText = email;
    invoiceAddrEle.innerText = addr;

    // Remove existing elements inside the invoice cart
    clearInvoiceCart();

    // Add each product in the cart to the invoice cart element
    cart.forEach(p => {
        let itemHTML = `<p>Product: ${p.name}</p><p>Quantity: ${p.qty}</p><p>Price: &pound;${((p.price * 100) / 100).toFixed(2)}</p><br>`;
        invoiceCartEle.innerHTML += itemHTML;
    })

    // Add total at the end
    invoiceCartEle.innerHTML += '<p>- - - - - - - - - - - - - - - -</p>'
    invoiceCartEle.innerHTML += `<p>Total Bill: &pound;${((total * 100) / 100).toFixed(2)}</p>`
}


function clearInvoiceCart() {
    // Remove all the children of the invoice cart element
    while (invoiceCartEle.firstChild) {
        invoiceCartEle.removeChild(invoiceCartEle.firstChild);
    }
}


function showHideInvoice() {
    // Toggle show-modal class of the modal element to show/hide the modal
    modalEle.classList.toggle("show-modal");
}


function updateNavigation() {
    // Set the background color of the current page link in the navigation menu
    let naviLinkEles = document.querySelectorAll('#navi li a');
    let currentURL = window.location.href.split('#')[0];
    naviLinkEles.forEach(e => {
        if (e.href == currentURL) {
            e.classList.add('current');
        } else {
            e.classList.remove('current');
        }
    });
}


// Particle js configuration
window.addEventListener("hashchange", function() {
    scrollBy(0, -55);
});

particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});
