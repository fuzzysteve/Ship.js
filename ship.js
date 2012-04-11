function insertship(div,dna)
{

highslot=["left: 75px; top: 90px", "left: 105px; top: 65px", "left: 140px; top: 47px", "left: 178px; top: 37px", "left: 212px; top: 37px", "left: 253px; top: 43px", "left: 287px; top: 63px", "left: 315px; top: 90px"];
medslot=["left: 45px; top: 142px", "left: 37px; top: 180px", "left: 38px; top: 220px", "left: 49px; top: 257px", "left: 69px; top: 290px", "left: 100px; top:315px", "left: 128px; top: 332px", "left: 165px; top: 347px"];
lowslot=["left: 228px; top: 355px", "left: 267px; top: 343px", "left: 300px; top: 320px", "left: 328px; top: 292px", "left: 345px; top: 260px", "left: 355px; top: 223px", "left: 353px; top: 185px", "left: 350px; top: 145px"]; 
rigslot=["left: 120px; top: 228px", "left: 150px; top: 263px", "left: 192px; top: 276px"];


shipdisplay="<div id='loadoutBg' style='background-image: url(http://www.fuzzwork.co.uk/ships/fitting.png); height: 420px; width: 420px; position: relative;'>'";


    var Url = "http://www.fuzzwork.co.uk/ships/parsedna.php?dna="+dna;

jQuery.get(Url,function(json){
//    json=JSON.parse(jsonreturn);

    shipdisplay=shipdisplay+"<div class='shippic' style='position: absolute; height: 64px; width:64px; left: 178px; top:178px;'><img src='http://image.eveonline.com/InventoryType/"+json["ship"]["shipid"]+"_64.png' title='"+json["ship"]["shipname"]+"'></div>";


    slot=1;
    for (var i = 0; i < json["high"].length; i++)
    {

        for (var key  in json["high"][i])
        {
            for (var num=0; num<json["high"][i][key];num++)
            {
                parts=key.split(':');
            shipdisplay+="<div class='highSlot"+slot+"' style='position: absolute; height: 32px;"+highslot[slot-1]+"'><img src='http://image.eveonline.com/InventoryType/"+parts[1]+"_32.png' title='"+parts[0]+"'></div>";
            slot++;
            }
        }
   } 


    slot=1;
    for (var i = 0; i < json["medium"].length; i++)
    {

        for (var key  in json["medium"][i])
        {
            for (var num=0; num<json["medium"][i][key];num++)
            {
                parts=key.split(':');
            shipdisplay+="<div class='medSlot"+slot+"' style='position: absolute; height: 32px;"+medslot[slot-1]+"'><img src='http://image.eveonline.com/InventoryType/"+parts[1]+"_32.png' title='"+parts[0]+"'></div>";
            slot++;
            }
        }
   }



   slot=1;
    for (var i = 0; i < json["low"].length; i++)
    {

        for (var key  in json["low"][i])
        {
            for (var num=0; num<json["low"][i][key];num++)
            {
                parts=key.split(':');
            shipdisplay+="<div class='lowSlot"+slot+"' style='position: absolute; height: 32px;"+lowslot[slot-1]+"'><img src='http://image.eveonline.com/InventoryType/"+parts[1]+"_32.png' title='"+parts[0]+"'></div>";
            slot++;
            }
        }
   }







 slot=1;
    for (var i = 0; i < json["rig"].length; i++)
    {

        for (var key  in json["rig"][i])
        {
            for (var num=0; num<json["rig"][i][key];num++)
            {
                parts=key.split(':');
            shipdisplay+="<div class='rigSlot"+slot+"' style='position: absolute; height: 32px;"+rigslot[slot-1]+"'><img src='http://image.eveonline.com/InventoryType/"+parts[1]+"_32.png' title='"+parts[0]+"'></div>";
            slot++;
            }
        }
   }


shipdisplay+="</div>";







    document.getElementById(div).innerHTML=shipdisplay;



});



}



