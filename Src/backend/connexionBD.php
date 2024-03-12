<?php

    $user = "351424_bd";                          //
    $pass = "codequestapp_bd";                      //  Infos pour la connexion 
    $bdd = "codequestapp_bd";                     //  à la BD
    $host = "mysql-codequestapp.alwaysdata.net"; // Pour alwaysdata
        
    $connexion = mysqli_connect($host, $user, $pass, $bdd); // connexion à la BD

?>
