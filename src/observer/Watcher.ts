let uid=0;
import {parsePath} from "./utils";
import Dep from "./Dep";
export default class Watcher{
    private target:any;
    private getter:any;
    private value:any;
    private callback:any;
    private id:any;
    constructor(target:any,expression:any,callback:any){
        this.id=uid++;
        this.target=target;
        this.getter=parsePath(expression);
        this.callback=callback;
        this.value=this.get();
    }
    update(){
        this.run();
    }
    get(){
        const obj=this.target;
        Dep.target=this;
        let value;
        try{
            value=this.getter(obj);
        }finally {
            Dep.target=null;
        }
        return value;
    }
    run(){
       this.getAndInvoke(this.callback);
    }
    getAndInvoke(cb:any){
        const value=this.get();
        if(value!=this.value||typeof value=='object'){
              const oldValue=this.value;
              this.value=value;
              cb.call(this.target,value,oldValue);
        }
    }

}