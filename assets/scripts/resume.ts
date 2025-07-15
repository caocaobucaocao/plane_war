import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('resume')
export class resume extends Component {
    start() {
        this.node.active = false
    }

    update(deltaTime: number) {

    }
    public onResume() {
        if (this.node.active) {
            this.node.active = false
        }
        else {
            this.node.active = true
        }
    }
}


