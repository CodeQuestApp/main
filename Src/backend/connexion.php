<?php

    function connexion(){
        $usr = "adumolie_bd";
        $pw = "adumolie_bd";
        $bd = "adumolie_bd";

        $server = "lakartxela.iutbayonne.univ-pau.fr";
        $conn = mysqli_connect($server, $usr, $pw, $bd);
        
        $options = [
            'cost' => 12,
        ];

        $email = $_POST["email"];
        $password = $_POST["password"];
        
        $verifMail = mysqli_query($conn, "SELECT email,mdp,id FROM UTILISATEUR;");

        while ($ligne = mysqli_fetch_assoc($verifMail)){
            if (password_verify($email, $ligne["email"])){
                if (password_verify($password, $ligne["mdp"])){
                    session_start();
                    $_SESSION['email'] = TRUE;
                    $_SESSION['mdp'] = TRUE;
                    $_SESSION['auth'] = $ligne["id"];
                    return TRUE;
                }
            }
        }
        return FALSE; 
    }

    connexion();
    


?>