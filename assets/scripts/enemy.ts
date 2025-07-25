import { _decorator, Animation, CCString, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Scheduler } from 'cc';
import { bullet } from './bullet';
import { Logger } from './util/log';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;
@ccclass('enemy')
export class enemy extends Component {

    @property
    hp: number = 1
    @property
    speed: number = 10;
    @property(Animation)
    anima: Animation
    @property(CCString)
    aniHit = ""
    @property(CCString)
    aniDown = ""
    collider: Collider2D = null
    @property
    score: number = 10
    start() {
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            Logger.info("撞击事件注册")
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        Logger.info("撞击事件处理开始")
        this.hp = this.hp - 1;
        if (otherCollider.getComponent(bullet)) {
            Logger.info("enemy与子弹碰撞")
            otherCollider.node.destroy()
        }

        if (this.hp > 0) {
            this.anima.play(this.aniHit.toString())
        }
        else {
            GameManager.getIns().strike(this.score)
            this.anima.play(this.aniDown.toString());
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 1)
            this.collider.enabled = false;
        }
        Logger.info("撞击事件处理结束")
    }

    update(deltaTime: number) {
        const p = this.node.getPosition();
        Logger.info("子弹开始更新", { 血量: this.hp, 位置: p })
        let tar_y = p.y - deltaTime * this.speed
        if (this.hp > 0) {
            this.node.setPosition(p.x, tar_y, p.z);
        }
        Logger.info("子弹结束更新", { 血量: tar_y, 位置: p })
        if (this.node.getPosition().y < -850) {
            this.node.destroy()
        }
    }
    protected onDestroy(): void {
        Logger.info("enemy_onDestroy")
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    toString(): string {
        return `enemy(血量=${this.hp}, 速度=${this.speed})`;
    }
}


