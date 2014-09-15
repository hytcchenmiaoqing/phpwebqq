<?php
	include_once "include/ez_sql_core.php";
	include_once "include/ez_sql_mysql.php";
	session_start();
	

	$userid = isset($_POST["userid"])?$_POST["userid"]:"" ;
	//echo $userid;
	$userpwd = isset($_POST["userpwd"])?$_POST["userpwd"]:"" ;
	//echo $userpwd;
	if($userid !=="" && $userpwd !== ""){
		$db = new ezSQL_mysql();
		$sql ="select * from userinfo where id='". $userid . "' and userpwd ='" .$userpwd."' ";
		$res = $db->get_row($sql);
		if( !$res){
			//echo "fail to login";
			header("location:login.php?error=wrongpwd");
			die();

		}else{
			$_SESSION["wodeid"]= $userid;
			$_SESSION["wodenicheng"]= $res->userNickname;
			//echo "success to login! welcome " .$res->userNickname;
		

		}

	$curid = isset($_SESSION["wodeid"])?$_SESSION["wodeid"]:"" ;

	$curnicheng = isset($_SESSION["wodenicheng"])?$_SESSION["wodenicheng"]:"" ;
	//echo $curnicheng;
	if($curid ==""){
		header("location:login.php?error=needlogin");
		die();
	}else{
			
	}

	}

?>

<html>
<head>
	<meta charset=utf-8 />
	<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
	<link rel="stylesheet" type="text/css" href=" css/index.css">
	<title>we chat</title>
</head>
<body>
	<div class="left">

		<div id="myinfo" curuserid="<?php echo  $curid; ?>">
		<?php
			$db = new ezSQL_mysql();
			$res = $db->get_row("select * from userinfo where id=$curid");
			
				$myHeadImageUrl = $res->userHeadImage;
				$myshuoshuo = $res ->shuoshuo;
				 echo "
				 <li>
					<div class='myImg friendImg'><img src='$myHeadImageUrl' curHeadImageUrl='".$myHeadImageUrl."' class='headImg'></div>
					<div class='myInfo friendInfo'>
						<a class='myNickName NickName'>".$curnicheng."</a>
						<span class='Myshuoshuo shuoshuo'>".$myshuoshuo."</span>
						<a class='logout' href='login.php?logout=yes'>logout</a>
			 		</div>
				</li>
			";
		?>	
		</div>
		
		<div class="friendList">
			<ul class="onlinefriendList">
			<?php
				//echo $curid;
				$db=new ezSQL_mysql();
				$res = $db->get_results("select userinfo.id,userinfo.userNickname,userinfo.userHeadImage,userinfo.shuoshuo,userinfo.userState,friendsinfo.friendNoteName,friendsinfo.friendid from userinfo,friendsinfo where userinfo.id = friendsinfo.friendid and friendsinfo.userid=".$curid);
				$onlineHTML="";
				$offLineHTML="";
				if ($res) {
					foreach ($res as $friend) {
						$curid = $friend ->friendid;
						//echo $curid;
						$curHeadImageUrl = $friend ->userHeadImage;
						$curfriendNickName = $friend ->friendNoteName;
						$curshuoshuo = $friend ->shuoshuo;
						$curState = $friend ->userState;
						//echo $curState;
						if($curState=="online"){
							$onlineHTML.= "
							<li class='friendli' id='friendlitalk$curid' talkid='$curid' talkname='$curfriendNickName' isshow='no' isapper='no'>
								<div class='friendImg'><img src='$curHeadImageUrl' class='headImg'></div>
								<div class='friendInfo'>
									<a class='NickName'>". $curfriendNickName."</a>
									<span class='shuoshuo'>".$curshuoshuo."</span>
									<a>".$curState."</a>
								</div>
							</li>";
						}else{
							$offLineHTML.="

								<li class='friendli' talkid='talk$curid' talkname='$curfriendNickName' isshow='no' isapper='no'>
									<div class='friendImg '><img src='$curHeadImageUrl' class='headImg grey'></div>
									<div class='friendInfo'>
										<a class='NickName'>". $curfriendNickName."</a>
										<span class='shuoshuo'>".$curshuoshuo."</span>
										<a>".$curState."</a>
									</div>
								</li>";
							

						}
						
					}echo $onlineHTML;
				}

			?>
			</ul>
			<ul class="offlinefriendList">
			<?php
				echo $offLineHTML;
			?>

			</ul>
		</div>
	</div>
	<div class="right">
	
	<!-- 	<div class="talk">
			 <div class="talkboxtitle"><a></a><span class="close"></span></div>
			 <div class="talkbox">
				<div class="talkContent" >
					
						
					

				</div>
				<div class="sendMsg">
					<div class="sendbox"><input id="txtMsg" type="text" maxlength="4000" value=" " /></div>
					<div class="sendbtn"><input id="send" type="submit" value="发送" /></div>

				 </div>
			</div>
		</div>
 -->
	</div>
</body>
</html>