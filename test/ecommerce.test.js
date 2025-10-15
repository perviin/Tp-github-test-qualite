const {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket
} = require('../src/ecommerce');

test('testAdd: ajout d’un produit met à jour le prix total', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  expect(basket.totalPrice).toBe(100);
});

test('testRemove: suppression d’un produit remet le total à zéro', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  expect(basket.totalPrice).toBe(0);
  expect(basket.items.length).toBe(0);
});

test('testAddRemove: ajout puis suppression fonctionne correctement', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  expect(basket.totalPrice).toBe(100);
  expect(basket.items.length).toBe(1);
  removeFromBasket(basket, item);
  expect(basket.totalPrice).toBe(0);
  expect(basket.items.length).toBe(0);
});

test('testTransactionAllowed: autorisation selon le solde', () => {
  const user = { name: 'Perceval', balance: 500 };
  expect(transactionAllowed(user, 400)).toBe(true);
  expect(transactionAllowed(user, 600)).toBe(false);
});

test('testPayBasket: paiement réussi puis refusé', () => {
  const user = { name: 'Perceval', balance: 500 };
  const basket = new Basket();
  const item = { name: 'Carte graphique', price: 300 };
  addToBasket(basket, item);

  payBasket(user, basket);
  expect(user.balance).toBe(200);

  payBasket(user, basket);
  expect(user.balance).toBe(200);
});