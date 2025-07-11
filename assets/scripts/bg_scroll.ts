import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bg_scroll')
export class bg_scroll extends Component {
    @property(Node)
    bg01: Node = null
    @property(Node)
    bg02: Node = null
    @property
    speed: number = 10
    start() {

    }

    update(deltaTime: number) {
        let pos01 = this.bg01.position
        this.bg01.setPosition(pos01.x, pos01.y - this.speed * deltaTime, pos01.z)
        let pos02 = this.bg02.position
        this.bg02.setPosition(pos02.x, pos02.y - this.speed * deltaTime, pos02.z)
        if (pos01.y < -852) {
            this.bg01.setPosition(pos01.x, 0, pos01.z)
        }
        if (pos02.y < 0) {
            this.bg02.setPosition(pos02.x, 852, pos02.z)
        }
    }
}


