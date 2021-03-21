/**
 * 把tokens数组
 */
import LookUp from './LookUp';
export default class RenderTemplate{
     public renderToTemplate(data:any,tokens:Array<any>){
         let resultStr="";
         for (let i=0;i<tokens.length;i++){
             let token=tokens[i];
             if(token[0]=="text"){
                 resultStr+=token[1];
             }else if(token[0]=="name"){
                 resultStr+=data[token[1]];
             }else if(token[0]=="#"){
                 resultStr+=this.parseArray(token,data);
             }
         };
         return resultStr;
     }

    /**
     * 结合数组实现递归
     */
    private parseArray(token:any,data:any){
        let resultStr="";
        let v:Array<any>=LookUp.lookUp(data,token[1]);
        for (let i=0;i<v.length;i++){
           resultStr+=this.renderToTemplate({...v[i],'.':v[i]},token[2]);
        }
        return resultStr;
    }
}