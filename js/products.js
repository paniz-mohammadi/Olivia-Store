const productsContainer_onSale = document.getElementById('on-sale');
const productsContainer_highRank = document.getElementById('high-rank');
const productsContainer_newOnes = document.getElementById('new-ones');

const allProducts = document.getElementById('products');

const productsContainer = document.querySelector('.products-container');
const productDetails = document.querySelector('.product-details');

const sectionTitles = document.querySelectorAll('.section-title');
const allProductsContainer = document.querySelectorAll('.products-container');

let productsArray = [];

document.addEventListener('DOMContentLoaded', () =>
{
    const proId = localStorage.getItem('localStorage-product');
    getProduct(proId);
})

function getProduct(proId)
{
    fetch(`https://fakestoreapi.com/products/${proId}`)
    .then(res => res.json())
    .then(product =>  
    {
        const imageSlider = document.createElement('div');
        imageSlider.classList.add('image-slider');

        // const productImages = document.createElement('div');
        // productImages.classList.add('product-images');

        const img = document.createElement('img');
        img.src = product.image;
        img.classList.add('active');

        const productInfo = document.createElement('div');
        productInfo.classList.add('details');

        const productName = document.createElement('h2');
        productName.classList.add('product-name');
        productName.textContent = product.title;

        const productShortDes = document.createElement('p');
        productShortDes.classList.add('product-short-des');
        productShortDes.textContent = product.description;

        const price = document.createElement('span');
        price.classList.add('product-price');
        price.textContent = `${product.price}`;

        const btnCart = document.createElement('button');
        btnCart.classList.add('btn-add');
        btnCart.classList.add('cart-btn');
        btnCart.textContent = 'add to Cart';
        
        const btnWishlist = document.createElement('button');
        btnWishlist.classList.add('btn-add');
        btnWishlist.textContent = 'add to wishlist';

        //productImages.appendChild(img);
        imageSlider.appendChild(img);

        productInfo.appendChild(productName);
        productInfo.appendChild(productShortDes);
        productInfo.appendChild(price);
        productInfo.appendChild(btnCart);
        productInfo.appendChild(btnWishlist);

        productDetails.appendChild(imageSlider);
        productDetails.appendChild(productInfo);
    })  
}

function getAllProducts()
{
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data =>
        {   
            productsArray = data.map(product => ({ ...product }));
            productsArray.forEach(product => console.log(product));
            
            renderProducts(productsArray, 4);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function getHomePageProducts()
{
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data =>
        {   
            let i = 0;
            const highRank_products = [];
            function checkRank()
            {
                data.map(product =>
                {
                    if(product.rating.rate > 4.1)
                    {
                        highRank_products.push(data[i]);
                    }
                    i++;
                })
            }
            checkRank();

            const new_products = [];
            function checkNew()
            {
                i = 0;
                data.map(product =>
                {
                    if(product.id === 2 || product.id === 4 || product.id === 6 || product.id === 7)
                    {
                        new_products.push(data[i]);
                    }
                    i++;
                })
            }
            checkNew();

            const onSale_products = [];
            function checkOnSale()
            {
                i = 0;
                data.map(product =>
                {
                    if(product.id === 9 || product.id === 10 || product.id === 13 || product.id === 15 || product.id === 16)
                    {
                        onSale_products.push(data[i]);
                    }
                    i++;
                })
            }
            checkOnSale();

            renderProducts(onSale_products, 1);
            renderProducts(highRank_products, 2);
            renderProducts(new_products, 3);
    })
}

getHomePageProducts();

const createProductCard = (product, flg) => 
{
    const productLink = document.createElement('a');
    productLink.href = "./product.html";
    productLink.classList.add('product-link');
    productLink.setAttribute('data-product-id', product.id);

    productLink.addEventListener('click', function()
    {
        const productId = this.getAttribute('data-product-id');
        localStorage.setItem('localStorage-product',productId);
        console.log(productId);
    })
    
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('div');
    productImage.classList.add('product-image');

    const productThumb = document.createElement('img');
    productThumb.src = product.image;
    productThumb.classList.add('product-thumb');
    productThumb.alt = "";

    const cardBtn = document.createElement('button');
    cardBtn.classList.add('card-btn');
    cardBtn.textContent = 'add to wishlist';

    productImage.appendChild(productThumb);
    productImage.appendChild(cardBtn);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productName = document.createElement('h3');
    productName.classList.add('product-name');
    productName.textContent = product.title;

    const productShortDes = document.createElement('p');
    productShortDes.classList.add('product-short-des');
    productShortDes.textContent = product.description;

    const price = document.createElement('span');
    price.classList.add('price');
    const actualPrice = document.createElement('span');
    actualPrice.classList.add('actual-price');

    if(flg)
    {
        price.textContent = `${Math.floor((product.price * 80))/100}$`;
        actualPrice.textContent = `${product.price}$`;

        const discountTag = document.createElement('span');
        discountTag.classList.add('discount-tag');
        discountTag.textContent = '20% off';
        productImage.appendChild(discountTag);
    }
    else if(!flg)
    {
        price.textContent = `${product.price}$`;
    }

    const btnAddToCart = document.createElement('button');
    btnAddToCart.classList.add('btn-add-to-cart');
    btnAddToCart.textContent = 'Add to Cart';

    productInfo.appendChild(productName);
    productInfo.appendChild(productShortDes);
    productInfo.appendChild(price);
    productInfo.appendChild(actualPrice);
    productInfo.appendChild(btnAddToCart);

    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);

    productLink.appendChild(productCard);

    return productLink;
}

const renderProducts = (products, key) =>
{
    products.forEach(product => 
    {
        switch (key) 
        {
            /* On Sale */ 
            case 1:
                const productCardOnSale = createProductCard(product, true);
                productsContainer_onSale.appendChild(productCardOnSale);
                break;

            /* HIGH RANK */     
            case 2:
                const productCardHighRank = createProductCard(product, false);
                productsContainer_highRank.appendChild(productCardHighRank);
                break;
            /* NEW ONES */     
            case 3:
                const productCardNewOnes = createProductCard(product, false);
                productsContainer_newOnes.appendChild(productCardNewOnes);
                break;
            /* ALL */     
            case 4:
                const productCardAll = createProductCard(product, false);
                allProducts.appendChild(productCardAll);
                break;
            default:
                break;
        }
    });   
}

allProLink.addEventListener('click', () =>
{
    console.log('allProLink clicked!');
    if(productsArray.length == 0)
    {
        getAllProducts();
    }     
});

const electronics = [];
const jewelleries = [];
const menClothes = [];
const womenClothes = [];

function checkCategory(data)
{
    console.log('check Category');

    let i = 0;
    let j = 0;
    let k = 0;
    let l = 0;
    let p = 0;

    data.map(product =>
    {
        if(product.category === 'electronics')
        {
            electronics[j++] = data[i];
        }

        else if(product.category === 'jewelery')
        {
            jewelleries[k++] = data[i];
        }

        else if(product.category === "men's clothing")
        {
            menClothes[l++] = data[i];
        }
        
        else if(product.category === "women's clothing")
        {
            womenClothes[p++] = data[i];
        }
        i++;
    })
}

const categories = document.querySelector('.categories');
const category = document.querySelector('.category');

const electronic = document.querySelector('.category-1');
const jewellery = document.querySelector('.category-2');
const menClothing = document.querySelector('.category-3');
const womenClothing = document.querySelector('.category-4');

const winter = document.querySelector('.winters-outfit');
const accessories = document.querySelector('.vintage-accessories');

// winter.addEventListener('click', () =>
// {

// })

// accessories.addEventListener('click', () =>
// {

// })

category.addEventListener('click', (event) =>
{
    event.preventDefault();

    console.log('event category');

    /*if(electronics.length === 0 || jewelleries.length === 0 || menClothes.length === 0 || womenClothes.length === 0)
    {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => 
        {        
            checkCategory(data);
        })
    }*/
})

electronic.addEventListener('click', () =>
{   
    console.log('eventListener electronics');

    if(electronics.length === 0)
    {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => 
        {        
            checkCategory(data);
        })
    }  

    sectionTitles.forEach(item =>
    {
        item.innerHTML = '';
    })
    allProductsContainer.forEach(item =>
    {
        item.innerHTML = '';
    })
    
    electronics.forEach(product =>
    {
        console.log(product);
    })

    electronics.forEach(product =>
    {
        const productCard = renderProductCard(product, false);
        productsContainer.appendChild(productCard);
    })
})

jewellery.addEventListener('click', (event) =>
{
    event.preventDefault();

    if(jewelleries.length === 0)
    {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => 
        {        
            checkCategory(data);
        })
    }  

    sectionTitles.forEach(item =>
    {
        item.innerHTML = '';
    })
    allProductsContainer.forEach(item =>
    {
        item.innerHTML = '';
    })
    
    jewelleries.forEach(product =>
    {
        console.log(product);
    })

    jewelleries.forEach(product =>
    {
        const productCard = renderProductCard(product, false);
        productsContainer.appendChild(productCard);
    })
})

menClothing.addEventListener('click', (event) =>
{
    event.preventDefault();

    if(menClothes.length === 0)
    {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => 
        {        
            checkCategory(data);
        })
    }  

    sectionTitles.forEach(item =>
    {
        item.innerHTML = '';
    })
    allProductsContainer.forEach(item =>
    {
        item.innerHTML = '';
    })
    
    menClothes.forEach(product =>
    {
        console.log(product);
    })

    menClothes.forEach(product =>
    {
        const productCard = renderProductCard(product, false);
        productsContainer.appendChild(productCard);
    })
})

womenClothing.addEventListener('click', (event) =>
{   
    event.preventDefault();

    if(womenClothes.length === 0)
    {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => 
        {        
            checkCategory(data);
        })
    }  

    sectionTitles.forEach(item =>
    {
        item.innerHTML = '';
    })
    allProductsContainer.forEach(item =>
    {
        item.innerHTML = '';
    })
    
    womenClothes.forEach(product =>
    {
        console.log(product);
    })

    womenClothes.forEach(product =>
    {
        const productCard = renderProductCard(product, false);
        productsContainer.appendChild(productCard);
    })
})

/*const bgImages = [
    "D:\Codes\Projects\Olivia-Store\assets\images\bg\premium_photo-2.png",
    "D:\Codes\Projects\Olivia-Store\assets\images\bg\premium_photo.png",
    "D:\Codes\Projects\Olivia-Store\assets\images\bg\susan-wilkinson-unsplash.jpg"
];

const node = document.querySelector(".banner");
const cycleImages = (images, container, step) =>
{
    images.forEach((image, index) => (
        setTimeout(() => 
        {
            container.style.backgroundImage = `url(${image})`
        }, step * (index + 1))
    ))
    setTimeout(() => cycleImages(images, container, step))
}

cycleImages(bgImages, node, 1000);*/