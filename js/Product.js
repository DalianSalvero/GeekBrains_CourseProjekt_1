class Product {
    constructor(id, title, price, img = 'https://placehold.it/260x280', container = '#product-box') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container = container;
        this._render();
    }

    _render() {
        let $catalogBlock = $('<div/>', {
            class: 'catalog-block'
        });
        let $product = $('<a/>', {
            class: 'product'
        });
        let $img = $(`<img class="img-catalog-block" src="${this.img}" alt="product">`);
        let $productText = $('<div/>', {
            class: 'product-text'
        });
        let $name = $(`<p class="product-name">${this.title}</p>`);
        let $price = $(`<p class="product-price">$${this.price}</p>`);
        let $addToCart = $('<div class="add-to-cart"><a class="add-to-cart-a" href="#">' +
            '<img src="img/cart-2.svg" alt="add-img" class="add-img"><span class="text-add">' +
            'Add to Cart</span></a></div>', {
            'data-id': this.id,
            'data-name': this.title,
            'data-price': this.price,
            'data-img': this.img
        });

        $img.appendTo($product);
        $name.appendTo($productText);
        $price.appendTo($productText);
        $productText.appendTo($product);
        $product.appendTo($catalogBlock);
        $addToCart.appendTo($catalogBlock);
        $(this.container).append($catalogBlock)
    }
}