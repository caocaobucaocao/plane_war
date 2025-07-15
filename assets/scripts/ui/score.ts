import { _decorator, Component, Label, log, Node } from 'cc';
import { GameManager } from '../GameManager';
import { Logger } from '../util/log';
const { ccclass, property } = _decorator;

@ccclass('score')
export class score extends Component {
    @property(Label)
    text: Label = null;
    start() {
        GameManager.getEventManager().on("STRICK_ENEMY", this.change, this);
    }
    change(value: number) {
        Logger.info("score_change", { 分数: this.text.string })
        Logger.info("score_change", { 得分: value })
        let temp = Number(this.text.string)
        Logger.info("score_change", { "temp": temp })
        temp = temp + value
        this.text.string = temp.toString()
    }
    update(deltaTime: number) {

    }
}


