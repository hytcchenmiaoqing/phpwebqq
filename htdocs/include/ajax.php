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
		
		$res =$db->get_results($sql);
		if(!$res){
			echo "fail";
		}else {
			echo "ok";
		}
		die();
	}


	
?>