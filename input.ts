class InputController {
    private keysMap: any = {};
    
    constructor(window: Window){
        window.onkeydown = (ev: KeyboardEvent) => {
            if (this.keysMap.hasOwnProperty(ev.key))
                this.keysMap[ev.key]()
        }
    }

    handleKey (key: string, callback: (k: string) => void) {
        this.keysMap[key] = callback
    }

    releaseAllKeys(): void{
        this.keysMap = {};
    }
}
