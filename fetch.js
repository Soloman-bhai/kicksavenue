document.addEventListener('DOMContentLoaded', function() {
  const bar = document.getElementById('bar');
  const close = document.getElementById('close');
  const nav = document.getElementById('navbar');
  const hid = document.getElementById('hid_icon1');

  if (bar && close && nav && hid) {
      bar.addEventListener('click', () => {
          nav.classList.add('active');
          hid.style.display = 'none';
      });

      close.addEventListener('click', () => {
          nav.classList.remove('active');
          hid.style.display = 'initial';
      });
  } else {
      console.error('One or more navbar elements not found.');
  }
});


function card_make(jsonFilePath,containerelement){
    // Fetch data from JSON file
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            const productContainer = document.querySelector(containerelement);

            // Iterate through each product in the JSON data
            data.forEach(product => {
                // Create elements for product card
                const productCard = document.createElement('div');
                productCard.classList.add('pro');

                // Set onclick attribute to navigate to product description page
                //productCard.setAttribute('onclick', "window.location.href='product_dec.html'");
                productCard.addEventListener('click', () => {
                    // Redirect to product description page with unique identifier
                    window.location.href = `product_dec.html?id=${product.id}&jsonFilePath=${jsonFilePath}`;
                });

                // Create image element
                const image = document.createElement('img');
                image.src = product.image;
                image.alt = product.name;

                // Create product description div
                const description = document.createElement('div');
                description.classList.add('des');

                // Add brand name
                const brand = document.createElement('span');
                brand.textContent = product.brand;

                // Add product name
                const name = document.createElement('h5');
                name.textContent = product.name;

                // Gender Info
                const gender = document.createElement('p');
                gender.textContent = product.gender;

                // Create star rating
                const starContainer = document.createElement('div');
                starContainer.classList.add('star');
                for (let i = 0; i < product.rating; i++) {
                    const star = document.createElement('i');
                    star.classList.add('fas', 'fa-star');
                    starContainer.appendChild(star);
                }

                // Add price
                const price = document.createElement('h4');
                price.textContent = '₹' + product.price;

                // Create shopping cart icon link
               //const cartLink = document.createElement('a');
               //cartLink.href = product.link; // Add your cart link here
               //const cartIcon = document.createElement('i');
               //cartIcon.classList.add('fal', 'fa-shopping-cart', 'cart');
               //cartLink.appendChild(cartIcon);

                const cartdiv = document.createElement('div');
                cartdiv.classList.add('cartdiv');
                const cartLink = document.createElement('a');
                cartLink.href = product.link; // Add your cart link here
                cartLink.classList.add('cart-link'); // Add a class to the cart link for styling

                cartLink.addEventListener("click", function(event) {
                    // Prevent the default behavior of the link
                    event.preventDefault();
                    // Open the cart link in a new tab
                    window.open(cartLink.href, '_blank');
                    // Redirect the current tab to the cart page
                    window.location.href = cartLink.href;
                });

                // Create shopping cart icon
                const cartIcon = document.createElement('i');
                cartIcon.classList.add('fal', 'fa-shopping-cart', 'cart');

                // Create tooltip span
                const tooltip = document.createElement('span');
                tooltip.classList.add('cart-tooltip');
                tooltip.textContent = ' Go To '+ product.brand + ' Store ';

                // Append the tooltip to the cart link
                cartLink.appendChild(tooltip);

                // Append the shopping cart icon to the cart link
                cartLink.appendChild(cartIcon);
                cartdiv.appendChild(cartLink);

                // Append elements to product card
                description.appendChild(brand);
                description.appendChild(name);
                description.appendChild(gender);
                description.appendChild(starContainer);
                description.appendChild(price);
                productCard.appendChild(image);
                productCard.appendChild(description);
                productCard.appendChild(cartdiv);

                // Append product card to product container
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
      }




      //var MainImg = document.getElementById("MainImg");
      //var smallimg = document.getElementsByClassName("small-img");
      //smallimg[0].onclick = function(){
//  MainImg.src = smallimg[0].src;
//}
//
//smallimg[1].onclick = function(){
//  MainImg.src = smallimg[1].src;
//}
//
//smallimg[2].onclick = function(){
//  MainImg.src = smallimg[2].src;
//}
//
//smallimg[3].onclick = function(){
//  MainImg.src = smallimg[3].src;
//}
//  
//  smallimg[4].onclick = function(){
//  MainImg.src = smallimg[4].src;
//}

// Script to create small images and handle click events
function createSmallImagesAndHandleEvents(product) {
        const productImages = product.images;
        const smallImgGroup = document.querySelector('.small-img-group');

        productImages.forEach((imgSrc, index) => {
            const smallImgcol = document.createElement('div');
            smallImgcol.classList.add('small-img-col'); // Create a new small image column
        
            const smallImg = document.createElement('img');
            smallImg.src = imgSrc;
            smallImg.width = "100%";
            smallImg.classList.add("small-img");
            smallImg.alt = product.name;
        
            // Add click event listener to each small image
            // Add click event listener to each small image
            var MainImg = document.getElementById("MainImg");
            smallImg.addEventListener('click', () => {
            MainImg.src = smallImg.src;
            });
          
          
          
          
          
        smallImgcol.appendChild(smallImg);
        smallImgGroup.appendChild(smallImgcol);
      });
}
  

function product_des() {

     // Get product ID from URL query string and parse it to an integer
     const urlParams = new URLSearchParams(window.location.search);
     const productId = parseInt(urlParams.get('id'));
     console.log('Product ID:', productId); // Debugging
     const product_type = urlParams.get('jsonFilePath');
     console.log('Product Type:', product_type);

     // Fetch data from JSON file
     fetch(product_type)
         .then(response => response.json())
         .then(data => {
             console.log('Fetched data:', data); // Debugging

             // Find the product with the matching ID
             const product = data.find(product => product.id === productId);
             console.log('Product:', product); // Debugging

             if (product) {
                 // Display product details
                 document.getElementById('category').textContent = product.category;
                 document.getElementById('gender').textContent = product.gender;
                 document.getElementById('productName').textContent = product.name;
                 document.getElementById('productPrice').textContent = '₹' + product.price;
                 document.getElementById('productDescription').textContent = product.product_description;
                 const cartBtn = document.getElementById('cart_btn');
                 cartBtn.addEventListener('click', () => {
                     window.open(product.link, '_blank'); // Opens link in new tab
                 });


                 // Populate size options (if available)
                 const sizeSelect = document.getElementById('sizeSelect');
                 if (product.sizes && product.sizes.length > 0) {
                     product.sizes.forEach(size => {
                         const option = document.createElement('option');
                         option.textContent = size;
                         sizeSelect.appendChild(option);
                     });
                 } else {
                     sizeSelect.style.display = 'none'; // Hide size select if sizes are not available
                 }

                 // Display images
                 const mainImg = document.getElementById('MainImg');
                 mainImg.src = product.image;

                // const smallImgGroup = document.querySelector('.small-img-group');
                // // Clear existing small images
                // smallImgGroup.innerHTML = '';
                // product.images.forEach(imgSrc => {
                //     const smallImgcol = document.createElement('div');
                //     smallImgcol.classList.add('small-img-col'); // Create a new small image column
                // 
                //     const smallImg = document.createElement('img');
                //     smallImg.src = imgSrc;
                //     smallImg.width = "100%";
                //     smallImg.classList.add("small-img");
                //     smallImg.alt = product.name;
                // 
                //     smallImgcol.appendChild(smallImg);
                //     smallImgGroup.appendChild(smallImgcol);
                // });
                createSmallImagesAndHandleEvents(product);


                 
             } else {
                 console.error('Product not found.');
             }
         })
         .catch(error => console.error('Error fetching products:', error));


}