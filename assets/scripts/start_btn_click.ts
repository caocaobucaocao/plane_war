import { _decorator, Component, director, Node } from 'cc';
import { Logger } from './util/log';
const { ccclass, property } = _decorator;

@ccclass('start_btn_click')
export class start_btn_click extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    public onClick() {
        Logger.info("to_02_game_scene");
        director.loadScene("01_start")
    }
}


