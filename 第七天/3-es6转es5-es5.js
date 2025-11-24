var Product = (function () {
  function Product(name, unitPrice, number) {
    if (Object.getPrototypeOf(this) !== Product.prototype) {
      throw new TypeError(
        "Class constructor Product cannot be invoked without new"
      );
    }

    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;
    Product.count++;

    Object.defineProperty(this, "totalPrice", {
      get() {
        return this.number * this.unitPrice;
      },
      enumerable: false,
    });
  }

  Product.count = 0;

  Object.defineProperty(Product.prototype, "increase", {
    value: function () {
      if (
        Object.getPrototypeOf(this) === Product.prototype.increase.prototype
      ) {
        throw new TypeError("increase is not a constructor");
      }
      this.number++;
    },
    enumerable: false,
  });
  return Product;
})();

const p = new Product();

Product();
