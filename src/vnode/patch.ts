import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from "./patchVnode"
import {Vnode} from "./types";
export default function pacth(oldVnode:Vnode,newVnode:Vnode) {
    //如果vnode是一个元素
    if(oldVnode.sel==''||oldVnode.sel==undefined){
        oldVnode=vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode);
    }
    //判断oldVnode和newVnode是不是同一个节点
    if(oldVnode.key==newVnode.key&&oldVnode.sel==newVnode.sel){
         patchVnode(oldVnode,newVnode);
    }else{
        let newVnodElm:any = createElement(newVnode);
        oldVnode.elm.parentNode.insertBefore(newVnodElm,oldVnode.elm);
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}