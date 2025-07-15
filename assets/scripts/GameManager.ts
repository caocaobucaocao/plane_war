import { _decorator, Component, instantiate, Node } from 'cc';
import { Logger } from './util/log';
const { ccclass, property } = _decorator;
import { EventTarget } from 'cc';
import { enemy } from './enemy';
@ccclass('GameManager')
export class GameManager extends Component {
    @property
    bumbNumber: number = 0
    private static ins: GameManager = null;
    private static eventManager: EventTarget = null;
    public static getIns() {
        if (this.ins == null) {
            Logger.info("get GameManager")
            this.ins = new GameManager()
            return this.ins
        } else {
            return this.ins
        }
    }
    public static getEventManager() {
        if (this.eventManager == null) {
            Logger.info("get getEventManager")
            this.eventManager = new EventTarget()
            return this.eventManager
        } else {
            return this.eventManager
        }
    }
    start() {

    }

    update(deltaTime: number) {

    }
    public addBumb() {
        Logger.info("增加炸弹", { 数量: this.bumbNumber })
        this.bumbNumber += 1
        GameManager.eventManager.emit("ADD_BOMB", this.bumbNumber)
    }
    /**
     * getHurt
     */
    public getHurt(value: number) {
        Logger.info("受伤", { 生命值: value })
        GameManager.eventManager.emit("GET_HURT", value)
    }

    public strike(value: number) {
        Logger.info("击毁", { 得分: value })
        GameManager.eventManager.emit("STRICK_ENEMY", value)
    }
}


