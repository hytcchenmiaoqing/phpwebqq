<?php
	include_once "ez_sql_core.php";
	include_once "ez_sql_mysql.php";
	session_start();

	$flag =isset($_POST["flag"])?$_POST["flag"]:"";
	$msg =isset($_POST["msg"])?$_POST["msg"]:"";
	$senderid =isset($_POST["senderid"])?$_POST["senderid"]:"";
	$receiveid =isset($_POST["receiveid"])?$_POST["receiveid"]:"";
	$db = new ezSQL_mysql();

	if($flag =="sendMsg"){
		$sql ="insert into messageinfo (id,msgContent,msgSender,msgReceiver,msgSendTime,msgState)";
		$sql .="values(null,'$msg',$senderid,$receiveid,now(),'unread')";
		$res =$db->query($sql);
		if(!$res){
			echo "fail";
		}else {
			echo "ok";
		}
		die();
	}
	
?>