<?php
    session_start();
    function connexion(){
        $usr = "adumolie_bd";
        $pw = "adumolie_bd";
        $bd = "adumolie_bd";

        $server = "lakartxela.iutbayonne.univ-pau.fr";
        $conn = mysqli_connect($server, $usr, $pw, $bd);
        
        $options = [
            'cost' => 12,
        ];

        $email = $_POST["login-email"];
        $password = $_POST["login-password"];
        
        $verifMail = mysqli_query($conn, "SELECT email,mdp,id FROM UTILISATEUR;");

        while ($ligne = mysqli_fetch_assoc($verifMail)){
            if (password_verify($email, $ligne["email"])){
                if (password_verify($password, $ligne["mdp"])){
                    
                    $_SESSION['email'] = TRUE;
                    $_SESSION['mdp'] = TRUE;
                    $_SESSION['auth'] = $ligne["id"];
                    return TRUE;
                }
            }
        }
        
        mysqli_close($verifMail);
        mysqli_close($conn);

        return FALSE; 
    }

    connexion();
    header('Location: ../');
?>