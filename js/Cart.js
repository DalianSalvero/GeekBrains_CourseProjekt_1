class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; //Массив для хранения товаров
        this._init(this.source);
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalGoods = $('<div/>', {
            class: 'cart-summary sum-goods'
        });
        let $totalAmount = $('<div class="cart-summary">Total<div class="sum-price"></div><div/>');
        $cartItemsDiv.appendTo($(this.container));
        $totalGoods.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
    }
    _init(source){
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            })
    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id
        });

        $container.append($(`<img src=${product.img} width="72px" height="85px">`));
        $container.append($(`<p class="product-name">${product.name}</p>`));
        $container.append($(`<p class="product-price"><span class="product-quantity">${product.quantity}</span>
        x $${product.price}</p>`));
        let $delBtn = $('<button class="delBtn">&times;</button>');
        $container.append($delBtn);
        $delBtn.click(() => {
            this._remove(product.id_product);
        });
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum(){
        $('.sum-goods').text(`Товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`$${this.amount}`);
    }
    _updateCart(product){
        let $container = $(`div[data-product=${product.id_product}]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`$${product.quantity*product.price}`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        this._renderSum();
    }
    _remove(idProduct){
        let find = this.cartItems.find(product => product.id_product === idProduct);
        if (find.quantity > 1){
            find.quantity--;
            this._updateCart(find);
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $(`div[data-product=${idProduct}]`).remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        this._renderSum();
    }
}