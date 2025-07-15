import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pause')
export class pause extends Component {
    start() {
        this.node.active = true
    }

    update(deltaTime: number) {

    }
    public onPause() {
        if (this.node.active) {
            this.node.active = false;
        } else {
            this.node.active = true
        }
    }
}


