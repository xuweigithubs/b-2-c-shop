import defineReactive from "./defineReactive";
import {def} from "./utils";
import {observe} from "./observe";
import {arrayMethods} from './array';
import Dep from "./Dep";
export default class Observer{
    public dep:any;
    constructor(value:any){
          this.dep=new Dep();
          //给实例就是自己实例上
          def(value,'__ob__',this,false);
          if(Array.isArray(value)){
               Object.setPrototypeOf(value,arrayMethods);
               this.observeArray(value);
          }else{
              this.walk(value);
          }
    }
    walk(value:any){
        for(let key in value){
            defineReactive(value,key);
        }
    }
    //数组遍历
    observeArray(arr:Array<any>){
       for (let i=0,l=arr.length;i<l;i++){
          //逐项observe
           observe(arr[i]);
       }
    }

}