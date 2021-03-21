//真正创建节点
export default function createElement(vnode:any) {
    let domNode=document.createElement(vnode.sel);
    if(vnode.text!=''&&(vnode.children==undefined||vnode.children.length==0)){
         domNode.innerText=vnode.text;
    }else if(Array.isArray(vnode.children)&&vnode.children.length>0){
         //需要递归创建
        for(let i=0;i<vnode.children.length;i++){
            let ch:any=vnode.children[i];
            let chElm:any=createElement(ch);
            domNode.appendChild(chElm);
        }
    }
    vnode.elm=domNode;
    return vnode.elm;
}