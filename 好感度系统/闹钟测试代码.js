
      	var p;
  

	
      	 mui.plusReady(function(){
      	 		//��mui������ʱ��Ϳ�ʼע�ắ����Ϊbutton�󶨵���¼�
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
                		alert("ʱ�䲻��Ϊ��Ŷ");
                	}else{
                		if(alarm != null){
                			clearAlarm();
                		}
                		addAlarm();//�������¼�Ϊalarm����ע��һ������  
                	}
                    
                    
                    /*
                    if(alarm != null){
                		clearAlarm();
                	}
                	if(filter!=null){//ϵͳע�������
                		filter=null;
                		main.unregisterReceiver(receiver);//ȡ����ǰ���Ӽ���
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
            
           
            
           
            //ע��㲥
            var main = plus.android.runtimeMainActivity(); // �����          
            var ALARM_RECEIVER = "alarm_receiver"; // �����
           
            //wakeLock();
       		var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
                onReceive: function(context, intent) { //ʵ��onReceiver�ص�����
                    plus.android.importClass(intent); //ͨ��intentʵ������intent�࣬�����Ժ�ġ�.������
                    console.log(intent.getAction()); //��ȡaction
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);//�㲥����
                    var txt = "���յ���Ϣ" +  intent.getAction() +  ": "+   getCurTime();
                    mui.toast(txt);//Ӧ���ڵ���Ϣ
                   	//pushMsg(txt);//ϵͳ֪ͨ��������Ϣ
                   	//startPlay();//��������
                   	
                    main.unregisterReceiver(receiver); //ȡ������
                    
                	//releaseWakeLock ();//�����㲥��Ϻ��ͷ���
                    startPlay();//��������
                }
           }); // �����
         
            
            
           
           
            /*
            var main = plus.android.runtimeMainActivity();
            // �㲥����
            wakeLock();//Ϊ�㲥�������
            releaseWakeLock ();
            //wakeLock();//Ϊ�㲥�������
            var ALARM_RECEIVER = "alarm_receiver";
            var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
                onReceive: function(context, intent) { //ʵ��onReceiver�ص�����
                    plus.android.importClass(intent); //ͨ��intentʵ������intent�࣬�����Ժ�ġ�.������
                    console.log(intent.getAction()); //��ȡaction
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);//�㲥����
                    var txt = "���յ���Ϣ" +  intent.getAction() +  ": "+   getCurTime();
                    mui.toast(txt);//Ӧ���ڵ���Ϣ
                   	//pushMsg(txt);//ϵͳ֪ͨ��������Ϣ
                   	//startPlay();//��������
                   	
                    main.unregisterReceiver(receiver); //ȡ������
                    
                    releaseWakeLock ();//�����㲥��Ϻ��ͷ���
                    startPlay();//��������
                }
            });
            */
            //
          
           function clearAlarm() {
           		if(alarm != null)
           			alarm.cancel(sender);
        	};
            
            
            function addAlarm() {//��������
                // --- ע����� start ---
                var IntentFilter = plus.android.importClass('android.content.IntentFilter');
               filter = new IntentFilter(ALARM_RECEIVER); // �����
                main.registerReceiver(receiver, filter);
                // --- ע����� end ---
                // --- ��������ʱ�� start ---
                var Calendar = plus.android.importClass('java.util.Calendar');
                var calendar = Calendar.getInstance(); // �����
                // 11��4��ִ��
				//
			
                calendar.set(Calendar.HOUR_OF_DAY, hour);//����Сʱ
                calendar.set(Calendar.MINUTE,minute);//���÷���
                calendar.set(Calendar.SECOND, second);//��������
              
                
                // ��5s ִ��
                //calendar.setTimeInMillis(Date.parse(new Date()));
                //calendar.add(Calendar.SECOND, 10);
                // --- ��������ʱ�� end ---
                // --- �������� ---
                
                var Intent = plus.android.importClass('android.content.Intent');
                var intent = new Intent(ALARM_RECEIVER); // �����
                //����pendingintent�࣬Ϊ�������뵽alarmanager����
                var PendingIntent = plus.android.importClass('android.app.PendingIntent');
                sender = PendingIntent.getBroadcast(main, 0, intent, 0); // �����
                //����alarmanager��
                var AlarmManager = plus.android.importClass("android.app.AlarmManager");
                var Context = plus.android.importClass("android.content.Context");
                alarm = main.getSystemService(Context.ALARM_SERVICE); // �����
                // һ��  
                //alarm.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);//4.0���°汾
               // alarm.setAlarmClock();
               
               	var alarmClockInfo = new AlarmManager.AlarmClockInfo(calendar.getTimeInMillis(), sender);//ʵ�������� // �����
    			alarm.setAlarmClock(alarmClockInfo, sender); // �����
                //alarm.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);//6.0���ϰ汾��׼ִ��
                //alarm.setAlarmClock(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
                // �ظ����
                //alarm.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), 5 * 1000, sender);//4.0���°汾���ظ�ִ��
                mui.toast("��������5�������: " +  getCurTime());//Ӧ���ڵ�����Ϣ
            };
            
            
         
            function pushMsg(content) {//��Ϣ������֪ͨ����
                var options = {
                    "title": "��������",
                };
                plus.push.createMessage(content, "alarm", options);
            };
         
            function getCurTime() {//�õ���ǰʱ��
                var d = new Date();
                return d.getFullYear() +  "-" +  (d.getMonth() + 1)  + "-"  + d.getDate() + " "  + d.getHours() +  ":"  + d.getMinutes()  + ":" +  d.getSeconds();
            };
            
            
            
            
            //���ð�ɫ��������פ֪ͨ�������֪ͨ������������ǰҳ��
            var NotifyID = 1;
			var main = plus.android.runtimeMainActivity();
			var Context = plus.android.importClass("android.content.Context");
			var Noti = plus.android.importClass("android.app.Notification");
			var NotificationManager = plus.android.importClass("android.app.NotificationManager");
			var nm = main.getSystemService(Context.NOTIFICATION_SERVICE)
			var Notification = plus.android.importClass("android.app.Notification");
			var mNotification = new Notification.Builder(main);
			// ���� 810726685@qq.com �Ĵ���
			var Intent = plus.android.importClass("android.content.Intent");
			var PendingIntent = plus.android.importClass("android.app.PendingIntent");
			var intent = new Intent(main, main.getClass());
			var pendingIntent = PendingIntent.getActivity(main, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
			// ��������
			var r = plus.android.importClass("android.R");

			mNotification.setOngoing(true);
			mNotification.setContentTitle("Hbuilder");//֪ͨ������ ***
			mNotification.setContentText("MUI & 5+ �ã�");//֪ͨ����ʾ������***

			// ��������
			mNotification.setSmallIcon(r.drawable.ic_notification_overlay)
			mNotification.setTicker("PadInfo")

			// ���� 810726685@qq.com �Ĵ���
			mNotification.setContentIntent(pendingIntent);
			mNotification.setNumber(10);//***
			var mNb = mNotification.build();//***
			nm.notify(NotifyID, mNb);
			
			
      	 	
      	 });
      	 
      	
      	function startPlay() {//���ò������ֵĺ���
			if ( plus.audio == undefined ) {//δ����ʱ
				alert( "Device not ready!" );//��������Ϊ׼����
			}
			if(p!=null){
				stopPlay();
			}
				p = plus.audio.createPlayer( "music/sunday.mp3" );//ע��
				p.play( function () {
					alert( "Audio play success!" ); 
				}, function ( e ) {
				alert( "Audio play error: " + e.message ); 
				}  ); 
			
			
		}
	    
		function stopPlay() {//ֹͣ���ŵ�ǰ����
			p.stop();
		}
		
		function $(id){
			return document.getElementById(id);
		}
      	
