<?php

$user = "adumolie_bd";                              //
$pass = "adumolie_bd";                              //  Infos pour la connexion 
$bdd = "adumolie_bd";                               //  à la BD
$host = "lakartxela.iutbayonne.univ-pau.fr";        //

$GLOBALS['connexion'] = mysqli_connect($host, $user, $pass, $bdd); // connexion à la BD en global pour pouvoir l'utiliser dans les différentes fonctions


/*** getNomTheme ***\
 * 
 * description :  Permet de connaître l'intitulé 
 *                d'un thême à partir d'un id de theme.
 * 
 * input : id d'un theme
 * output : nom du theme demandé
 * 
 * */
function getNomTheme($id){
    $connexion = $GLOBALS['connexion'];

    $requete = "SELECT nom FROM THEME WHERE id=$id;";   // requête de récupération du nom du theme
    $resultat = mysqli_query($connexion, $requete);     // exécution de la requête

    $ligne = mysqli_fetch_assoc($resultat); // Récupération du nom
    $nom_theme = $ligne['nom'];             // du theme demandé

    return $nom_theme;
}



/*** getNiveaux ***\
 * 
 * description :  Permet 
 *                
 * 
 * input :
 * output : infos sur les niveau en format JSON
 * 
 * */
function getNiveaux() {

    session_start();

    $connexion = $GLOBALS['connexion'];
    
    $Niveau =  new stdClass;        // Création d'un objet qui va contenir les infos d'un niveau
    $Niveau->accessible = array();  // liste contenant les niveaux disponibles
    $Niveau->bloque = array();      // liste contenant des niveaux accessibles

    $limiteAffichage = $_GET['lim']; // Limite du nombre de vignette à afficher
    
    // ------- Si l'utilisateur est connecté ------- \\
    if (isset($_SESSION['auth'])) {
        // requête récupérant les infos des niveaux disponibles pour un joueur
        $requete = "SELECT * FROM NIVEAU WHERE id <= (SELECT MAX(id_niveau+1) FROM COMPLETER WHERE id_utilisateur = ". $_SESSION['auth'] ." ) OR id = 1 LIMIT $limiteAffichage;";
        $resultat = mysqli_query($connexion, $requete); // exécution de la requête

        while ($ligne = mysqli_fetch_assoc($resultat)){     //  
            $item = new stdClass();                         //  Ajout des informations
            $item->id =  $ligne['id'];                      //  des niveaux disponibles
            $item->family = utf8_encode($ligne['nom']);     //  dans la liste accessible de
            $item->difficulty =$ligne['difficulte'];        //  l'objet Niveau
            $item->theme = getNomTheme($ligne['id_theme']); //
            array_push($Niveau->accessible,$item);          //
        }

        $dernierId = end($Niveau->accessible)->id;                              //  définition de la nouvelle limite en
        $nouvelleLimite = $limiteAffichage - count($Niveau->accessible);    //  fonction du nombre de vignettes disponibles

        $requete = "SELECT * FROM NIVEAU WHERE id > $dernierId LIMIT $nouvelleLimite;"; //  requête récupérant les infos des niveaux
        $resultat = mysqli_query($connexion, $requete);                                 //  non disponibles pour un joueur et exécution de celle-ci
 
        while ($ligne = mysqli_fetch_assoc($resultat)){     //  
            $item = new stdClass();                         //  Ajout des informations
            $item->id =  $ligne['id'];                      //  des niveaux indisponibles
            $item->family = utf8_encode($ligne['nom']);     //  dans la liste bloque de
            $item->difficulty =$ligne['difficulte'];        //  l'objet Niveau
            $item->theme = getNomTheme($ligne['id_theme']); //
            array_push($Niveau->bloque,$item);              //
        }

    }
    // ------- Si l'utilisateur n'est pas connecté ------- \\
    else {

        // l'utilisateur n'étant pas connecté tout les niveaux sont donc bloqués

        $requete = "SELECT * FROM NIVEAU LIMIT $limiteAffichage;";  // récupération des infos pour un niveau
        $resultat = mysqli_query($connexion, $requete);             // et exécution de la requête
     
        while ($ligne = mysqli_fetch_assoc($resultat)){     //  
            $item = new stdClass();                         //  Ajout des informations
            $item->id =  $ligne['id'];                      //  des niveaux indisponibles
            $item->family = utf8_encode($ligne['nom']);     //  dans la liste bloque de
            $item->difficulty =$ligne['difficulte'];        //  l'objet Niveau
            $item->theme = getNomTheme($ligne['id_theme']); //
            array_push($Niveau->bloque,$item);              //
        }
        
    }

    return json_encode($Niveau); // on retourne l'objet niveau au format JSON
}

echo getNiveaux();
?>