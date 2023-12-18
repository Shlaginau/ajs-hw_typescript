import Cart from '../service/Cart';
import Book from "../domain/Book";
import Movie from "../domain/Movie";
import MusicAlbum from "../domain/MusicAlbum";

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('should add items to the cart', () => {
  const cart = new Cart();
  const book = new Book(1001, 'War and Peace', 'Leo Tolstoy', 1225, 2000);
  const musicAlbum = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
  const movie = new Movie(1110, 'The Avengers', 2012, 'USA', 'Avengers Assemble!', 'fantasy, action, adventure', '137 min / 02:17', 100);

  cart.add(book);
  cart.add(musicAlbum);
  cart.add(movie);

  expect(cart.items.length).toBe(3);
  expect(cart.items).toContain(book);
  expect(cart.items).toContain(musicAlbum);
  expect(cart.items).toContain(movie);
});

test('should calculate total price correctly', () => {
  const cart = new Cart();
  const book = new Book(1001, 'War and Peace', 'Leo Tolstoy', 1225, 2000);
  const musicAlbum = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
  const movie = new Movie(1110, 'The Avengers', 2012, 'USA', 'Avengers Assemble!', 'fantasy, action, adventure', '137 min / 02:17', 100);

  cart.add(book);
  cart.add(musicAlbum);
  cart.add(movie);

  expect(cart.calculateTotalPrice()).toBe(3000);
});

test('should calculate discounted total price correctly', () => {
  const cart = new Cart();
  const book = new Book(1001, 'War and Peace', 'Leo Tolstoy', 1225, 2000);
  const musicAlbum = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
  const movie = new Movie(1110, 'The Avengers', 2012, 'USA', 'Avengers Assemble!', 'fantasy, action, adventure', '137 min / 02:17', 100);

  cart.add(book);
  cart.add(musicAlbum);
  cart.add(movie);

  expect(cart.calculateDiscountedTotalPrice(50)).toBe(1500);
});

test('should remove item by id', () => {
  const cart = new Cart();
  const book = new Book(1001, 'War and Peace', 'Leo Tolstoy', 1225, 2000);
  const musicAlbum = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
  const movie = new Movie(1110, 'The Avengers', 2012, 'USA', 'Avengers Assemble!', 'fantasy, action, adventure', '137 min / 02:17', 100);

  cart.add(book);
  cart.add(musicAlbum);
  cart.add(movie);

  cart.removeItemById(1008);

  expect(cart.items.length).toBe(2);
  expect(cart.items).toContain(book);
  expect(cart.items).not.toContain(musicAlbum);
  expect(cart.items).toContain(movie);
});

test('should throw an error for invalid discount', () => {
  const cart = new Cart();

  expect(() => {
    cart.calculateDiscountedTotalPrice(-1);
  }).toThrow('Discount should be between 0 and 100');

  expect(() => {
    cart.calculateDiscountedTotalPrice(101);
  }).toThrow('Discount should be between 0 and 100');
});