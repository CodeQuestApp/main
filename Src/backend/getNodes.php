<?php
session_start();
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

    if (isset ($_SESSION['auth'])) {
       
        include './connexionBD.php';

        //teste si l'utilisateur a accès à ce niveau
        $accesNiveau= "SELECT MAX(id) AS id_niv FROM NIVEAU WHERE id <=( SELECT MAX(id_niveau+1) FROM COMPLETER WHERE id_utilisateur = ".$_SESSION['auth'] . ") OR id=1; ";
        $resultat = mysqli_query($connexion, $accesNiveau); 
        $ligne = mysqli_fetch_assoc($resultat);

        if ($id <= $ligne['id_niv']) {
            $algo = new stdClass(); // Création d'un objet algo qui va contenir les différents noeuds
            $requete = "SELECT * FROM ALGORITHME WHERE id=$id;"; // requête récupérant un texte à afficher dans le niveau
            $resultat = mysqli_query($connexion, $requete);      // exécution de la requête
    
            $ligne = mysqli_fetch_assoc($resultat); // Récupération du texte
            $algo->txt = $ligne['texte'];    // du theme demandé
    
            $nodes = array();
            
            try {
                
                $conn = new PDO('mysql:host='.$host.';dbname='.$bdd,$user,$pass); // connexion à la BD
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $res = $conn->prepare("SELECT S.* FROM SOMMET S JOIN POSSEDER P ON S.id = P.id_sommet WHERE P.id_algorithme = ?;"); // requête qui récupère les infos sur les noeuds en BD
                $res->bindParam(1,$id);
                $res->execute();
                $res->setFetchMode(PDO::FETCH_OBJ);
    
                while ($tuple = $res->fetch()) {
                    $tuple->texte = $tuple->texte;
                    array_push($nodes,$tuple); // Ajout des infos dans $nodes (liste des noeuds)
                }
                
                $algo->nodes = $nodes;

                $conn = NULL;
                $res = NULL;

                print_r(json_encode($algo, JSON_UNESCAPED_UNICODE)); // On retourne $algo au format JSON
            } catch (Exception $e) {
                print 'Error : '.$e->getMessage().'<br>';
            } 
        }

        mysqli_close($connexion);

    }

}

getNodes($id_niveau); // appel de getNodes avec l'id du niveau demandé


?>