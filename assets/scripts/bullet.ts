import { _decorator, Collider2D, Component, Node, Sprite } from 'cc';
import { Logger } from './util/log';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    @property
    speed: number = 200
    start() {

    }

    update(deltaTime: number) {
        Logger.info('子弹开始更新', {
            位置: this.node.position
        })
        this.updatePos(deltaTime);
    }

    private updatePos(deltaTime: number) {
        const pos = this.node.position;
        this.node.setPosition(this.node.x, this.node.y + this.speed * deltaTime, this.node.z);
        Logger.info('子弹更新位置', {
            位置: this.node.position
        });
        if (pos.y > 780) {
            this.getComponent(Sprite).enabled = false;
            this.getComponent(Collider2D).enabled = false;
        }
    }
}