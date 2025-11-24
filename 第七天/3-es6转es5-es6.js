class Product {
  static count = 0;
  constructor(name, unitPrice, number) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;
    Product.count++;
  }
  get totalPrice() {
    return this.number * this.unitPrice;
  }

  increase() {
    this.number++;
  }
}
