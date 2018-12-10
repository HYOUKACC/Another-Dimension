mui.plusReady(function(){
      	 		//在mui启动的时候就开始注册函数，为button绑定点击事件
            //
           var sender=null;
           var alarm=null;
           var hour=null;
           var minute = null;
           var second=null;
           var filter=null;
           var p=null;
            mui("body").on('tap', 'button', function(event) {
                var id = this.getAttribute('id');
                
                if (id == "alarm") { 
                	hour=parseInt($('hour').value);
                	minute=parseInt($('minute').value);
                	second=parseInt($('second').value);
                	if(isNaN(hour) || isNaN(minute) || isNaN(second)){
                		alert("时间不能为空哦");
                	}else{
                		if(alarm != null){
                			clearAlarm();
                		}
                		addAlarm();//如果点击事件为alarm，则注册一个闹钟  
                	}
                    
                    
                    /*
                    if(alarm != null){
                		clearAlarm();
                	}
                	if(filter!=null){//系统注册过监听
                		filter=null;
                		main.unregisterReceiver(receiver);//取消当前闹钟监听
                	}
                	*/
                    
                }
                
                if(id=="claeralarm"){
                	clearAlarm();
                	sender=null;
			        alarm=null;
			        hour=null;
			        minute=null;
			        second=null;
                }
                
            });
            
           
            
           
            //注册广播
            var main = plus.android.runtimeMainActivity(); // 存变量          
            var ALARM_RECEIVER = "alarm_receiver"; // 存变量
           
            //wakeLock();
       		var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
                onReceive: function(context, intent) { //实现onReceiver回调函数
                    plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
                    console.log(intent.getAction()); //获取action
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);//广播设置
                    var txt = "接收到消息" +  intent.getAction() +  ": "+   getCurTime();
                    mui.toast(txt);//应用内弹消息
                   	//pushMsg(txt);//系统通知栏弹出消息
                   	//startPlay();//播放音乐
                   	
                    main.unregisterReceiver(receiver); //取消监听
                    
                	//releaseWakeLock ();//监听广播完毕后，释放锁
                    startPlay();//播放音乐
                }
           }); // 存变量
         
            
            
           
           
            /*
            var main = plus.android.runtimeMainActivity();
            // 广播接收
            wakeLock();//为广播代码加锁
            releaseWakeLock ();
            //wakeLock();//为广播代码加锁
            var ALARM_RECEIVER = "alarm_receiver";
            var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
                onReceive: function(context, intent) { //实现onReceiver回调函数
                    plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
                    console.log(intent.getAction()); //获取action
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);//广播设置
                    var txt = "接收到消息" +  intent.getAction() +  ": "+   getCurTime();
                    mui.toast(txt);//应用内弹消息
                   	//pushMsg(txt);//系统通知栏弹出消息
                   	//startPlay();//播放音乐
                   	
                    main.unregisterReceiver(receiver); //取消监听
                    
                    releaseWakeLock ();//监听广播完毕后，释放锁
                    startPlay();//播放音乐
                }
            });
            */
            //
          
           function clearAlarm() {
           		if(alarm != null)
           			alarm.cancel(sender);
        	};
            
            
            function addAlarm() {//设置闹钟
                // --- 注册监听 start ---
                var IntentFilter = plus.android.importClass('android.content.IntentFilter');
               filter = new IntentFilter(ALARM_RECEIVER); // 存变量
                main.registerReceiver(receiver, filter);
                // --- 注册监听 end ---
                // --- 设置闹铃时间 start ---
                var Calendar = plus.android.importClass('java.util.Calendar');
                var calendar = Calendar.getInstance(); // 存变量
                // 11点4分执行
				//
			
                calendar.set(Calendar.HOUR_OF_DAY, hour);//设置小时
                calendar.set(Calendar.MINUTE,minute);//设置分钟
                calendar.set(Calendar.SECOND, second);//设置秒钟
              
                
                // 过5s 执行
                //calendar.setTimeInMillis(Date.parse(new Date()));
                //calendar.add(Calendar.SECOND, 10);
                // --- 设置闹铃时间 end ---
                // --- 设置闹铃 ---
                
                var Intent = plus.android.importClass('android.content.Intent');
                var intent = new Intent(ALARM_RECEIVER); // 存变量
                //引入pendingintent类，为后来加入到alarmanager类中
                var PendingIntent = plus.android.importClass('android.app.PendingIntent');
                sender = PendingIntent.getBroadcast(main, 0, intent, 0); // 存变量
                //引入alarmanager类
                var AlarmManager = plus.android.importClass("android.app.AlarmManager");
                var Context = plus.android.importClass("android.content.Context");
                alarm = main.getSystemService(Context.ALARM_SERVICE); // 存变量
                // 一次  
                //alarm.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);//4.0以下版本
               // alarm.setAlarmClock();
               
               	var alarmClockInfo = new AlarmManager.AlarmClockInfo(calendar.getTimeInMillis(), sender);//实例化对象 // 存变量
    			alarm.setAlarmClock(alarmClockInfo, sender); // 存变量
                //alarm.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);//6.0以上版本精准执行
                //alarm.setAlarmClock(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
                // 重复多次
                //alarm.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), 5 * 1000, sender);//4.0以下版本，重复执行
                mui.toast("设置闹铃5秒后提醒: " +  getCurTime());//应用内弹出消息
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
            
            
            
            
            //设置白色保护，常驻通知栏，点击通知栏可以跳到当前页面
            var NotifyID = 1;
			var main = plus.android.runtimeMainActivity();
			var Context = plus.android.importClass("android.content.Context");
			var Noti = plus.android.importClass("android.app.Notification");
			var NotificationManager = plus.android.importClass("android.app.NotificationManager");
			var nm = main.getSystemService(Context.NOTIFICATION_SERVICE)
			var Notification = plus.android.importClass("android.app.Notification");
			var mNotification = new Notification.Builder(main);
			// 新增 810726685@qq.com 的代码
			var Intent = plus.android.importClass("android.content.Intent");
			var PendingIntent = plus.android.importClass("android.app.PendingIntent");
			var intent = new Intent(main, main.getClass());
			var pendingIntent = PendingIntent.getActivity(main, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
			// 新增代码
			var r = plus.android.importClass("android.R");

			mNotification.setOngoing(true);
			mNotification.setContentTitle("Hbuilder");//通知栏标题 ***
			mNotification.setContentText("MUI & 5+ 好！");//通知栏显示的内容***

			// 新增代码
			mNotification.setSmallIcon(r.drawable.ic_notification_overlay)
			mNotification.setTicker("PadInfo")

			// 新增 810726685@qq.com 的代码
			mNotification.setContentIntent(pendingIntent);
			mNotification.setNumber(10);//***
			var mNb = mNotification.build();//***
			nm.notify(NotifyID, mNb);
			
			
      	 	
      	 });