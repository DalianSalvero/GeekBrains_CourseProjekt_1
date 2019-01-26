$(document).ready(() => {
    //Товары
    let product1 = new Product(1, 'Mango People T-shirt', 52, "img/catalog_f_1.png");
    let product2 = new Product(2, 'Mango People T-shirt', 52, "img/catalog_f_2.png");
    let product3 = new Product(3, 'Mango People T-shirt', 52, "img/catalog_f_3.png");
    let product4 = new Product(4, 'Mango People T-shirt', 52, "img/catalog_f_4.png");
    let product5 = new Product(5, 'Mango People T-shirt', 52, "img/catalog_f_5.png");
    let product6 = new Product(6, 'Mango People T-shirt', 52, "img/catalog_f_6.png");
    let product7 = new Product(7, 'Mango People T-shirt', 52, "img/catalog_f_7.png");
    let product8 = new Product(8, 'Mango People T-shirt', 52, "img/catalog_f_8.png");

    //Корзина
    let cart = new Cart('json/getCart.json');

    //Добавление товара
    $('.add-to-cart').click(e => {
        e.preventDefault();
        cart.addProduct(e.target);
    });
});