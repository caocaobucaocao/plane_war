import { _decorator, Component, Label, LabelComponent, Node } from 'cc';
import { GameManager } from '../GameManager';
import { Logger } from '../util/log';

const { ccclass, property } = _decorator;

@ccclass('BumbUi')
export class BumbUi extends Component {

    @property(Label)
    lab: Label = null
    start() {
        GameManager.getEventManager().on("ADD_BOMB", this.change,this)
    }

    update(deltaTime: number) {

    }
    change(bumbNum: number) {
        Logger.info("change")
        this.lab.string = bumbNum.toString()
    }
}
