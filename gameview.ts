class CellView implements IObserver<Cell>{
    html: HTMLElement;

    constructor(cell: Cell, html: HTMLElement){
        cell.subscribe(this);
        this.html = html;
        this.notify(cell);
    }

    notify(cell: Cell): void {
        this.html.textContent = '';
        if(cell.blockType != BlockType.empty)
            this.addBlockIntoCell(cell, this.html);
    }

    private cssBlock(cell: Cell): string{
        return `block${cell.blockType}`
    }

    private addBlockIntoCell(cell: Cell, view: HTMLElement) {
        let blockView = document.createElement("div");
        blockView.innerHTML = cell.blockType.toString();
        view.appendChild(blockView).classList.add(this.cssBlock(cell));
    }
}


class GameView{
    cellViews: CellView[] = [];
    gameCache: Game;

    constructor(game: Game, root: HTMLElement){
        this.gameCache = game;
        this.createView(game, root);
    }

    private createView(game: Game, container: HTMLElement): void {
        this.cellViews = new Array(game.map.length);

        container.style.setProperty('--grid-rows', game.height.toString());
        container.style.setProperty('--grid-cols', game.width.toString());
        for (let i = 0; i < game.map.length; i++) {
            const cell = game.map[i];
            let view = document.createElement("div");
            view.classList.add(`cell${cell.cellType}`);
            //cell.innerText = (c + 1).toString();
            container.appendChild(view).classList.add("grid-item");

            this.cellViews[i] = new CellView(cell, view);
        };
    }
}