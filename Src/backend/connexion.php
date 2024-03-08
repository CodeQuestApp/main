<?php
    session_start();
    function connexion(){
        include './connexionBD.php';
        
        $options = [
            'cost' => 12,
        ];

        $email = $_POST["login-email"];
        $password = $_POST["login-password"];
        
        $verifMail = mysqli_query($connexion, "SELECT email,mdp,id FROM UTILISATEUR;");

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
        

        return FALSE; 
    }

    connexion();
    header('Location: ../');
?>