import {def} from "./utils";
const arrayPrototype=Array.prototype;
export const arrayMethods:any=Object.create(arrayPrototype);
const menthodsNeedChange=[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
menthodsNeedChange.forEach(methodName=>{
      const original=arrayPrototype[methodName as any];
      def(arrayMethods,methodName,function () {
          const result=original.apply(this,arguments);
          const ob=this.__ob__;
          const args:any=[...(arguments as any)];
          let inserted:Array<any>=new Array<any>();
          switch (methodName) {
              case 'push':
              case 'unshift':
                  inserted=args;
                  break;
              case 'splice':
                  inserted=args.splice(2);
          };
          if(inserted){
              ob.observeArray(inserted);
          }
          console.log("啦啦啦啦");
          ob.dep.notify();
          return result;
      },false)
});
