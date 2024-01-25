<?php

$bdd = "adumolie_bd";
$host = "lakartxela.iutbayonne.univ-pau.fr";
$user = "adumolie_bd";
$pass = "adumolie_bd";

$GLOBALS['connexion'] = mysqli_connect($host, $user, $pass, $bdd);

function getTheme($id){
    $connexion = $GLOBALS['connexion'];

    $requete = "SELECT nom FROM THEME WHERE id=$id;";
    $resultat = mysqli_query($connexion, $requete);

    $ligne = mysqli_fetch_assoc($resultat);

    $nom_theme = $ligne['nom'];

    return $nom_theme;
}




function getNiveaux() {

    session_start();

    $connexion = $GLOBALS['connexion'];
    
    $Niveau =  new stdClass;
    $Niveau->accessible = array();
    $Niveau->bloque = array();

    $limiteAffichage = $_GET['lim']; //Limite le nombre de vignette à afficher

    if (isset($_SESSION['auth'])) {
        $requete = "SELECT * FROM NIVEAU WHERE id <= (SELECT MAX(id_niveau+1) FROM COMPLETER WHERE id_utilisateur = ". $_SESSION['auth'] ." ) OR id = 1 LIMIT $limiteAffichage;";
        $resultat = mysqli_query($connexion, $requete);

        while ($ligne = mysqli_fetch_assoc($resultat)){
            $item = new stdClass();
            $item->id =  $ligne['id'];
            $item->family = utf8_encode($ligne['nom']);
            $item->difficulty =$ligne['difficulte'];
            $item->theme = getTheme($ligne['id_theme']); 
            array_push($Niveau->accessible,$item);
        }

        $dernierId = end($Niveau->accessible);
        $nouvelleLimite = $limiteAffichage - count($Niveau->accessible);

        $requete = "SELECT * FROM NIVEAU WHERE id > $dernierId LIMIT $nouvelleLimite;";
        $resultat = mysqli_query($connexion, $requete);
 
        while ($ligne = mysqli_fetch_assoc($resultat)){
            $item = new stdClass();
            $item->id =  $ligne['id'];
            $item->family = utf8_encode($ligne['nom']);
            $item->difficulty =$ligne['difficulte'];
            $item->theme = getTheme($ligne['id_theme']); 
            array_push($Niveau->bloque,$item);
        }
    }else {
        $requete = "SELECT * FROM NIVEAU LIMIT $limiteAffichage;";
        $resultat = mysqli_query($connexion, $requete);
     
        while ($ligne = mysqli_fetch_assoc($resultat)){
            $item = new stdClass();
            $item->id =  $ligne['id'];
            $item->family = utf8_encode($ligne['nom']);
            $item->difficulty =$ligne['difficulte'];
            $item->theme = getTheme($ligne['id_theme']); 
            array_push($Niveau->bloque,$item);
        }
        
    }

    return json_encode($Niveau);
}

echo getNiveaux();
?>