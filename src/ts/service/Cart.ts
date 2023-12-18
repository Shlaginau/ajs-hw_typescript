import Buyable from '../domain/Buyable';

export default class Cart {
    private cartItems: Buyable[] = [];

    add(item: Buyable): void {
        this.cartItems.push(item);
    }

    get items(): Buyable[] {
        return [...this.cartItems]; 
    }

    calculateTotalPrice(): number {
        return this.cartItems.reduce((total, item) => total + item.price, 0);
    }

    calculateDiscountedTotalPrice(discount: number): number {
        if (discount < 0 || discount > 100) {
            throw new Error("Discount should be between 0 and 100");
        }
        
        const totalPrice = this.calculateTotalPrice();
        return Math.round(totalPrice * (100 - discount)/100);
    }

    removeItemById(id: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
    }
}