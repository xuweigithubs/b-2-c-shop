import Scaner  from "./Scaner";
import NestToken from "./NestToken";
import RenderTemplate from "./RenderTemplate";
export default class RenderFunction{
     constructor(){
     }
     public render(templeteStr:string,data:any){
          let tokens=new Array<any>();
          let scaner=new Scaner(templeteStr);
          let words;
          while (scaner.eos()){
               let words=scaner.scanUtil("{{");
               if(words){
                    tokens.push(['text',words]);
                    scaner.scan("{{");
               }
               words=scaner.scanUtil("}}");
               if(words){
                    if(words[0]=='#'){
                         tokens.push(['#',words.substring(1)]);
                    }else if(words[0]=='/'){
                         tokens.push(['/',words.substring(1)]);
                    }
                    else{
                         tokens.push(['name',words]);
                    }
               }
               scaner.scan("}}");
          }
          let nestToken=new NestToken();
          let renderTemplate=new RenderTemplate();
          let domStr=renderTemplate.renderToTemplate(data,nestToken.nestToken(tokens))
          return  domStr;
     }
}