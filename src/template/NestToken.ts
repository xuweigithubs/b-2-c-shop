export  default class NestToken {
     //折叠tokens
     public nestToken(tokens:Array<any>){
          let collector=new Array<any>();
          let nestTokens=new Array<any>();
          nestTokens=collector;
          let selections=new Array<any>();
          for(let i=0;i<tokens.length;++i){
              let token=tokens[i];
              switch (token[0]) {
                  case "#":
                      collector.push(token);
                      selections.push(token);
                      token[2]=collector=[];
                      break;
                  case "/":
                      let selection=selections.pop();
                      collector=selections.length>0?selections[selections.length-1][2]:nestTokens;
                      break;
                  default:
                      collector.push(token);
              }
          }
         return nestTokens;
     }
}