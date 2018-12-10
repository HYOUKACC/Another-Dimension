
function ajaxA(page){
	
	var ur="http://119.29.162.190:8080/WAR/ImagesServlet?page="+page;
	
	$.get(ur,function(data,status){
			var obj = eval ("(" + data + ")");

			 /*$("#url").html(obj.url);*/
			/* $("#length").html(obj.url.length);*/
			 
			console.log(obj.url);
            document.getElementById('img0').src=obj.url[0];
            document.getElementById('img1').src=obj.url[1];
            document.getElementById('img2').src=obj.url[2];
            document.getElementById('img3').src=obj.url[3];
            document.getElementById('img4').src=obj.url[4];
            document.getElementById('img5').src=obj.url[5];

    
			 
		});
	
	
	
}

