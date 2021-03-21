export default class LookUp {
    public static lookUp(dataObj:any,keyName:string){
         if(keyName.indexOf(".")!=-1&&keyName!='.'){
             let temp=dataObj;
             let keyArrays=keyName.split(".");
             for (let i=0;i<keyArrays.length;i++){
                 temp=temp[keyArrays[i]];
             }
             return temp;
         }
         return dataObj[keyName];
    }
}