import vnode from "./vnode";
export default function (sel:any,data:any,c:any) {
    if(arguments.length!=3)
        throw new Error("对不起，函数必须传入3个参数，我们是低配版的h函数");
     if (typeof c=='string'||typeof c=='number'){
          //说明调用h函数是形态1
          return vnode(sel,data,[],c,undefined);
     }else if(Array.isArray(c)){
         let children:Array<any>=new Array<any>();
         for (let i=0;i<c.length;i++){
             if(!(typeof c[i]=='object'&&c[i].hasOwnProperty("sel"))) throw new Error("传入的第3个参数类型不对");
             children.push(c[i]);
         }
         return vnode(sel,data,children,undefined,undefined)
     }else if(typeof c=='object'&&c.hasOwnProperty('sel')){

     }else{
         throw new Error("传入的第3个参数类型不对");
     }

}