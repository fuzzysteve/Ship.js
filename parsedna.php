<?php
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
require_once('db.inc.php');
$dna=$_GET['dna'];

$array=explode(":",$dna);


$high=array();
$med=array();
$low=array();
$subsystem=array();
$ammo=array();
$rig=array();


$innertypelist=array();
foreach ( $array as $value)
{
    $types=explode(";",$value);
    if ($types[0])
    {
        $innertypelist[]=$types[0];
    }
}


#$sql='select invTypes.typeid,typename,COALESCE(effectid,1) effectid from invTypes left join dgmTypeEffects on (dgmTypeEffects.typeid=invTypes.typeid and effectid in (11,12,13,2663,3772)) where invTypes.typeid=?';
$sql='select invTypes.typeid,typename,COALESCE(effectid,categoryID) effectid from invTypes left join dgmTypeEffects on (dgmTypeEffects.typeid=invTypes.typeid and effectid in (11,12,13,2663,3772)), invGroups where invTypes.typeid=? and invTypes.groupid=invGroups.groupid';
$stmt = $dbh->prepare($sql);

$typenames=array();
$typeslot=array();
foreach ($innertypelist as $value)
{
    $stmt->execute(array($value));

    if ($row = $stmt->fetchObject())
    {
        $typenames[$row->typeid]=$row->typename;
        $typeslot[$row->typeid]=$row->effectid;
    }
}

$shiptype='';
$shipid='';
foreach ( $array as $value)
{
    $types=explode(";",$value);
    if ($types[0])
    {
        switch($typeslot[$types[0]])
        {
        case 6:
            $shipid=$types[0];
            $shiptype= $typenames[$shipid];
            break;
        case 11:
            $low[]=array($typenames[$types[0]].":".$types[0]=>(int)$types[1]);
            break;
        case 12:
            $high[]=array($typenames[$types[0]].":".$types[0]=>(int)$types[1]);
            break;
        case 13:
            $med[]=array($typenames[$types[0]].":".$types[0]=>(int)$types[1]);
            break;
        case 2663:
            $rig[]=array($typenames[$types[0]].":".$types[0]=>(int)$types[1]);
            break;
        case 3772:
            $subsystem[]=array($typenames[$types[0]].":".$types[0]=>1);
            break;
        } 
    }
}
$json=array();
$json["ship"]=array("shipname"=>$shiptype,"shipid"=>$shipid,"dna"=>$dna);
$json["high"]=$high;
$json["medium"]=$med;
$json["low"]=$low;
$json["rig"]=$rig;
$json["subsystem"]=$subsystem;

echo json_encode($json);

?>
