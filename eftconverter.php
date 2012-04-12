<?
$fitting="[Punisher, Kaylen Khurelem's Punisher]
Damage Control II
Small Armor Repairer I
Adaptive Nano Plating II
100mm Reinforced Nanofiber Plates I

Experimental 1MN Afterburner I
Fleeting Progressive Warp Scrambler I

Gatling Afocal Maser I,Multifrequency S
Gatling Afocal Maser I,Multifrequency S
Gatling Afocal Maser I,Multifrequency S
Small Nosferatu I

[empty rig slot]
";

$fittingarray = preg_split ('/$\R?^/m', $fitting);

$shipdetails=explode(",",$fittingarray[0],2);

$shipname=trim($shipdetails[0],"[");
echo $shipname;

$mods=array();
$inner=array_shift($fittingarray);
foreach ($fittingarray as $line)
{
    if (!preg_match('/\[/',$line))
    {
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
            if(array_key_exists($moduledetail[1],$mods))
            {
                $mods[$moduledetail[1]]++;
            }
            else
            {
                $mods[$moduledetail[1]]=1;
            }
        }
    }
}


foreach ($mods as $module=>$number)
{
    echo $module.";".$number;
}






?>
