import { _decorator, Component, Label, log, Node } from 'cc';
import { GameManager } from '../GameManager';
import { Logger } from '../util/log';
const { ccclass, property } = _decorator;

@ccclass('healthPoint')
export class healthPoint extends Component {
    @property(Label)
    hp: Label = null
    start() {
        GameManager.getEventManager().on("GET_HURT", this.change, this)
    }
    change(value: number) {
        Logger.info("healthPoint-change", { 生命值: value })
        this.hp.string = value.toString()
    }

    update(deltaTime: number) {

    }
}


