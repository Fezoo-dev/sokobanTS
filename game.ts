enum BlockType{
    empty, block, player, wall
}

enum CellType{
    ground, target
}

class Game implements IObservable<Game>{
    map: Cell[];
    readonly width: number;
    readonly height: number;

    observers: IObserver<Game>[] = [];

    constructor(level: LevelModel) {
        this.width = level.data[0].length;
        this.height = level.data.length;
        this.map = new Array(this.width * this.height);
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const description = mapDescription[level.data[row][col]];
                this.map[row * this.width + col] = new Cell(col, row, description.c, description.b);
            }
        }
    }

    subscribe(observer: IObserver<Game>): void {
        this.observers.push(observer)
    }

    unsubscribe(observer: IObserver<Game>): void {
        this.observers = this.observers.filter(subscriber => subscriber !== observer)
    }

    moveBlock(from: number, to: number): number{
        this.map[to].setBlock(this.map[from].removeBlock());
        if(this.isWin())
            this.notify();

        return to;
    }

    private isWin(): boolean{
        return this.map.find(c => c.cellType == CellType.target && c.blockType != BlockType.block) === undefined;
    }

    notify(): void{
        for (const observer of this.observers)
            observer.notify(this);
    }
}

const mapDescription = {
    'o': {c: CellType.ground, b: BlockType.empty},
    'x': {c: CellType.ground, b: BlockType.block},
    '1': {c: CellType.ground, b: BlockType.player},
    'w': {c: CellType.ground, b: BlockType.wall},
    't': {c: CellType.target, b: BlockType.empty},
    '*': {c: CellType.target, b: BlockType.block}
}