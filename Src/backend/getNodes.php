<?php
// Récupération de l'id passer via l'url
$id_niveau = $_GET['id'];

/*** getNodes ***\
 * 
 * description : getNodes permet de récupérer les informations nécessaires 
 *               à la création d'un algorithme pour un niveau de jeu.
 * 
 * input : id d'un niveau de jeu
 * output : Objet JSON des sommets
 * 
 * */
function getNodes($id) {

    $user = "adumolie_bd";                       //
    $pass = "adumolie_bd";                       //  Infos pour la connexion 
    $bdd = "adumolie_bd";                        //  à la BD
    $host = "lakartxela.iutbayonne.univ-pau.fr"; //
    
    $connexion = mysqli_connect($host, $user, $pass, $bdd); // connexion à la BD


    $algo = new stdClass(); // Création d'un objet algo qui va contenir les différents noeuds

    $requete = "SELECT * FROM ALGORITHME WHERE id=$id;"; // requête récupérant un texte à afficher dans le niveau
    $resultat = mysqli_query($connexion, $requete);      // exécution de la requête

    $ligne = mysqli_fetch_assoc($resultat); // Récupération du texte
    print(utf8_encode(mysqli_real_escape_string($connexion,$ligne['texte'])));    // du theme demandé
    
    print_r(json_encode($algo));

    
    $nodes = array();

    try {
        $conn = new PDO('mysql:host='.$host.';dbname='.$bdd,$user,$pass); // connexion à la BD
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $res = $conn->query("SELECT S.* FROM SOMMET S JOIN POSSEDER P ON S.id = P.id_sommet WHERE P.id_algorithme = $id;"); // requête qui récupère les infos sur les noeuds en BD
        $res->setFetchMode(PDO::FETCH_OBJ);

        while ($tuple = $res->fetch()) {
            array_push($nodes,$tuple); // Ajout des infos dans $nodes (liste des noeuds)
        }

        $algo->nodes = $nodes;
        print_r(json_encode($algo));
        return json_encode($algo); // On retourne $algo au format JSON
    } catch (Exception $e) {
        print 'Error : '.$e->getMessage().'<br>';
    }
}

getNodes($id_niveau); // appel de getNodes avec l'id du niveau demandé
?>