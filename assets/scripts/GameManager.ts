import { _decorator, Component, instantiate, Node } from 'cc';
import { Logger } from './util/log';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property
    bumbNumber: number = 0
    private static ins: GameManager = null
    public static getIns() {
        if (this.ins == null) {
            Logger.info("get GameManager")
            this.ins = new GameManager()
            return this.ins
        } else {
            return this.ins
        }
    }
    start() {

    }

    update(deltaTime: number) {

    }
    public addBumb() {
        Logger.info("增加炸弹", { 数量: this.bumbNumber })
        this.bumbNumber += 1
    }
}


