function setTime(setHour,setMinute){//设置用户的时间，判断时间，形成设置的时间戳
				
				setHour = setHour || 0;
				setMinute = setMinute || 0;
				
				var Calendar = plus.android.importClass('java.util.Calendar');
                var calendarSql = Calendar.getInstance(); // 格式化用户输入的时间
                
                
				var nowTime=new Date();//js的时间对象
				var nowHour=nowTime.getHours();//js得到当前时间
				var nowMinute=nowTime.getMinutes();//js得到分钟
								
				if(setHour<nowHour || (setHour==nowHour && setMinute<nowMinute) ){//设置的时间，小于当前时间，则时间加一天
					calendarSql.set(Calendar.HOUR_OF_DAY, setHour);//设置小时
                	calendarSql.set(Calendar.MINUTE,setMinute);//设置分钟
					calendarSql.add(Calendar.DATE,1);//时间加一天
				}else{
					calendarSql.set(Calendar.HOUR_OF_DAY, setHour);
					calendarSql.set(Calendar.MINUTE,setMinute);
				}
				
				var DateFormat=plus.android.importClass("android.text.format.DateFormat");//格式化日期-安卓
				var dateSql= DateFormat.format("yyMMddkkmm",calendarSql.getTime());//安卓得到后一天的时间
				var saveTime=new Array();
					saveTime[0]=DateFormat.format("yyMMddkkmm",calendarSql.getTime());
					saveTime[1]=DateFormat.format("yy",calendarSql.getTime());;
					saveTime[2]=DateFormat.format("MM",calendarSql.getTime());;
					saveTime[3]=DateFormat.format("dd",calendarSql.getTime());;
					saveTime[4]=DateFormat.format("kk",calendarSql.getTime());;
					saveTime[5]=DateFormat.format("mm",calendarSql.getTime());;
					saveTime[6]="1";
					saveTime[7]="0";
				
				
				
				console.log("存入时间："+dateSql);//格式化用户输入的时间
			
				return saveTime;//返回存储的时间数组
} 



function addTimeSql(saveT){//加入时间
	var db = openDatabase('tests', '1.0', 'test', 2 * 1024 * 1024);
	var msg;
	
	db.transaction(function (tx) {
   		tx.executeSql('CREATE TABLE IF NOT EXISTS timeTest (time_id primary key , t_year,t_month,t_day,t_hour,t_minute,t_set,t_repeat)');   		
	});
	
	
	
	db.transaction(function (tx) {
   		tx.executeSql('insert into timeTest(time_id, t_year,t_month,t_day,t_hour,t_minute,t_set,t_repeat) values (?,?,?,?,?,?,?,?)',
   		[saveT[0],saveT[1],saveT[2],saveT[3],saveT[4],saveT[5],saveT[6],saveT[7]]);
	});
	
	console.log("已经加入时间"+saveT[0]);
	
	
	
}

function deleteTimeByID(id){//删除特定的时间戳(用户选择删除的时间戳)
	
	var db = openDatabase('tests', '1.0', 'test', 2 * 1024 * 1024);
	
	db.transaction(function (tx) {
   		tx.executeSql('CREATE TABLE IF NOT EXISTS timeTest (time_id primary key, t_year,t_month,t_day,t_hour,t_minute,t_set,t_repeat)');   		
	});
	
	db.transaction(function (tx) {
   		tx.executeSql('DELETE FROM timeTest WHERE time_id=?',[id]);   		
	});
	
	
}

function deleteTime(){//系统自动删除的时间戳
	var db = openDatabase('tests', '1.0', 'test', 2 * 1024 * 1024);
	
	db.transaction(function (tx) {
   		tx.executeSql('CREATE TABLE IF NOT EXISTS timeTest (time_id primary key, t_year,t_month,t_day,t_hour,t_minute,t_set,t_repeat)');   		
	});
	
	db.transaction(function (tx) {
   		tx.executeSql('DELETE FROM timeTest WHERE t_set=0');   //t_set=0的时间戳自动删除	
	});
}

function selectTime(){//查询目前需要定的闹钟，根据时间戳排序，返回时间最早的时间戳,用于设置时间
	
var db = openDatabase('tests', '1.0', 'test', 2 * 1024 * 1024);


	db.transaction(function (tx) {
 		tx.executeSql('CREATE TABLE IF NOT EXISTS timeTest (time_id primary key, t_year,t_month,t_day,t_hour,t_minute,t_set,t_repeat)');   		
	});
	
	db.transaction(function (tx) {
			
          tx.executeSql('SELECT * FROM timeTest order by time_id ', [], function (tx, results) {
             var len = results.rows.length, i;
             
             console.log("xuanze");
            
            //存储当前的返回的时间戳
	               	plus.storage.setItem("time_id",results.rows.item(0)['time_id']);
	               	plus.storage.setItem("t_year",results.rows.item(0)['t_year']);
	               	plus.storage.setItem("t_month",results.rows.item(0)['t_month']);
	               	plus.storage.setItem("t_day",results.rows.item(0)['t_day']);
               		plus.storage.setItem("t_hour",results.rows.item(0)['t_hour']);
	               	plus.storage.setItem("t_minute",results.rows.item(0)['t_minute']);
	               	plus.storage.setItem("t_set",results.rows.item(0)['t_set']);
	               	plus.storage.setItem("t_repeat",results.rows.item(0)['t_repeat']);
	         		    			 
         }, null);
  });
  
 		
}

function updaate(id){//修改是否选中，set     isS=是否开启     id=闹钟id
		
		var db = openDatabase('tests', '1.0', 'test', 2 * 1024 * 1024);
		
		db.transaction(function (tx) {
    		tx.executeSql('UPDATE timeTest SET t_set=? WHERE time_id=?',[isS,id]);
		});
}


function deleteAll(){
	var db = openDatabase('tests', '1.0', 'test', 2 * 1024 * 1024);
		
		db.transaction(function (tx) {
    		tx.executeSql('DELETE FROM timeTest');
		});
		
		console.log("删除了所有闹钟");
}
