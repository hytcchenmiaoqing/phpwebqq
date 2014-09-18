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
			$_SESSION["wodemima"]=$res->userpwd;
			//echo "success to login! welcome " .$res->userNickname;
		

		}

	$curid = isset($_SESSION["wodeid"])?$_SESSION["wodeid"]:"" ;

	$curnicheng = isset($_SESSION["wodenicheng"])?$_SESSION["wodenicheng"]:"" ;
	//echo $curnicheng;
	$curpwd =isset($_SESSION["wodemima"])?$_SESSION["wodemima"]:"";
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
							<li class='friendli' id='friendlitalk$curid' talkid='$curid' talkname='$curfriendNickName' isshow='no' isapper='no' friendImg='".$curHeadImageUrl."'>
								<div class='friendImg'><img src='$curHeadImageUrl' class='headImg'></div>
								<div class='friendInfo'>
									<a class='NickName'>". $curfriendNickName."</a>
									<a class='xgFNickname' id='xgFNickname$curid'>修改好友备注</a>
									<span class='shuoshuo'>".$curshuoshuo."</span>
									<a class='State'>".$curState."</a>
								</div>
							</li>";
						}else{
							$offLineHTML.="

								<li class='friendli' id='friendlitalk$curid' talkid='$curid' talkname='$curfriendNickName' isshow='no' isapper='no' friendImg='".$curHeadImageUrl."'>
									<div class='friendImg '><img src='$curHeadImageUrl' class='headImg grey'></div>
									<div class='friendInfo'>
										<a class='NickName'>". $curfriendNickName."</a>
										<a class='xgFNickname'  id='xgFNickname$curid'>修改好友备注</a>
										<span class='shuoshuo'>".$curshuoshuo."</span>
										<a class='State'>".$curState."</a>
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
		<div class="changemyinfo box">
			<div class="talkboxtitle"><a>修改个人信息</a><span class="close"></span></div>
			<ul>
				<li><a>昵称</a><input type="text" value="<?php echo $curnicheng; ?>" class="newNickname" /></li>
				<li><a>密码</a><input type="password" value="<?php echo $curpwd;?>" class="newpwd" /></li>
				<li><a>说说</a><input type="text" value="<?php echo $myshuoshuo;?>" class="newShuoshuo" /></li>
			</ul>
			<div class="xiugai"><input type="submit" class="xiugaimybtn" value="确认修改" /></div>						
		</div>
		<div class="changefriendinfo box">
			<div class="talkboxtitle"><a>修改好友备注</a><span class="close"></span></div>
			<ul>
				<li><a>备注</a><input type="text" class="newfriendNoteName" /></li>
			</ul>
			<div class="xiugai"><input type="submit" class="xiugaifriendbtn" value="确认修改" /></div>						
		</div>
</body>
</html>