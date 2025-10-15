const {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket
} = require('../src/ecommerce');

function testAdd() {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  return basket.totalPrice === 100;
}

function testRemove() {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  return basket.totalPrice === 0 && basket.items.length === 0;
}

function testAddRemove() {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  const added = basket.totalPrice === 100 && basket.items.length === 1;
  removeFromBasket(basket, item);
  const removed = basket.totalPrice === 0 && basket.items.length === 0;
  return added && removed;
}

function testTransactionAllowed() {
  const user = { name: 'Perceval', balance: 500 };
  const allowed = transactionAllowed(user, 400) === true;
  const refused = transactionAllowed(user, 600) === false;
  return allowed && refused;
}

function testPayBasket() {
  const user = { name: 'Perceval', balance: 500 };
  const basket = new Basket();
  const item = { name: 'Carte graphique', price: 300 };
  addToBasket(basket, item);

  payBasket(user, basket);
  const firstOK = user.balance === 200;

  payBasket(user, basket);
  const secondFail = user.balance === 200;

  return firstOK && secondFail;
}

function testAppEcommerce() {
  let success = testAdd();
  success = success && testRemove();
  success = success && testAddRemove();
  success = success && testTransactionAllowed();
  success = success && testPayBasket();

  if (success) {
    console.log("Tests passés");
  } else {
    console.log("Tests échoués");
  }
}

testAppEcommerce();