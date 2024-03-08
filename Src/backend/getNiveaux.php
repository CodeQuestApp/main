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

    include './connexionBD.php';
    
    $nom_theme = array("","C++","Python","HTML,CSS","C#","Algorithmique","Swift","Ruby");
    
    $Niveau =  new stdClass;        // Création d'un objet qui va contenir les infos d'un niveau
    $Niveau->accessible = array();  // liste contenant les niveaux disponibles
    $Niveau->bloque = array();      // liste contenant des niveaux accessibles

    $limiteAffichage = $_GET['lim']; // Limite du nombre de vignette à afficher
    
    // ------- Si l'utilisateur est connecté ------- \\
    if (isset($_SESSION['auth'])) {
        // requête récupérant les infos des niveaux disponibles pour un joueur
        $requete = "SELECT * FROM NIVEAU WHERE id <= (SELECT MAX(id_niveau+1) FROM COMPLETER WHERE id_utilisateur = ". $_SESSION['auth'] ." ) OR id = 1 LIMIT ?;";

        $resultat = mysqli_prepare($connexion, $requete); // exécution de la requête
        mysqli_stmt_bind_param($resultat, "s",  $limiteAffichage);
        mysqli_stmt_execute($resultat);

        mysqli_stmt_bind_result($resultat, $id, $nom, $difficulte, $score_max, $id_theme);

        while ( mysqli_stmt_fetch($resultat)){      //  
            $item = new stdClass();                 //  Ajout des informations
            $item->id =  $id;                       //  des niveaux indisponibles
            $item->family = utf8_encode($nom);      //  dans la liste accessible 
            $item->difficulty = $difficulte;        //  de l'objet Niveau
            $item->theme = $nom_theme[$id_theme];   //
            array_push($Niveau->accessible,$item);  //
        }
        
        mysqli_stmt_close($resultat);


        $dernierId = end($Niveau->accessible)->id;                          //  définition de la nouvelle limite en
        $nouvelleLimite = $limiteAffichage - count($Niveau->accessible);    //  fonction du nombre de vignettes disponibles

        $requete = "SELECT * FROM NIVEAU WHERE id > $dernierId LIMIT ?;";   //  requête récupérant les infos des niveaux
        $resultat = mysqli_prepare($connexion, $requete);                   // exécution de la requête
        mysqli_stmt_bind_param($resultat, "s",  $limiteAffichage);
        mysqli_stmt_execute($resultat);

        mysqli_stmt_bind_result($resultat, $id, $nom, $difficulte, $score_max, $id_theme);

        while ( mysqli_stmt_fetch($resultat)){      //  
            $item = new stdClass();                 //  Ajout des informations
            $item->id =  $id;                       //  des niveaux indisponibles
            $item->family = utf8_encode($nom);      //  dans la liste bloque de
            $item->difficulty = $difficulte;        //  l'objet Niveau
            $item->theme = $nom_theme[$id_theme];   //
            array_push($Niveau->bloque,$item);  //
        }

    }
    // ------- Si l'utilisateur n'est pas connecté ------- \\
    else {

        // l'utilisateur n'étant pas connecté tout les niveaux sont donc bloqués

        $requete = "SELECT * FROM NIVEAU LIMIT ?;";  // récupération des infos pour un niveau
     
        $resultat = mysqli_prepare($connexion, $requete);
        mysqli_stmt_bind_param($resultat, "s",  $limiteAffichage);
        mysqli_stmt_execute($resultat);

        mysqli_stmt_bind_result($resultat, $id, $nom, $difficulte, $score_max, $id_theme);

        while ( mysqli_stmt_fetch($resultat)){     //  
            $item = new stdClass();                         //  Ajout des informations
            $item->id =  $id;                      //  des niveaux indisponibles
            $item->family = utf8_encode($nom);     //  dans la liste bloque de
            $item->difficulty = $difficulte;        //  l'objet Niveau
            $item->theme = $nom_theme[$id_theme]; //
            array_push($Niveau->bloque,$item);              //
        }

        mysqli_stmt_close($resultat);
        
    }

    return json_encode($Niveau, JSON_UNESCAPED_UNICODE); // on retourne l'objet niveau au format JSON
}

echo getNiveaux();
mysqli_close($connexion);



?>