function initData(){
    /*初始化数据库*/
    var db = getCurrent();
    /*如果不存在这个数据库*/
    if(!db){
        alert("数据库出错");
        return;
    }
    /*创建一个新的数据表*/
    db.transaction(function(trans){
        trans.executeSql("create table if not exists demo(uName text null,title text null,words text null)",[],function(trans,result){},function(trans,message){})
    })
 }
/*新建或打开数据库*/
function getCurrent(){
    var db = openDatabase("data1.bd","1.0","demo data",1024*1024);
    return db;
}
