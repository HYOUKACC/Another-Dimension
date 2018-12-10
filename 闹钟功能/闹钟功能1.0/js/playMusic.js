//设置播放音乐的函数
function startPlay() {
			if ( plus.audio == undefined ) {//未设置时
				alert( "Device not ready!" );//跳出弹框，为准备好
			}
			p = plus.audio.createPlayer( "music/sunday.mp3" );//注册
			p.play( function () {
				alert( "Audio play success!" ); 
			}, function ( e ) {
				alert( "Audio play error: " + e.message ); 
			} ); 
		}

//停止播放当前音乐
function stopPlay() {
			p.stop();
}