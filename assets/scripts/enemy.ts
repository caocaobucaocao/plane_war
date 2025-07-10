import { _decorator, Animation, Collider2D, Component, Contact2DType, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemy')
export class enemy extends Component {
    @property
    hp:number=1
    @property
    speed:number=10;
    @property(Animation)
    down_anima:Animation

    collider:Collider2D=null
    start() {
        // 注册单个碰撞体的回调函数
        this.collider= this.getComponent(Collider2D);
     if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact() {
        console.log('onBeginContact')
        this.hp=this.hp-1
        this.down_anima.play()
        if(this.collider){
            this.collider.enabled=false
            console.log("collider=false")
        }
    }

    update(deltaTime: number) { 
        console.log('enemy_0_update')
        if(this.hp>0){
            const p=this.node.getPosition()
            this.node.setPosition(p.x,p.y-deltaTime*this.speed,p.z)
        }  
    }
    protected onDestroy(): void {
        if(this.collider){
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
}


