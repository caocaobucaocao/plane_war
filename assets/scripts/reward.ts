import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { Logger } from './util/log';
const { ccclass, property } = _decorator;


export enum RewardType {
    One,
    two
}
@ccclass('reward')
export class reward extends Component {
    @property
    speed: number = 0
    @property
    rewardType = RewardType.One
    start() {
    }

    update(deltaTime: number) {
        const p = this.node.getPosition();
        Logger.info("奖励开始更新", { 速度: this.speed, 位置: p })
        let tar_y = p.y - deltaTime * this.speed
        this.node.setPosition(p.x, tar_y, p.z);
        Logger.info("奖励结束更新", { 位置: p })
        if (this.node.getPosition().y < -850) {
            Logger.info("奖励销毁", { 位置: p })
            this.node.destroy()
        }
    }
}


