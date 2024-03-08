<?php
    session_start();
    function inscription(){
        
        include './connexionBD.php';
        
        $options = [
            'cost' => 12,
        ];

        $email = password_hash($_POST["register-email"], PASSWORD_BCRYPT, $options);
        $password = password_hash($_POST["register-password"], PASSWORD_BCRYPT, $options);
        
        $verifMail = mysqli_query($connexion, "SELECT email FROM UTILISATEUR;");

        while ($ligne = mysqli_fetch_assoc($verifMail)){
            if (password_verify($_POST["register-email"], $ligne["email"])){
                return FALSE;
            }
        }

        $requete = $connexion->prepare("INSERT INTO UTILISATEUR VALUES(NULL, ?, ?)");
        $requete->bind_param("ss", $email, $password);
        $requete->execute();
        

        return TRUE;
    }

    inscription();
    header('Location: ../');


?>