import Watcher from "./Watcher";
let uid=0;
export default class Dep{
    public static target;
    public subs=new Array<Watcher>();
    private id:any;
    constructor(){
        this.id=uid++;
        this.subs=[];
    }
    depend(){
        //自定义全局变量,全局唯一，没有歧义
        if(Dep.target){
            this.addSub(Dep.target);
        }
    }
    //添加订阅
    addSub(sub:Watcher){
       this.subs.push(sub);
    }
    //通知更新
    notify(){
        console.log("notify被执行");
        const subs=this.subs.slice();
        for (let i=0,l=subs.length;i<l;i++){
            subs[i].update();
        }
    }
}