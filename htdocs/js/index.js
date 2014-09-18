function tiao(){
	alert("fail to login ! retry it again!");

}

$(function(){
	
	$(".close").click(function(){
		$("#loginbox").hide();
		
	});

	chathtml();
	sendMsg();
	setInterval('getUnreadMsg()',1000);
	setInterval('changelogout()',1000);
	logoin();
	logout();
	changemyinfo();
	setInterval('selectinfo()',1000);
	

	$(".friendli").hover(function(){

		$(this).find(".xgFNickname").show();
	},function(){
		$(this).find(".xgFNickname").hide();
	});

	xgFNickname();
	draggable();
});
function xgFNickname(){
	$(document).on("click",".xgFNickname",function(){
		
		var cufriendid=$(this).parent().parent().attr("talkid");
		
		var newfriendNoteName=$(".newfriendNoteName").val();

		$(".changefriendinfo").show();
		return false;

	});
	//$(document).on("click",".xiugaifriendbtn",function(){
	$(".xiugaifriendbtn").click(function(){
			$.ajax({
				type:"POST",
				url:"include/ajax.php",
				data:{flag:'changefriendinfo',newfriendNoteName:newfriendNoteName,cufriendid:cufriendid},
				success:function(res){
					alert(res);
				}
			});
			
		
		$(this).parent().parent().hide();
			
	});
}

function selectinfo(){

	$.ajax({
		type:"POST",
		url:"include/ajax.php",
		data:{flag:'selectinfo'},
		success:function(res){
			//alert(res);
			var objs=eval("("+res+")");
			$.each(objs,function(){
					//alert(this.id);
					$("#friendlitalk"+this.id+" .shuoshuo").html(this.shuoshuo);
					var curuserid=$("#myinfo").attr("curuserid");
					if(this.id==curuserid){

						$(".Myshuoshuo").html(this.shuoshuo);
						$(".myNickName").html(this.userNickname);
					}
						
				
				
			});
		}
	});
}

function changemyinfo(){

	$("#myinfo").click(function(){
		$(".changemyinfo").show();
		
	});

	$(".close").click(function(){
		$(this).parent().parent().hide();
			
	});

	$(".xiugaimybtn").click(function(){
		

		var newNickname=$(".newNickname").val();
		var newpwd=$(".newpwd").val();
		var newShuoshuo=$(".newShuoshuo").val();
		

		$.ajax({
			type:"POST",
			url:"include/ajax.php",
			data:{flag:'changemyinfo',newNickname:newNickname,newpwd:newpwd,newShuoshuo:newShuoshuo,newfriendNoteName:newfriendNoteName},
			success:function(res){
			}
		});
		
		$(this).parent().parent().hide();
			
	});
	
}

function draggable(){
	$(".box").draggable({ 
			handle: ".talkboxtitle" ,
			containment: "parent"
		});
}


function logoin(){
	
		$.ajax({
			type:"POST",
			url:"include/ajax.php",
			data:{flag:'logoin'},
			success:function(res){
				
				//alert(res);
			}
		});
	
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
					//alert(shuoshuo);
					if(userState=="online"&&id!=curuserid&&State=="offline"){
						$("#friendlitalk"+id).remove();

						var onlinehtml ='';
							onlinehtml +='<li class="friendli" id="friendlitalk'+id+'" talkid="'+id+'" talkname="'+talkname+'" isshow="no" isapper="no" friendImg="'+userHeadImage+'">';
							onlinehtml +='	<div class="friendImg"><img src="'+userHeadImage+'" class="headImg"></div>';
							onlinehtml +='	<div class="friendInfo">';
							onlinehtml +='		<a class="NickName">'+talkname+'</a>';
							onlinehtml +='		<a class="xgFNickname"   id="xgFNickname'+id+'">修改好友备注</a>';
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
							offlinehtml +='		<a class="xgFNickname"  id="xgFNickname'+id+'">修改好友备注</a>';
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
							
						}else{
							$("#friendlitalk"+msgSender).css("background-color","#b6cf5f");
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

		$(this).css("background-color","#fff");
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
					//alert(res);
				}
	 		});

			$(this).parent().prev().find(".txtMsg").val("");
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

