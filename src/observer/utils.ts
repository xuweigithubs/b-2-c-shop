export const def=function (obj:any,key:any,value:any,enumerable:boolean) {
        Object.defineProperty(obj, key,{
            value,
            enumerable,
            writable:true,
            configurable:true
        })
}
export const parsePath=function (expression:any) {
      let segments=expression.split(".");
      return (obj)=>{
          for (let i=0;i<segments.length;i++){
              if(!obj) return;
              obj=obj[segments[i]];
          }
          return obj;
      }
}