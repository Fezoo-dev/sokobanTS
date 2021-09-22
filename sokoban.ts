var sokoban: Sokoban;

class Sokoban implements IObserver<Game>{
    private readonly root: HTMLElement;
    private readonly inputController: InputController;
    
    playerMovement: PlayerMovement | null = null;

    constructor(root: HTMLElement, startButton: HTMLButtonElement){
        startButton.onsubmit = this.startGame;
        this.root = root;
        this.inputController = new InputController(window);
    }

    notify(observable: Game): void {
        observable.unsubscribe(this);
        this.inputController.releaseAllKeys();
        alert(`You won! Moves: ${this.playerMovement?.getMoves()}`)
    }

    private startGame = (e: Event) => {
        e.preventDefault();

        this.root.textContent = '';
        const lvlModel = new LevelModel("oooxoot\noxootoo\noooo1oo\nooxoooo\noootooo");
        let game = new Game(lvlModel);
        new GameView(game, this.root);
        game.subscribe(this);

        this.playerMovement = new PlayerMovement(game);

        this.inputController.handleKey('w', this.playerMovement.moveUp);
        this.inputController.handleKey('a', this.playerMovement.moveLeft);
        this.inputController.handleKey('s', this.playerMovement.moveDown);
        this.inputController.handleKey('d', this.playerMovement.moveRight);
    }
}

window.onload = function()
{
    console.log('sokoban loaded')
    const startGameButton = document.getElementById("startGame") as HTMLButtonElement;
    const root = document.getElementById("sokoban") as HTMLElement;
    sokoban = new Sokoban(root, startGameButton);
}
