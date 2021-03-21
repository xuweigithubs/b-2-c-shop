import {Vnode} from "./types";
import patchVnode from "./patchVnode";
import createElement from "./createElement";
export default function updateChildren(parentElm:any,oldVNodes:Array<Vnode>,newVNodes:Array<Vnode>) {
        let oldStartIndex=0;
        let oldEndIndex=oldVNodes.length-1;
        let newStartIndex=0;
        let newEndIndex=newVNodes.length-1;
        //真正的虚拟demo节点
        let oldStartVnode=oldVNodes[0];
        //旧后节点
        let oldEndVnode=oldVNodes[oldEndIndex];
        //新前节点
        let newStartVnode=newVNodes[0];
        //新后节点
        let newEndVnode=newVNodes[newEndIndex];
        //引入比较两个节点是否相同的函数
        function checkSameVnode(oldVnode:Vnode,newVnode:Vnode) {
            return oldVnode.sel==newVnode.sel&&oldVnode.key==newVnode.key;
        }
        //开始大while
        while (oldStartIndex<=oldEndIndex&&newStartIndex<=newEndIndex){
           if(checkSameVnode(oldStartVnode,newStartVnode)){
                patchVnode(oldStartVnode,newStartVnode);
                oldStartVnode=oldVNodes[++oldStartIndex];
                newStartVnode=newVNodes[++newStartIndex];
            }else if(checkSameVnode(oldEndVnode,newEndVnode)){
                patchVnode(oldEndVnode,newEndVnode);
                oldEndVnode=oldVNodes[--oldEndIndex];
                newEndVnode=newVNodes[--newEndIndex];
           }else if(checkSameVnode(oldStartVnode,newEndVnode)){
               patchVnode(oldStartVnode,newEndVnode);
               parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
               oldStartVnode=oldVNodes[++oldStartIndex];
               newEndVnode=newVNodes[--newEndIndex];
           }
           else if(checkSameVnode(oldEndVnode,newStartVnode)){
               patchVnode(oldEndVnode,newStartVnode);
               parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
               oldEndVnode=oldVNodes[--oldEndIndex];
               newStartVnode=newVNodes[++newStartIndex];
           }else{

           }
        }
        //继续看看有没有剩余
       if (newStartIndex<=newEndIndex){
          const before=newVNodes[newEndIndex+1]==null?null:newVNodes[newEndIndex+1].elm;
          //自动排到队尾
          for(let i=newStartIndex;i<=newEndIndex;i++){
              parentElm.insertBefore(createElement(newVNodes[i]),before);
          }
       }else if(oldStartIndex<=oldEndIndex){
           //需要批量删除
           for (let i=oldStartIndex;i<oldEndIndex;i++){
               parentElm.removeChild(oldVNodes[i].elm);
           }
       }
}