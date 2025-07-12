import { _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum BultType{
    "one",
    "double",
};

@ccclass('player')
export class player extends Component {

    @property
    shotRate: number = 0.5
    @property
    shotTime:number=0
    @property(Prefab)
    bullet1_prefab:Prefab=null
    @property(Prefab)
    bullet2_prefab:Prefab=null
    @property(Node)
    bult_1_pos=null
    @property(Node)
    bult_2_pos=null
    @property(Node)
    bult_3_pos=null
    @property(Node)
    bullet_container:Node=null
    @property()
    bult_type:BultType=BultType.one;
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.touch_action, this)

    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.touch_action, this)
    }

    touch_action(event: EventTouch) {
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
        switch (this.bult_type){
            case BultType.one:
                this.oneBult(dt)
                break
            case BultType.double:
                this.dowbleBult(dt)
                break

        }
    }
    oneBult(dt:number){
        this.shotTime+=dt
        if(this.shotTime>this.shotRate){
            this.shotTime=0
            let b1=instantiate(this.bullet1_prefab)
            this.bullet_container.addChild(b1)
            b1.setWorldPosition(this.bult_1_pos.worldPosition)
        }
    }
    dowbleBult(dt:number){
        this.shotTime+=dt
        if(this.shotTime>this.shotRate){
            this.shotTime=0
            let b2=instantiate(this.bullet2_prefab)
            this.bullet_container.addChild(b2)
            b2.setWorldPosition(this.bult_2_pos.worldPosition)
            let b3=instantiate(this.bullet2_prefab)
            this.bullet_container.addChild(b3)
            b3.setWorldPosition(this.bult_3_pos.worldPosition)
        }
    }
}

