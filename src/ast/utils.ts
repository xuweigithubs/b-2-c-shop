export const pointer=function () {
    let str="aaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccdd222222323bdddddd";
    let i=0;
    let j=0;
    let maxRepeatCount=0;
    let maxRepeatStr="";
    while (i<=str.length-1){
        if(str[i]!=str[j]){
            if(j-i>maxRepeatCount){
                maxRepeatCount=j-i;
                maxRepeatStr=str[i];
                console.log("从第"+i+"到"+j+"重复字长度最大")
            }
            i=j;
        }
        j++;
    };
    console.log(maxRepeatStr);
    console.log(maxRepeatCount)
}
export const  convert=function (array:Array<any>) {
     let result=[];
     for(let i=0;i<array.length;i++){
        if(typeof array[i]=='number'){
            result.push({value:array[i]})
        }else{
            result.push({children:convert(array[i])});
        }
     }
     return result;
}
export const  convertMap=function (item:any) {
     if(typeof item=='number'){
         return {value: item}
     }else if(Array.isArray(item)){
         return {
             children:item.map(_item=>convertMap(_item))
         }
     }
}