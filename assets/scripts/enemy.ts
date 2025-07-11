import { _decorator, Animation, Collider2D, Component, Contact2DType, Node, Scheduler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemy')
export class enemy extends Component {
    @property
    hp: number = 1
    @property
    speed: number = 10;
    @property(Animation)
    down_anima: Animation

    collider: Collider2D = null
    start() {
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            console.log("注册成功");
        }
    }
    onBeginContact() {
        console.log('碰撞回调')
        this.hp = this.hp - 1;
        this.down_anima.play();
        this.scheduleOnce(() => {
            this.collider.enabled = false;
        }, 1)

        if (this.hp <= 0) {
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 1)
        }

    }

    update(deltaTime: number) {
        if (this.hp > 0) {
            const p = this.node.getPosition();
            this.node.setPosition(p.x, p.y - deltaTime * this.speed, p.z);
        }

        if (this.node.getWorldPosition().y < -520) {

            this.node.destroy()
        }

    }
    protected onDestroy(): void {
        console.log('enemy destory')
        if (this.collider) {
            console.log('解除 碰撞事件')
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
}


