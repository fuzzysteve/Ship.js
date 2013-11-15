<html>
<head>
<title>Ship DNA Generator</title>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script src='ship.js'></script>

</head>

<body bgcolor="lightgrey" style="padding:10px">
<?
require_once('db.inc.php');


$fitting=$_POST['fitting'];

$fittingarray = preg_split ('/$\R?^/m', $fitting);

$shipdetails=explode(",",$fittingarray[0],2);

if (count($shipdetails)>40 or (substr($shipdetails[0],0,1) != "[") )
{
echo "Too big or bad format";
exit;
}


$shipname=trim($shipdetails[0],"[");

$mods=array();
$mods[$shipname]=1;
$inner=array_shift($fittingarray);
foreach ($fittingarray as $line)
{
    if (preg_match('/^(.*) x(\d+)$/',trim($line),$matches))
    {
        if(array_key_exists($matches[1],$mods))
        {
            $mods[$matches[1]]+=$matches[2];
        }
        else
        {
            $mods[$matches[1]]=$matches[2];
        }
    }
    else if (!preg_match('/\[/',$line))
    {
        $line=trim($line);
        $moduledetail=explode(",",$line,2);
        if(array_key_exists($moduledetail[0],$mods))
        {
            $mods[$moduledetail[0]]++;
        }
        else
        {
            $mods[$moduledetail[0]]=1;
        }
        if (array_key_exists(1,$moduledetail))
        {
            if(array_key_exists(trim($moduledetail[1]),$mods))
            {
                $mods[trim($moduledetail[1])]++;
            }
            else
            {
                $mods[trim($moduledetail[1])]=1;
            }
        }
    }
}


$sql="select invTypes.typeid,typename,COALESCE(effectid,categoryID) effectid from invTypes left join dgmTypeEffects on (dgmTypeEffects.typeid=invTypes.typeid and effectid in (11,12,13,2663,3772)), invGroups where invTypes.typename=? and invTypes.groupid=invGroups.groupid";
$stmt = $dbh->prepare($sql);


$high=array();
$med=array();
$low=array();
$subsystem=array();
$ammo=array();
$rig=array();
$drones=array();


foreach ($mods as $module=>$number)
{
    $stmt->execute(array($module));
    if ($row = $stmt->fetchObject())
    {
        switch($row->effectid)
        {
         case 6:
            $shipid=$row->typeid;
            break;
        case 8:
            $ammo[$row->typeid]=(int)$number;
            break;
        case 11:
            $low[$row->typeid]=(int)$number;
            break;
        case 12:
            $high[$row->typeid]=(int)$number;
            break;
        case 13:
            $med[$row->typeid]=(int)$number;
            break;
        case 18:
            $drones[$row->typeid]=(int)$number;
            break;
        case 2663:
            $rig[$row->typeid]=(int)$number;
            break;
        case 3772:
            $subsystem[$row->typeid]=(int)$number;
            break;
        }
    }

}

$dna=$shipid.":";


foreach ($subsystem as $module=>$number)
{ 
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":").":";

foreach ($high as $module=>$number)
{
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":").":";
foreach ($med as $module=>$number)
{
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":").":";
foreach ($low as $module=>$number)
{
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":").":";
foreach ($rig as $module=>$number)
{
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":").":";
foreach ($drones as $module=>$number)
{
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":").":";
foreach ($ammo as $module=>$number)
{
$dna.=$module.";".$number.":";
}
$dna=trim($dna,":")."::";
?>
<h1><? if ($shipid) {echo $shipname;} ?> fitting</h1>
<textarea cols=60 rows=2>
<? echo $dna; ?>
</textarea>
<div id="shipdisplay"></div>

<script>
insertship('shipdisplay','<? echo $dna; ?>');
</script>
<hr>
<a href="http://www.fuzzwork.co.uk/ships/dnagen.php">Back to the generator</a>
</body>
</html>
