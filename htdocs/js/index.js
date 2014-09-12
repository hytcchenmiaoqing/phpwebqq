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


});
function chathtml(){

	$(".friendList li").click(function(){

		var talkid=$(this).attr("talkid");
		var talkname=$(this).attr("talkname");
		var isshow=$(this).attr("isshow");
		var isapper=$(this).attr("isapper");
		
		if(isshow=="no"){
			$(this).attr("isshow","yes");
			if(isapper=="no"){

			var chathtmlA='';
				chathtmlA +='<div id="'+talkid+'" class="talk" >';
				chathtmlA +='	<div class="talkboxtitle"><a>'+talkname+'</a><span class="close"></span></div>';
				chathtmlA +='		<div class="talkbox">';
				chathtmlA +='			<div class="talkContent"></div>';
				chathtmlA +='		<div class="sendMsg">';
				chathtmlA +='			<div class="sendbox"><input class="txtMsg" type="text"/></div>';
				chathtmlA +='			<div class="sendbtn"><input class="send" type="submit" value="发送" /></div>';
				chathtmlA +='		</div>';
				chathtmlA +='	</div>';
				chathtmlA +='</div>';
				
				
				$(".right").append(chathtmlA);
				$(this).attr("isapper","yes");

			}
			else{	
				$("#"+talkid).show();
			}		
		}
		$(".talk").css("z-index","1");
		$("#"+talkid).css("z-index","22");
		$(".close").click(function(){
			var talkidN = $(this).parent().parent().attr("id");
			$(".friendli[talkid='"+talkidN+"']").attr("isshow","no");
			$("#"+talkid).hide();
			
		});

		// $("#"+talkid).draggable({ 
		// 	handle: ".talkboxtitle" ,
		// 	containment: "parent"
		// });

		
	});
}


function sendMsg(){
	$(document).on("click",".send",function(){
			var msg = $(this).parent().prev().find(".txtMsg").val();
			//alert(msg);
			if(msg==""){
				return;
			}

			var receiveid= $(this).attr("talkid");
			var senderid= $("#myinfo").attr("curuserid");
			$.ajax({
				type:"POST",
	 			url:"include/ajax.php",
	 			data:{flag:'sendMsg',msg:msg,senderid:senderid,receiveid:senderid},
				success:function(res){
					//alert(res);
				}
	 		});

			$(this).parent().prev().find(".txtMsg").val(" ");
			var myHeadImageUrl=$(".headImg").attr("curHeadImageUrl");
			//alert(myHeadImageUrl);

			var chathtmlA ='';
				
			    chathtmlA +='	<div class="onetalkbox">';
			    chathtmlA +='		<div class="headImage"><img src=" '+myHeadImageUrl+' " class="headImage"  /></div>';
			    chathtmlA +='		<div class="onetalk">'+msg+'</div>';
			    chathtmlA +='	</div>';
			    
			$(this).parent().parent().prev(".talkContent").append(chathtmlA);
			//return false;
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