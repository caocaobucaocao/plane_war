import { _decorator, Animation, CCInteger, CCString, Collider2D, Component, Contact2DType, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { Logger } from './util/log';
import { reward, RewardType } from './reward';
import { GameManager } from './GameManager';
enum BultType {
    zero,
    one,
    double,
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
    bult_type: BultType = BultType.one
    collider: Collider2D = null
    @property(Animation)
    anima: Animation
    @property(CCString)
    aniHit: string = ""
    @property(CCString)
    aniDown: string = ""
    @property(CCInteger)
    invincible_deadline = 1
    @property
    invincible_count = 0
    isVincible: boolean = false
    // 无敌时间内碰撞计数
    invicibleCollisionCount = 0
    doubleShotTime: number = 0
    @property
    doubleShotTimeCountD = 5
    protected onLoad(): void {
        Logger.info("player 加载")
        input.on(Input.EventType.TOUCH_MOVE, this.touch_action, this)
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            Logger.info("player 注册碰撞事件成功")
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        Logger.info('碰撞开始', { 无敌时间内碰撞: this.invicibleCollisionCount + 1, 血量: this.hp, 状态: this.isVincible, 无敌持续时间: this.invincible_count, 截止: this.invincible_deadline })
        const reward_ex = otherCollider.getComponent(reward)
        if (reward_ex) {
            this.reward_contact(reward_ex);
        } else {
            this.enemyContact();
        }

        Logger.info('碰撞结束', { 无敌时间内碰撞: this.invicibleCollisionCount, 血量: this.hp, 状态: this.isVincible, 无敌持续时间: this.invincible_count, 截止: this.invincible_deadline })
    }
    private reward_contact(reward_ex: reward) {
        Logger.info("奖励碰撞", { 奖励类型: reward_ex.rewardType.toString() });
        switch (reward_ex.rewardType) {
            case RewardType.One:
                this.bult_type = BultType.double;
                this.doubleShotTime = 0;
                break;
            case RewardType.two:
                GameManager.getIns().addBumb()
                break;
        }
        reward_ex.getComponent(Sprite).enabled = false;
        reward_ex.getComponent(Collider2D).enabled = false;
    }

    private enemyContact() {
        this.invicibleCollisionCount += 1;
        if (!this.isVincible) {
            this.isVincible = true;
            this.invincible_count = 0;
            this.hp = this.hp - 1;
            if (this.hp > 0) {
                this.anima.play(this.aniHit);
            } else {
                this.bult_type = BultType.zero;
                this.anima.play(this.aniDown);
                this.scheduleOnce(() => {
                    this.node.destroy();
                }, 1);
            }
        }
    }

    protected onDestroy(): void {
        Logger.info("player 碰撞事件注销");
        input.off(Input.EventType.TOUCH_MOVE, this.touch_action, this)
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    touch_action(event: EventTouch) {

        if (this.hp <= 0) return;
        const p = this.node.position
        let tar_pos = new Vec3(p.x + event.getDeltaX(), p.y + event.getDeltaY(), p.z)
        Logger.info("飞机触摸开始", { 血量: this.hp, 位置: p, 目标位置: tar_pos })
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
        let res_pos = (tar_pos.x, tar_pos.y + event.getDeltaY(), p.z)
        this.node.setPosition(tar_pos.x, tar_pos.y + event.getDeltaY(), p.z)
        Logger.info("飞机触摸结束", { 血量: this.hp, 位置: res_pos, })
    }
    protected update(dt: number): void {
        Logger.info('player更新', {
            '状态': this.isVincible,
            无敌持续时间: this.invincible_count, 截止: this.invincible_deadline, 双发时间计时: this.doubleShotTime
            , 双发截至时间: this.doubleShotTimeCountD
        });
        this.doubleUpdate(dt);
        this.invicibleUpdate(dt);
        this.bultTypeSwitch(dt);

        Logger.info('player更新', {
            '状态': this.isVincible,
            无敌持续时间: this.invincible_count, 截止: this.invincible_deadline
        });
    }
    private bultTypeSwitch(dt: number) {
        switch (this.bult_type) {
            case BultType.zero:
                break;
            case BultType.one:
                this.oneBultSpawn(dt);
                break;
            case BultType.double:
                this.dowbleBultSpawn(dt);
                break;
        }
    }

    private doubleUpdate(dt: number) {
        this.doubleShotTime += dt;
        if (this.doubleShotTime > this.doubleShotTimeCountD) {
            this.bult_type = BultType.one;
        }
    }

    private invicibleUpdate(dt: number) {
        if (this.isVincible) {
            this.invincible_count = this.invincible_count + dt;
        }
        if (this.invincible_count >= this.invincible_deadline) {
            this.isVincible = false;
            this.invicibleCollisionCount = 0;
        }
    }

    oneBultSpawn(dt: number) {
        this.shotTime += dt
        Logger.info("子弹", { 已发射时间: this.shotTime, 发射间隔: this.shotRate })
        if (this.shotTime > this.shotRate) {
            this.shotTime = 0
            let b1 = instantiate(this.bullet1_prefab)
            this.bullet_container.addChild(b1)
            b1.setWorldPosition(this.bult_1_pos.worldPosition)
        }
        Logger.info("子弹", { 已发射时间: this.shotTime, 发射间隔: this.shotRate })
    }
    dowbleBultSpawn(dt: number) {
        this.shotTime += dt
        Logger.info("子弹", { 已发射时间: this.shotTime, 发射间隔: this.shotRate })
        if (this.shotTime > this.shotRate) {
            this.shotTime = 0
            let b2 = instantiate(this.bullet2_prefab)
            this.bullet_container.addChild(b2)
            b2.setWorldPosition(this.bult_2_pos.worldPosition)
            let b3 = instantiate(this.bullet2_prefab)
            this.bullet_container.addChild(b3)
            b3.setWorldPosition(this.bult_3_pos.worldPosition)
        }
        Logger.info("子弹", { 已发射时间: this.shotTime, 发射间隔: this.shotRate })
    }
    toString() {

    }
}

