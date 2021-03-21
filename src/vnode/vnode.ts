import {Vnode} from "./types";
export default function (sel:any,data:any,children:Array<Vnode>,text:any,elm:any):Vnode {
    const key=data.key;
    return {
       sel,
       data,
       children,
       text,
       elm,
       key,
       tagName:""
    }
}