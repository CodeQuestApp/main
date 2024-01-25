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
            $id = $ligne['id'];
            $nom = $ligne['nom'];
            $difficulte = $ligne['difficulte'];
            $theme = $ligne['id_theme'];
            $Niveau->accessible[$id] = array();
            array_push($Niveau->accessible[$id],$nom);
            array_push($Niveau->accessible[$id],$difficulte);
            array_push($Niveau->accessible[$id],getTheme($theme));
        }

        //print '<pre>'; print_r($Niveau->accessible); print '</pre>';

        $dernierId = end($Niveau->accessible);
        $nouvelleLimite = $limiteAffichage - count($Niveau->accessible);

        $requete = "SELECT * FROM NIVEAU WHERE id > $dernierId LIMIT $nouvelleLimite;";
        $resultat = mysqli_query($connexion, $requete);

        while ($ligne = mysqli_fetch_assoc($resultat)){
            $id = $ligne['id'];
            $nom = $ligne['nom'];
            $difficulte = $ligne['difficulte'];
            $theme = $ligne['id_theme'];
            $Niveau->bloque[$id] = array();
            array_push($Niveau->bloque[$id],$nom);
            array_push($Niveau->bloque[$id],$difficulte);
            array_push($Niveau->bloque[$id],getTheme($theme));
        }
        
        //print '<pre>'; print_r($Niveau); print '</pre>';
    }else {
        $requete = "SELECT * FROM NIVEAU LIMIT $limiteAffichage;";
        $resultat = mysqli_query($connexion, $requete);

        while ($ligne = mysqli_fetch_assoc($resultat)){
            $id = $ligne['id'];
            $nom = utf8_encode($ligne['nom']);
            $difficulte = $ligne['difficulte'];
            $theme = $ligne['id_theme'];
            $Niveau->bloque[$id] = array();
            array_push($Niveau->bloque[$id],$nom);
            array_push($Niveau->bloque[$id],$difficulte);
            array_push($Niveau->bloque[$id],getTheme($theme));
        }
        
    }//print '<pre>'; print_r($Niveau); print '</pre>';

    
    return json_encode($Niveau);
}

echo getNiveaux();
?>