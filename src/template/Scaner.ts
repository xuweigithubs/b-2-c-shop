export default class Scaner{
    private templeteStr="";
    public pos:number;
    public tail:string;
    constructor(templeteStr:any){
        this.templeteStr=templeteStr;
        this.pos=0;
        this.tail="";
    }
    public scan(tag:string){
       if(this.tail.indexOf(tag)==0){
           this.pos+=tag.length;
           //改变尾巴
           this.tail=this.templeteStr.substring(this.pos);
       }
    }
    //让指针进行扫描,遇见指定内容就结束,并且返回结束之前路过的文字
    public scanUtil(stopTag:any){
        const pos_backup=this.pos;
        while (this.tail.indexOf(stopTag)!=0&&this.eos()){
            this.pos++;
            this.tail=this.templeteStr.substring(this.pos);
        }
        return this.templeteStr.substring(pos_backup,this.pos);
    }
    public eos(){
        return this.pos<=this.templeteStr.length;
    }
}