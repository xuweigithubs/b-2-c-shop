import createElement from "./createElement";
import {Vnode} from "./types";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode:Vnode,newVnode:Vnode) {
    if(oldVnode==newVnode) return;
    //判断新vnode有没有text属性
    if(newVnode.text!=undefined && (newVnode.children==undefined||newVnode.children.length==0)){
        if(newVnode.text!=oldVnode.text){
            oldVnode.elm.innerText=newVnode.text;
        }
    }else{
        if(oldVnode.children!=undefined&&oldVnode.children.length>0){
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children);
        }else{
            //老的没有,新的有，直接清空文字，清空dom
            oldVnode.elm.innerText="";
            for(let i=0;i<newVnode.children.length;i++){
                let chDom:any=createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(chDom);
            }
        }
    }
}