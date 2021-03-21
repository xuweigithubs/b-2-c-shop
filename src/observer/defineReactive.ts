//定义响应式函数
import {observe} from "./observe";
import Dep from "./Dep"
export  default  function defineReactive(data:any,key:any,value?:any) {
    let dep=new Dep();
    if(arguments.length==2){
        value=data[key];
    }
    let childOb=observe(value);
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get(){
            if(Dep.target){
                dep.depend();
                if(childOb){
                    childOb.dep.depend();
                }
            }
            return value;
        },
        set(newValue: any): void {
            if(value===newValue){
                return;
            }
            value=newValue;
            childOb=observe(newValue);
            dep.notify();
        }
    });
}