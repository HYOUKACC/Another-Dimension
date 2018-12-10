function setTime(setHour,setMinute){//设置用户的时间，判断时间，形成设置的时间戳
				
				setHour = setHour || 0;
				setMinute = setMinute || 0;
				
				var Calendar = plus.android.importClass('java.util.Calendar');
                var calendarSql = Calendar.getInstance(); // 格式化用户输入的时间
                
                
				var nowTime=new Date();//js的时间对象
				var nowHour=nowTime.getHours();//js得到当前时间
				var nowMinute=nowTime.getMinutes();//js得到分钟
				var nowSecond=nowTime.getSeconds();//js得到当前秒钟
								
				if(setHour<nowHour || (setHour==nowHour && setMinute<=nowMinute) ){//设置的时间，小于当前时间，则时间加一天
					calendarSql.set(Calendar.HOUR_OF_DAY, setHour);//设置小时
                	calendarSql.set(Calendar.MINUTE,setMinute);//设置分钟
					calendarSql.add(Calendar.DATE,1);//时间加一天
				}else{
					calendarSql.set(Calendar.HOUR_OF_DAY, setHour);
					calendarSql.set(Calendar.MINUTE,setMinute);
				}
				
				var DateFormat=plus.android.importClass("android.text.format.DateFormat");//格式化日期-安卓
				var dateSql= DateFormat.format("yyyy-MM-dd-kk-mm",calendarSql.getTime());//安卓得到后一天的时间
				
				dateSql=dateSql+"-"+nowSecond;//让时间戳精确到秒，方便修改
					
				
				console.log("格式化时间："+dateSql);//格式化用户输入的时间
				return dateSql;//返回格式化的字符串，用于设置闹钟
} 


function setNoon(){//午睡闹钟
	
				var Calendar = plus.android.importClass('java.util.Calendar');
                var calendarSql = Calendar.getInstance(); // 格式化用户输入的时间
                
				calendarSql.add(Calendar.MINUTE,25);//时间加25分钟
				var DateFormat=plus.android.importClass("android.text.format.DateFormat");//格式化日期-安卓
				var dateSql= DateFormat.format("yyyy-MM-dd-kk-mm",calendarSql.getTime());//安卓得到时间
				
				console.log("格式化时间："+dateSql);
				return dateSql;
}


function savaId(id){//存储时间戳
	
	
	if(plus.storage.getItem("1")==null){
		plus.storage.setItem("1",id);
		return 1;
	}else if(plus.storage.getItem("2")==null){
		plus.storage.setItem("2",id);
		return 2;
	}else if(plus.storage.getItem("3")==null){
		plus.storage.setItem("3",id);
		return 3;
	}else{
		return false;
	}
	

}

function getId(key){//通过key值来索引时间戳
	
	if(plus.storage.getItem(key)!=null){
		var value=plus.storage.getItem(key);
		return value;
	}else{
		return false;
	}
	
	
}

function removeId(key){//清除特定的id
	
	plus.storage.removeItem(key);
		if(key=="1"){
			$("#firstAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂时没有闹钟");            							            							            							
            $("#firstL").html("");
		}else if(key=="2"){
			$("#secondAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂时没有闹钟");            							            							            							
            $("#secondL").html("");		
	    }else if(key=="3"){
			$("#thirdAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂时没有闹钟");            							            							            							
            $("#thirdL").html("");							
		}
}

function clearId(){
	
	plus.storage.clear();
}

function findId(value){
	
	if(getId("1")==value){
		return 1;
	}else if(getId("2")==value){
		return 2;
	}else if(getId("3")==value){
		return 3;
	}
	
}


function showList(){
	if(getId("1")!=false){
            		var time=getId("1");
            		time=time.split("-");
            			//格式化日期
            		var now=new Date().getTime();
            		var sub=time[0]+"/"+time[1]+"/"+time[2]+" "+time[3]+":"+time[4]+":00";
            		
            		sub=new Date(sub).getTime(); 
  
            		var H=parseInt(((sub-now)%(1000*60*60*24))/(1000 * 60 * 60));//获取小时数 
            		var M=parseInt(((sub-now)%(1000*60*60))/(1000*60));//获取分钟数  
            		time=time[3]+":"+time[4];
          
            		$("#firstAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+time);
            		$("#firstL").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+H+"小时"+M+"分钟后响铃");
            	}else{
            		$("#firstAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂时没有闹钟");
            		$("#firstL").html("");
            	}
            		
            if(getId("2")!=false){
            		var time=getId("2");
            		time=time.split("-");
            		//格式化日期
            		var now=new Date().getTime();
            		var sub=time[0]+"/"+time[1]+"/"+time[2]+" "+time[3]+":"+time[4]+":00";
            		
            		sub=new Date(sub).getTime(); 
  
            		var H=parseInt(((sub-now)%(1000*60*60*24))/(1000 * 60 * 60));//获取小时数 
            		var M=parseInt(((sub-now)%(1000*60*60))/(1000*60));//获取分钟数  
            		time=time[3]+":"+time[4];
          
            		$("#secondAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+time);
            		$("#secondL").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+H+"小时"+M+"分钟后响铃");
            	}else{
            		$("#secondAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂时没有闹钟");
            		$("#secondL").html("");
            	}
            		
            if(getId("3")!=false){
            		var time=getId("3");
            		time=time.split("-");
            		//格式化日期
            		var now=new Date().getTime();
            		var sub=time[0]+"/"+time[1]+"/"+time[2]+" "+time[3]+":"+time[4]+":00";
            		
            		sub=new Date(sub).getTime(); 
  
            		var H=parseInt(((sub-now)%(1000*60*60*24))/(1000 * 60 * 60));//获取小时数 
            		var M=parseInt(((sub-now)%(1000*60*60))/(1000*60));//获取分钟数  
            		time=time[3]+":"+time[4];
          
            		$("#thirdAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+time);
            		$("#thirdL").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+H+"小时"+M+"分钟后响铃");
            	}else{
            		$("#thirdAla").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂时没有闹钟");
            		$("#thirdL").html("");
            	}
}
