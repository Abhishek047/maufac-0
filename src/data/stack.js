export const UNDERFLOW = 'Underflow';
export class Stack {
    // Array is used to implement stack
    constructor()
    {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length === 0)
            return UNDERFLOW;
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
