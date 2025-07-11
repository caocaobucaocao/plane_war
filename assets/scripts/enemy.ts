import { _decorator, Animation, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Scheduler } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('enemy')
export class enemy extends Component {
    flag: number = 0
    @property
    hp: number = 1
    @property
    speed: number = 10;
    @property(Animation)
    anima: Animation
    @property(String)
    aniHit: string = ""
    @property(String)
    aniDown: string = ""
    collider: Collider2D = null
    start() {
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            console.log("注册成功");
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('子弹击中')
        this.hp = this.hp - 1;
        otherCollider.enabled=false
        otherCollider.destroy()
        console.log('子弹销毁')
        if (this.hp > 0) {
            console.log("血量健康")
            this.anima.play(this.aniHit)
        }
        else {
            console.log("血量为0")
            this.anima.play(this.aniDown);
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 1)
            this.collider.enabled = false;
        }

    }

    update(deltaTime: number) {
        if (this.hp > 0) {
            const p = this.node.getPosition();
            this.node.setPosition(p.x, p.y - deltaTime * this.speed, p.z);
        }

        if (this.node.getPosition().y < -850) {
            console.log("超出边界")
            this.node.destroy()
        }

    }
    protected onDestroy(): void {

        if (this.collider) {
            console.log('解除 碰撞事件')
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            console.log("节点销毁")
        }
    }
}


