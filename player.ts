class PlayerMovement{
    private moves: number = 0;
    private cellIndex: number;
    private game: Game;

    private readonly left: vector2 = new vector2(-1, 0);
    private readonly right: vector2 = new vector2(1, 0);
    private readonly up: vector2 = new vector2(0, -1);
    private readonly down: vector2 = new vector2(0, 1);

    constructor(game: Game){
        this.game = game;
        this.cellIndex = game.map.findIndex((c, i, arr) => c.blockType == BlockType.player);
        if(this.cellIndex < 0)
            throw 'wrong level description. player not found.';
    }

    getMoves(): number {
        return this.moves;
    }

    moveUp = () =>{
        this.tryMove(this.up);
    }
    moveDown = () =>{
        this.tryMove(this.down);
    }
    moveLeft = () =>{
        this.tryMove(this.left);
    }
    moveRight = () =>{
        this.tryMove(this.right);
    }
    
    private tryMoveIntoFreeSpace(direction: vector2): vector2 | null{
        var newPos = this.getCheckedPosition(direction);
        if(!this.cellExists(newPos))
            return null;

        if (this.isEmpty(newPos)) {
            this.moveTo(newPos);
            return null;
        }

        return this.isBlock(newPos) ? newPos : null;
    }

    private tryMove(direction: vector2):void{
        const newPos = this.tryMoveIntoFreeSpace(direction);
        if(newPos == null)
            return;

        const neighbour = this.neighbourPosition(newPos, direction);
        if(this.cellExists(neighbour) && this.isEmpty(neighbour))
        {
            this.game.moveBlock(this.getIndexByVector2(newPos), this.getIndexByVector2(neighbour));
            this.moveTo(newPos);
        }
    }

    moveTo(position: vector2): void{
        this.cellIndex = this.game.moveBlock(this.cellIndex, this.getIndexByVector2(position));
        this.moves++;
    }

    private getIndexByVector2(cell: vector2): number{
        return this.game.width * cell.y + cell.x;
    }

    private neighbourPosition(position: vector2, delta: vector2): vector2{
        return new vector2(position.x + delta.x, position.y + delta.y);
    }

    private getCheckedPosition(delta: vector2): vector2{
        const cell = this.game.map[this.cellIndex];
        return new vector2(cell.x + delta.x, cell.y + delta.y);
    }

    private cellExists(position: vector2): boolean{
        return position.x >= 0 && position.x < this.game.width
            && position.y >= 0 && position.y < this.game.height;
    }

    private isBlock(position: vector2): boolean{
        const cell = this.game.map[this.getIndexByVector2(position)];
        return cell.blockType == BlockType.block;
    }

    private isEmpty(position: vector2): boolean{
        const cell = this.game.map[this.getIndexByVector2(position)];
        return cell.blockType == BlockType.empty;
    }
}
