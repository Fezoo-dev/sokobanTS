class vector2 {
    readonly x: number;
    readonly y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static zero: vector2 = new vector2();
}