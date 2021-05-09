import  {observe} from "./observe";
import Watcher from "./Watcher";
export default function test(){
    let obj:any={
        a:1,
        b:{
            c:2
        }
    };
    observe(obj);
    new Watcher(obj,"b.c",(val:any)=>{
         console.log("XXXXX",val);
    });
    obj.b.c=4;
}

