import { _decorator, Component, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static ins: GameManager = null
    public static getIns() {
        if (this.ins) {
            return this.ins
        } else {
            return new GameManager()
        }
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


