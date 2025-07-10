import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('start_btn_click')
export class start_btn_click extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    public onClick(){
        console.log(`start btn click`)
        director.loadScene("02_game_scene")
    }
}


