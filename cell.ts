class Cell implements IObservable<Cell>{
    x: number;
    y: number;
    cellType: CellType;
    blockType: BlockType;
    observer: IObserver<Cell> | null = null;

    constructor(x: number, y: number, cellType: CellType, blockType: BlockType){
        this.x = x;
        this.y = y;
        this.cellType = cellType;
        this.blockType = blockType;
    }
    subscribe(observer: IObserver<Cell>): void {
        this.observer = observer;
    }
    unsubscribe(observer: IObserver<Cell>): void {
        this.observer = null;
    }

    setBlock(blockType: BlockType): void{
        this.blockType = blockType;
        if(this.observer)
            this.observer.notify(this);
    }
    
    removeBlock(): BlockType{
        const result = this.blockType;
        this.blockType = BlockType.empty;
        if(this.observer)
            this.observer.notify(this);
        return result;
    }
}