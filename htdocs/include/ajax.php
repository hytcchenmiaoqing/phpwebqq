<?php
	include_once "ez_sql_core.php";
	include_once "ez_sql_mysql.php";
	session_start();

	$flag =isset($_POST["flag"])?$_POST["flag"]:"";
	$msg =isset($_POST["msg"])?$_POST["msg"]:"";
	$senderid =isset($_POST["senderid"])?$_POST["senderid"]:"";
	$receiveid =isset($_POST["receiveid"])?$_POST["receiveid"]:"";
	$db = new ezSQL_mysql();
	$curUserid=isset($_SESSION["wodeid"])?$_SESSION["wodeid"]:"";

	$msgSender=isset($_POST["msgSender"])?$_POST["msgSender"]:"";
	$newNickname=isset($_POST["newNickname"])?$_POST["newNickname"]:"";
	$newShuoshuo=isset($_POST["newShuoshuo"])?$_POST["newShuoshuo"]:"";
	$newpwd=isset($_POST["newpwd"])?$_POST["newpwd"]:"";
	$friendNoteName=isset($_POST["friendNoteName"])?$_POST["friendNoteName"]:"";
	$cufriendid=isset($_POST["cufriendid"])?$_POST["cufriendid"]:"";
	//echo $curUserid;

	if($flag =="sendMsg"){
		$sql ="insert into messageinfo (id,msgContent,msgSender,msgReceiver,msgSendTime,msgState)";
		$sql.=" values(null,'$msg',$senderid,$receiveid,now(),'unread')";
		$res =$db->query($sql);
		if(!$res){
			echo "fail";
		}else {
			echo "ok";
		}
		die();
	}

	if($flag =="getUnreadMsg"){
		if ($curUserid == " ") {
			echo "need login";
			die();
		}
		$sql = "select * from messageinfo where msgReceiver= $curUserid and msgState ='unread' ";
		$res=$db->get_results($sql);

		echo json_encode($res);
	}

	if($flag =="changeMsgState"){

		$sql ="update messageinfo set msgState='read' where msgSender=$msgSender";
		echo $sql;
		$res =$db->get_results($sql);
		if(!$res){
			echo "fail";
		}else {
			echo "ok";
		}
		die();
	}
	if($flag=="logoin"){
			$sql ="update userinfo set userState='online' where id=$curUserid";
			echo "$curUserid";
			$res=$db->get_results($sql);
		}

	if($flag=="logout"){
		$sql ="update userinfo set userState='offline' where id=$curUserid";
		$res=$db->get_results($sql);

	}

	if($flag=="changelogout"){
		$sql="SELECT * FROM userinfo WHERE id in (SELECT friendid FROM friendsinfo where userid=$curUserid)";
		$res=$db->get_results($sql);

		echo json_encode($res);
	}

	if($flag=="changemyinfo"){
		$sql="update userinfo set userNickname='$newNickname',shuoshuo='$newShuoshuo',userpwd='$newpwd' where id=$curUserid ";
		$res=$db->get_results($sql);

	}
	if($flag=="changefriendinfo"){
		$sql="update friendsinfo set friendNoteName='$newfriendNoteName' where userid=$curUserid and friendid=$cufriendid ";
		$res=$db->get_results($sql);

	}
	if($flag=="selectinfo"){
		$sql="select * from userinfo";
		$res=$db->get_results($sql);

		echo json_encode($res);
	}
	
?>