<?php
	session_start();
?>
<!DOCTYPE html>
<head>
	<meta charset=utf-8 />
	<script type="text/javascript" src="js/index.js"></script>
	<link rel="stylesheet" type="text/css" href="css/weibologin.css">
	<title></title>
</head>
<?php
	$info =isset($_GET["error"])?$_GET["error"]:"";
	$logout =isset($_GET["logout"])?$_GET["logout"]:"";
	if( $info=="wrongpwd"){
		echo "<script>tiao();</script>";
	}
	if( $logout == "yes"){
		unset($_SESSION["wodeid"]);
		unset($_SESSION["wodenicheng"]);
	}
?>
<body>
	<div id="loginbox">
		<div class="title">
			<span class="word">登录/注册</span>
			<span class="close"></span>
		</div>
		<div id="inner">
			<div class="innertitle">
				<span class="cuti">登录</span>
				<i>|</i>
				<span>注册</span>
			</div>
			<form action="index.php" method="post">
				<div class="inputbox">
					<div class="userid">
						<input name="userid" type="text" id="txtUserid"  />
					</div>
					
				</div>
				<div class="inputbox">
					<div class="userpwd">
						<input name="userpwd" type="text" id="txtUserpwd"  />
					</div>
					
				</div>
				<div class="inputboxS">
					<div class="inputboxSLeft">
						<input type="checkbox" id="checkbox"/>
						<span>下次自动登录</span>
						<i></i>
					</div>
					<div class="inputboxSRight">
						<span>忘记密码</span>
					</div>

				</div>
				<div class="submitbox">
					<input type="submit" value="登录" id="submit" />
				</div>
				
			</form>
		</div>
	</div>
</body>
</html>