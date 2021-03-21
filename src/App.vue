<template>
    <div>
        <button @click="patchDom">更新</button>
        <div id="doms">
        </div>
    </div>
</template>

<style lang="sass">
</style>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import RenderFunction from "./template/RenderFunction";
    import h from "./vnode/h";
    import patch from "./vnode/patch";
    import observer from "./observer/index";
    import {pointer,convert} from "./ast/utils";
    import ast from "./ast";
    @Component
    export default class App extends Vue {
         private models:any="";
         private myhVnode:any={};
         private myVnode:any={};
         private myNewVnode:any={};
         mounted(){
             pointer();
             let result=convert([1,2,3,[4,5,[11,12,23,34],6],7,8]);
             console.log(result)
             observer();
             ast(`
                <div>
                    <h3>你好</h3>
                    <ul>
                       <li>A</li>
                       <li>B</li>
                       <li>C</li>
                       <li>D</li>
                    </ul>
                    <div>
                       <div>哈哈哈</div>
                    </div>
                </div>
             `);
             let container:any=document.getElementById("doms");
             this.myhVnode=h("ul",{},[
                 h("li",{key:"B"},"B"),
                 h("li",{key:"C"},"C"),
                 h("li",{key:"D"},"D")
             ]);
             patch(container,this.myhVnode);
             this.renderTemplate();
         }
         //调用patch更新算法
         private patchDom(){
             this.myNewVnode=h("ul",{},[
                     h("li",{key:"B"},"XXX"),
                     h("li",{key:"C"},"C"),
                     h("li",{key:"D"},"D"),
                     h("li",{key:"F"},"F")
             ]);
             patch(this.myhVnode,this.myNewVnode);
         }
         //模板解析与渲染
         private renderTemplate(){
             let data:any={
                 students:[
                     {'name':'小明','hobbies':['游泳','健身']},
                     {'name':'小红','hobbies':['足球','篮球','羽毛球']},
                     {'name':'小强','hobbies':['吃饭','睡觉']}
                 ],
                 className:"一年级二班"
             };
             let renderFunction=new RenderFunction();
             let tempStr=`<div>
                                <ol>
                                    {{#students}}
                                    <li>
                                        学生{{name}}的爱好是
                                        <ol>
                                            {{#hobbies}}
                                               <li>{{.}}</li>
                                            {{/hobbies}}
                                        </ol>
                                    </li>
                                    {{/students}}
                                    <div>{{className}}</div>
                                  </ol>
                             </div>`;
             let tokens=renderFunction.render(tempStr,data);
             this.models=tokens;
         }
    }
</script>