// Создаю функцию для скролла
function scrol(arg) {
    return arg.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

//Функция отображения 
function display(arg, hide1, hide2) {
    arg.forEach(el => {
        el.classList.remove('hide')
    });
    hide1.forEach(el => {
        el.classList.add('hide')
    });
    hide2.forEach(el => {
        el.classList.add('hide')
    });
};

let products = document.querySelector('.reproductions_nav');
let newCollection = document.querySelector('.new_collection');
let team = document.querySelector('.team');

document.querySelector('.header_menu_item.newcollection').addEventListener('click', function () { scrol(newCollection); });
document.querySelector('.header_menu_item.catalog').addEventListener('click', function () { scrol(products); });
document.querySelector('.header_menu_item.aboutUs').addEventListener('click', function () { scrol(team); });

let productFra = document.querySelectorAll('.product_items.fra');
let productGer = document.querySelectorAll('.product_items.ger');
let productEng = document.querySelectorAll('.product_items.eng');

display(productFra, productGer, productEng)

document.querySelector('.reproductions_nav_btn.fra').addEventListener('click', function () { display(productFra, productGer, productEng); });
document.querySelector('.reproductions_nav_btn.ger').addEventListener('click', function () { display(productGer, productFra, productEng); });
document.querySelector('.reproductions_nav_btn.eng').addEventListener('click', function () { display(productEng, productFra, productGer); });

//Работа с корзиной
let basketEl = document.querySelector('.basket_product.hide');
let cartCountEl = document.querySelector('.cartCount');
let basketTotalEl = document.querySelector('.basketTotal')
let basketTotalValueEl = document.querySelector('.basketTotalValue');
let basketPlus = document.querySelector('.plus');
let basketMinus = document.querySelector('.minus');

document.querySelector('.header_menu_item.basket').addEventListener('click', () => {
    basketEl.classList.toggle('hide');
});

document.addEventListener('click', event => {
    if (event.target.classList.contains('product_items_btn')) {
        const id = +event.target.dataset.id;
        const name = event.target.dataset.name;
        const price = +event.target.dataset.price;
        addProduct(id, name, price);
    };
});

const basket = {};
function addProduct(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        }
    }
    basket[id].count++;
    cartCountEl.textContent = totalCount();
    basketTotalValueEl.textContent = totalPrice().toFixed(2);
    renderProductInBasket(id);
}

function totalCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function totalPrice() {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId = "${id}"]`)
    if (!basketRowEl) {
        return renderNewProductInBasket(id);
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
    <div class = "basketRow" data-productId = '${productId}'>
        <div>${basket[productId]?.name}
        </div>
        <div>
            <span class = "productCount">${basket[productId]?.count}</span> шт.
        </div>
        <div>${basket[productId]?.price}</div>
        <div>
            <span class="productTotalRow">${(basket[productId]?.price * basket[productId]?.count)}</span>
        </div>
    </div>
                `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
};




















