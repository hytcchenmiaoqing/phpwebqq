function tiao(){
	alert("fail to login ! retry it again!");

}

$(function(){
	
	$(".close").click(function(){
		$("#loginbox").hide();
		
	});

	chathtml();
	sendMsg();
	//iniDelegate();

	setInterval('getUnreadMsg()',1000);
	setInterval('changelogout()',1000);
	//setInterval('logout()',1000);
	logoin();
	logout();

	


});
function logoin(){
	//$(".submit").click(function(){

		

		$.ajax({
			type:"POST",
			url:"include/ajax.php",
			data:{flag:'logoin'},
			success:function(res){
				//alert(0);
				//alert(res);
			}
		});

	//});
	
}

function changelogout(){

	$.ajax({
			type:"POST",
			url:"include/ajax.php",
			data:{flag:'changelogout'},
			success:function(res){
				var objs=eval("("+res+")");
				$.each(objs,function(){
					var id=this.id;
					var userNickname=this.userNickname;
					var userHeadImage=this.userHeadImage;
					var shuoshuo=this.shuoshuo;
					var userState=this.userState;
					var curuserid=$("#myinfo").attr("curuserid");
					var talkname=$("#friendlitalk"+id).attr("talkname");
					var State=$("#friendlitalk"+id).find(".State").html();
					//alert(talkname);
					if(userState=="online"&&id!=curuserid&& State=="offline"){
						$("#friendlitalk"+id).remove();

						var onlinehtml ='';
							onlinehtml +='<li class="friendli" id="friendlitalk'+id+'" talkid="'+id+'" talkname="'+talkname+'" isshow="no" isapper="no" friendImg="'+userHeadImage+'">';
							onlinehtml +='	<div class="friendImg"><img src="'+userHeadImage+'" class="headImg"></div>';
							onlinehtml +='	<div class="friendInfo">';
							onlinehtml +='		<a class="NickName">'+talkname+'</a>';
							onlinehtml +='		<span class="shuoshuo">'+shuoshuo+'</span>';
							onlinehtml +='		<a class="State">'+userState+'</a>';
							onlinehtml +='	</div>';
							onlinehtml +='</li>';
						$(".onlinefriendList").append(onlinehtml);
					}
					else if(userState=="offline"&& State=="online"){
						$("#friendlitalk"+id).remove();

						var offlinehtml ='';
							offlinehtml +='<li class="friendli" id="friendlitalk'+id+'" talkid="'+id+'" talkname="'+talkname+'" isshow="no" isapper="no" friendImg="'+userHeadImage+'">';
							offlinehtml +='	<div class="friendImg"><img src="'+userHeadImage+'" class="headImg grey"></div>';
							offlinehtml +='	<div class="friendInfo">';
							offlinehtml +='		<a class="NickName">'+talkname+'</a>';
							offlinehtml +='		<span class="shuoshuo">'+shuoshuo+'</span>';
							offlinehtml +='		<a class="State">'+userState+'</a>';
							offlinehtml +='	</div>';
							offlinehtml +='</li>';
						$(".offlinefriendList").append(offlinehtml);
					}
				});

			}
		});
}

function logout(){
	$(".logout").click(function(){

		$.ajax({
			type:"POST",
			url:"include/ajax.php",
			data:{flag:'logout'},
			success:function(res){
				//alert(res);
			}
		});

	});
	
}

function getUnreadMsg(){

	var msgSenderidArr=new Array();
	$.ajax({
			type:"POST",
			url:"include/ajax.php",
			async:false,
			data:{flag:'getUnreadMsg'},
			success:function(res){
				var objs=eval("("+res+")");
				//var msgSenderid="";
				//alert(objs);
				$.each(objs,function(){

					//alert(this.msgContent);
					var msgContent=this.msgContent;
					var msgSender=this.msgSender;

					var isshow=$("#friendlitalk"+msgSender).attr("isshow");
					var friendImg=$("#friendlitalk"+msgSender).attr("friendImg");
					//alert(isshow);
					 if(isshow=="yes"){
					 			msgSenderidArr.push(this.msgSender);
								msgSenderid=this.msgSender;
								var receivemsghtmlA ='';
								
							    receivemsghtmlA +='	<div class="onetalkboxS">';
							    receivemsghtmlA +='		<div class="headImageS"><img src="'+friendImg+'" class="headImage"  /></div>';
							    receivemsghtmlA +='		<div class="onetalkS">'+msgContent+'</div>';
							    receivemsghtmlA +='	</div>';
									
							    $("#talk"+msgSender).find(".talkContent").append(receivemsghtmlA);		    
							
					}
	 			});
	 			if(msgSenderidArr.length != 0){
	
		 			$.ajax({
								type:"POST",
								url:"include/ajax.php",
								data:{flag:'changeMsgState',msgSender:msgSenderid},
								success:function(res){
									//alert(res);
								}
							});
		 		}
							
	
	 		}
	});			
}














function chathtml(){

	$(document).on("click",".friendList li",function(){


		var talkid=$(this).attr("talkid");
		var talkname=$(this).attr("talkname");
		var isshow=$(this).attr("isshow");
		var isapper=$(this).attr("isapper");
		
		if(isshow=="no"){
			$(this).attr("isshow","yes");
			if(isapper=="no"){

			var chathtmlA='';
				chathtmlA +='<div id="talk'+talkid+'" class="talk" >';
				chathtmlA +='	<div class="talkboxtitle"><a>'+talkname+'</a><span class="close"></span></div>';
				chathtmlA +='		<div class="talkbox">';
				chathtmlA +='			<div class="talkContent"></div>';
				chathtmlA +='		<div class="sendMsg">';
				chathtmlA +='			<div class="sendbox"><input class="txtMsg" type="text"/></div>';
				chathtmlA +='			<div class="sendbtn"><input btntalkid="'+talkid+'" class="send" type="submit" value="发送" /></div>';
				chathtmlA +='		</div>';
				chathtmlA +='	</div>';
				chathtmlA +='</div>';
				
				
				$(".right").append(chathtmlA);
				$(this).attr("isapper","yes");

			}
			else{	

				$("#talk"+talkid).show();

			}		
		}
		$(".talk").css("z-index","1");
		$("#talk"+talkid).css("z-index","22");
		$(".close").click(function(){

			var talkidN = $(this).parent().parent().attr("id");
			$("#friendli"+talkidN).attr("isshow","no");
			$(this).parent().parent("#talk"+talkid).hide();
			
		});

		$("#talk"+talkid).draggable({ 
			handle: ".talkboxtitle" ,
			containment: "parent"
		});

		
	});
}


function sendMsg(){
	$(document).on("click",".send",function(){
			var msg = $(this).parent().prev().find(".txtMsg").val();
			if(msg==" "){
				return;
			}

			var receiveid= $(this).attr("btntalkid");
			//alert(receiveid);
			var senderid= $("#myinfo").attr("curuserid");
			$.ajax({
				type:"POST",
	 			url:"include/ajax.php",
	 			data:{flag:'sendMsg',msg:msg,senderid:senderid,receiveid:receiveid},
				success:function(res){
					alert(res);
				}
	 		});

			$(this).parent().prev().find(".txtMsg").val(" ");
			var myHeadImageUrl=$(".headImg").attr("curHeadImageUrl");
			//alert(myHeadImageUrl);

			var sendmsghtmlA ='';
				
			    sendmsghtmlA +='	<div class="onetalkbox">';
			    sendmsghtmlA +='		<div class="headImage"><img src=" '+myHeadImageUrl+' " class="headImage"  /></div>';
			    sendmsghtmlA +='		<div class="onetalk">'+msg+'</div>';
			    sendmsghtmlA +='	</div>';
			    
			$(this).parent().parent().prev(".talkContent").append(sendmsghtmlA);
		
		});	
		
}

// function iniDelegate(){
// 	$(".friendli").click(function(){
// 		var talkid=$(this).attr("talkid");
// 		var talkname=$(this).attr("talkname");
//  		var isapper=$(this).attr("isapper");
//  		var isshow=$(this).attr("isshow");
//  		if(isapper=="no"){
//  			$(".talk").show();
//  			if(isshow="yes"){
//  				$(".close").click(function(){
//  					$(".talk").hide();
//  				});
//  			}
//  		}

//  		var talkname=$(this).attr("talkname");
//  		var talkid = $(this).attr("talkid");
//  		//alert(talkid);
//  		$(".talkboxtitle a").html("与"+talkname+"聊天中");
//  		//拖动
//  		$(".talk").draggable({ 
// 			handle: ".talkboxtitle" ,
//  			containment: "parent"
//  		});
// 	});

// 	$("#send").click(function(){
// 		var msg = $("#txtMsg").val();
// 		//alert(msg);
// 		if(msg==""){
// 			return;
// 		}

// 		var receiveid= $(this).attr("talkid");
// 		var senderid= $("#myinfo").attr("curuserid");
// 		$.ajax({
// 			type:"POST",
// 			url:"include/ajax.php",
// 			data:{flag:'sendMsg',msg:msg,senderid:senderid,receiveid:senderid},
// 			success:function(res){
// 				//alert(res);
// 			}
// 		});

// 		$(this).parent().prev().find("#txtMsg").val(" ");
// 		var myHeadImageUrl=$(".headImg").attr("curHeadImageUrl");
// 		//alert(myHeadImageUrl);

// 		var chathtmlA ='';
// 			chathtmlA +='<div id="'+talkid+'"  class="box">';
// 		    chathtmlA +='	<div class="onetalkbox">';
// 		    chathtmlA +='		<div class="headImage"><img src=" '+myHeadImageUrl+' " class="headImage"  /></div>';
// 		    chathtmlA +='		<div class="onetalk">'+msg+'</div>';
// 		    chathtmlA +='	</div>';
// 		    chathtmlA +='</div>';	
// 		   $(".talkContent").append(chathtmlA);
		
// 	});	


// }