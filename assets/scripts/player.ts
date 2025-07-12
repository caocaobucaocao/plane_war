import { _decorator, Animation, Collider2D, Component, Contact2DType, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum BultType {
    "one",
    "double",
};

@ccclass('player')
export class player extends Component {
    @property
    hp: number = 3
    @property
    shotRate: number = 0.5
    @property
    shotTime: number = 0
    @property(Prefab)
    bullet1_prefab: Prefab = null
    @property(Prefab)
    bullet2_prefab: Prefab = null
    @property(Node)
    bult_1_pos = null
    @property(Node)
    bult_2_pos = null
    @property(Node)
    bult_3_pos = null
    @property(Node)
    bullet_container: Node = null
    @property()
    bult_type: BultType = BultType.one;
    collider: Collider2D = null
    @property(Animation)
    anima: Animation
    @property(String)
    aniHit: string = ""
    @property(String)
    aniDown: string = ""
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.touch_action, this)
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            console.log("player 碰撞注册成功");
        }

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('敌机碰撞击中')
        this.hp = this.hp - 1;
        console.log('player血量降低:' + this.hp)
        if (this.hp > 0) {
            console.log("player血量健康")
            this.anima.play(this.aniHit)
        } else {
            console.log("player血量为0")
            this.anima.play(this.aniDown);
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 1)
        }
    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.touch_action, this)
        // 注册单个碰撞体的回调函数
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            console.log("player 注销成功");
        }
    }

    touch_action(event: EventTouch) {
        if (this.hp <= 0) return;
        const p = this.node.position
        let tar_pos = new Vec3(p.x + event.getDeltaX(), p.y + event.getDeltaY(), p.z)
        let ft_pos = this.node.getParent().getPosition()
        if (tar_pos.x < -186) {
            tar_pos.x = -186
        }
        if (tar_pos.x > 193)
            tar_pos.x = 193

        if (tar_pos.y < -368) {
            tar_pos.y = -368
        }
        if (tar_pos.y > 376) {
            tar_pos.y = 376
        }
        this.node.setPosition(tar_pos.x, tar_pos.y + event.getDeltaY(), p.z)
    }
    protected update(dt: number): void {
        switch (this.bult_type) {
            case BultType.one:
                this.oneBult(dt)
                break
            case BultType.double:
                this.dowbleBult(dt)
                break

        }
    }
    oneBult(dt: number) {
        this.shotTime += dt
        if (this.shotTime > this.shotRate) {
            this.shotTime = 0
            let b1 = instantiate(this.bullet1_prefab)
            this.bullet_container.addChild(b1)
            b1.setWorldPosition(this.bult_1_pos.worldPosition)
        }
    }
    dowbleBult(dt: number) {
        this.shotTime += dt
        if (this.shotTime > this.shotRate) {
            this.shotTime = 0
            let b2 = instantiate(this.bullet2_prefab)
            this.bullet_container.addChild(b2)
            b2.setWorldPosition(this.bult_2_pos.worldPosition)
            let b3 = instantiate(this.bullet2_prefab)
            this.bullet_container.addChild(b3)
            b3.setWorldPosition(this.bult_3_pos.worldPosition)
        }
    }
}

