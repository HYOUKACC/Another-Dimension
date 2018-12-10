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
