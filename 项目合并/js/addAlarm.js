
mui.plusReady(function(){
      	 		//在mui启动的时候就开始注册函数，为button绑定点击事件
            //
          // var sender=null;
           //var alarm=null;
           var hour=null;
           var minute = null;
           var second=null;
           var test=null;
          // var filter=null;
           var p=null;
            mui("body").on('tap', 'input', function(event) {
                var id = this.getAttribute('id');
                
                if (id == "alarm") {
                	plus.device.vibrate(60); //震动
                	var witchTime=findById('witchTime').value;
                	witchTime=witchTime.split(":");
                	hour=parseInt(witchTime[0]);
                	minute=parseInt(witchTime[1]);
                	
                	if(isNaN(hour) || isNaN(minute)){
                		alert("时间不能为空哦");
                	}
                		                	
                	test=setTime(hour,minute);//得到设置的时间戳
                	var result=savaId(test);//存储时间戳
                	
                	if(result!=false){//说明存入了时间戳
                		console.log(getId("1"));
                		console.log(getId("2"));
                		console.log(getId("3"));
                		addAlarm(test);
                	}else{
                		alert("先三个吧~");
                		/*clearId();
                		console.log("看看有没有清除！");
                		console.log(getId("1"));
                		console.log(getId("2"));
                		console.log(getId("3"));
                		*/
                	}
                	//addAlarm();//如果点击事件为alarm，则注册一个闹钟  
                            
                }
                                              
                if(id=="close"){
                	//plus.device.vibrate(60); //震动
                	//console.log("删除id:");
                	//clearAlarm(test);
                
                }
                 
            });
             
            //监听按钮，如果是点击时钟界面，则刷新当前存储的时间戳
            mui("body").on('tap','a',function(event){
            	
            	var id = this.getAttribute('id');
            	
            	if(id=="whichClock"){
            		//console.log(getId("1"));
            		
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
            });

			
			$('#middles').on('tap', '#noonAlarmPic', function(event){
				
				var id = this.getAttribute('id');
				if(id=="noonAlarmPic"){
					plus.device.vibrate(50);
					console.log("按到啦！！！！");
					if(plus.storage.getItem("noon")==null){//没有午睡闹钟，可以设置
						var noonA=setNoon();
						
						plus.storage.setItem("noon",noonA);//存储时间戳
						
						console.log(plus.storage.getItem("noon"));
						
						addAlarm(noonA);//添加闹钟
						
						
						
						if($("#msg").css("display")=='none'){//如果show是隐藏的
 
							$("#msg").show("slow");
							setTimeout(function() {
									$("#msg").hide("slow");//show的display属性设置为block（显示）
								}, 3*1000);
							
						}
 							   						  												
					}else{//已经有闹钟了，
									
						mui.toast("已经有一个午睡闹钟啦,长按删除~");//应用内弹消息
					}
					
					
				}
				
				
			});
			
			$('#middles').on('longtap', '#noonAlarmPic', function(event){//午睡闹钟按钮
				
				
				var id = this.getAttribute('id');
				if(id=="noonAlarmPic"){//长按删除闹钟
					console.log("按到啦！！！！");
					plus.device.vibrate(80); //震动
					clearAlarm(plus.storage.getItem("noon"));
					plus.storage.removeItem("noon");
					if(plus.storage.getItem("noon")==null){
						mui.toast("午睡闹钟已删除~");//应用内弹消息
					}
					
				}
				
			});
  
  			$('#tops').on('longtap', '#touch', function(event){//关闭音乐按钮，表盘
  				var id = this.getAttribute('id');
  				if(id=="touch"){
					console.log("按到啦！！！！");					
					plus.device.vibrate(60); //震动

				
						stopPlay();
					
					
				}
  				
  				
  			});
  			
			
			$('#scro01').on('swipeup','.bigone',function(event){
				var id = this.getAttribute('id');
				if(id=="bigoneId"){
					page++;
					console.log("下滑："+page+"页");
					
					ajaxA(page);
					
				}
				
				
			});
			
			$('#scro01').on('swipedown','.bigone',function(event){
				var id = this.getAttribute('id');
				if(id=="bigoneId"){
					
					
					if(page>1){
						page--;
						console.log("上滑:"+page+"页");
						ajaxA(page);
					}
					else{
						mui.toast("再往上啥也没有啦！");
					}
					
					
				}
				
				
			});
			
            //注册广播
            var main = plus.android.runtimeMainActivity(); // 存变量          
           
           // var ALARM_RECEIVER = "alarm_receiver"; // 存变量(设置的action，即闹钟的唯一标识)
          
            //wakeLock();
       		var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
                onReceive: function(context, intent) { //实现onReceiver回调函数
                    plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
                    //console.log(intent.getAction()); //获取action
                    //intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);//广播设置
                    var txt = "起床啦" +  intent.getAction() +  ": "+   getCurTime();
                    mui.toast(txt);//应用内弹消息
                   	//pushMsg(txt);//系统通知栏弹出消息
                   	//startPlay();//播放音乐
                   	
                   // main.unregisterReceiver(receiver); //取消监听
                    
                	//releaseWakeLock ();//监听广播完毕后，释放锁
                	
                    startPlay();//播放音乐
                    var key=findId(intent.getAction());
           			//console.log(key);
           			removeId(key);//删除时间列表
           			showList();
                }
           }); // 存变量
         
            
                     
    function clearAlarm(cId) {//传入特殊的id，用于识别当前闹钟，从而取消此id设置的闹钟
           		
           		var Intent = plus.android.importClass('android.content.Intent');
                var intent = new Intent(cId); // 存变量（创建闹钟的唯一标识，传给系统让其删除）
                intent.setAction(cId);
                
                //引入pendingintent类，为后来加入到alarmanager类中
                var PendingIntent = plus.android.importClass('android.app.PendingIntent');
                sender = PendingIntent.getBroadcast(main, 0, intent, 0); // 存变量
                
                var AlarmManager = plus.android.importClass("android.app.AlarmManager");
                var Context = plus.android.importClass("android.content.Context");
                var alarm = main.getSystemService(Context.ALARM_SERVICE); // 得到闹钟服务
           			alarm.cancel(sender);//删除
    };
            
            
   function addAlarm(aId) {//设置闹钟(传入当前时间戳用于后期取消)
                // --- 注册监听 start ---
                
                var nowSet=aId.split("-");
                
                var year=parseInt(nowSet[0]);
                var month=parseInt(nowSet[1])-1;
                var day=parseInt(nowSet[2]);
                var hour=parseInt(nowSet[3]);
                var minute=parseInt(nowSet[4]);
                
                var IntentFilter = plus.android.importClass('android.content.IntentFilter');
                
               	//filter = new IntentFilter(ALARM_RECEIVER); // 存变量
               	
               	filter = new IntentFilter(aId);
               	
                main.registerReceiver(receiver, filter);
                // --- 注册监听 end ---
                // --- 设置闹铃时间 start ---
                var Calendar = plus.android.importClass('java.util.Calendar');
                var calendar = Calendar.getInstance(); // 存变量
                // 11点4分执行
				//
				
//				console.log(nowSet[0]);
//				console.log(nowSet[1]);
			    calendar.set(year,month,day,hour,minute);//设置闹钟响的时间
			    calendar.set(Calendar.SECOND,0);//设置秒钟
			    //设置年，月，日，时，分
			    
//            calendar.set(Calendar.HOUR_OF_DAY,nowSet[3]);//设置小时
//            calendar.set(Calendar.MINUTE,nowSet[4]);//设置分钟
//            calendar.set(Calendar.SECOND,0);//设置秒钟
              
                
                
                var Intent = plus.android.importClass('android.content.Intent');
                
                //var intent = new Intent(ALARM_RECEIVER); // 存变量
                
                var intent = new Intent(aId);
                
                //intent.setAction(aId);//存入闹钟唯一索引值
                
                //intent.setData(aId);
                
                //引入pendingintent类，为后来加入到alarmanager类中
                var PendingIntent = plus.android.importClass('android.app.PendingIntent');
                sender = PendingIntent.getBroadcast(main, 0, intent, 0); // 存变量
                //引入alarmanager类
                var AlarmManager = plus.android.importClass("android.app.AlarmManager");
                var Context = plus.android.importClass("android.content.Context");
                alarm = main.getSystemService(Context.ALARM_SERVICE); // 得到闹钟服务
                
                // 一次  
                //alarm.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);//4.0以下版本
               // alarm.setAlarmClock();
               
               	var alarmClockInfo = new AlarmManager.AlarmClockInfo(calendar.getTimeInMillis(), sender);//实例化对象 // 存变量
    			alarm.setAlarmClock(alarmClockInfo, sender); // 存变量
                //alarm.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);//6.0以上版本精准执行
                //alarm.setAlarmClock(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
                // 重复多次
                //alarm.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), 5 * 1000, sender);//4.0以下版本，重复执行
                //mui.toast("设置闹铃5秒后提醒: " +  getCurTime());//应用内弹出消息
    };
            
            
         
    function pushMsg(content) {//消息弹出（通知栏）
                var options = {
                    "title": "闹铃提醒",
                };
                plus.push.createMessage(content, "alarm", options);
    };
         
   	function getCurTime() {//得到当前时间
                var d = new Date();
                return d.getFullYear() +  "-" +  (d.getMonth() + 1)  + "-"  + d.getDate() + " "  + d.getHours() +  ":"  + d.getMinutes()  + ":" +  d.getSeconds();
    };
             
     
    (function($) {//用于删除当前时钟
								
				
				var btnArray = ['确认', '取消'];
				$('#OA_task_1').on('tap', '.mui-btn', function(event) {
					
					var id = this.getAttribute("id");
					var elem = this;
					var li = elem.parentNode.parentNode;
					if(getId(id)!=false){
						mui.confirm('确认删除此闹钟？', '次元唤醒', btnArray, function(e) {
							if (e.index == 0) {
								
								$.swipeoutClose(li);
								clearAlarm(getId(id));
								console.log("删除此闹钟");
								removeId(id);
																																
							} else {
								setTimeout(function() {
									$.swipeoutClose(li);
								}, 0);
							}
						});
					}else{
						console.log(id);
						setTimeout(function() {
									$.swipeoutClose(li);
								}, 0);
					}
					
				});
				
			})(mui);	 
     
     
      
      
      
      
});
      	 
function startPlay() {//设置播放音乐的函数
			if ( plus.audio == undefined ) {//未设置时
				alert( "Device not ready!" );//跳出弹框，为准备好
			}
			if(p!=null){
				stopPlay();
			}
				p = plus.audio.createPlayer( "music/sunday.mp3" );//注册
				p.play( function () {
					alert( "Audio play success!" ); 
				}, function ( e ) {
				alert( "Audio play error: " + e.message ); 
				}  ); 
			
			
		}
	    
function stopPlay() {//停止播放当前音乐
			p.stop();
		}


function findById(id){
			return document.getElementById(id);
}

