<?php

    function inscription(){
        $usr = "adumolie_bd";
        $pw = "adumolie_bd";
        $bd = "adumolie_bd";

        $server = "lakartxela.iutbayonne.univ-pau.fr";
        $conn = mysqli_connect($server, $usr, $pw, $bd);
        
        $options = [
            'cost' => 12,
        ];

        $email = password_hash($_POST["register-email"], PASSWORD_BCRYPT, $options);
        $password = password_hash($_POST["register-password"], PASSWORD_BCRYPT, $options);
        
        $verifMail = mysqli_query($conn, "SELECT email FROM UTILISATEUR;");

        while ($ligne = mysqli_fetch_assoc($verifMail)){
            if (password_verify($_POST["register-email"], $ligne["email"])){
                return FALSE;
            }
        }

        $requete = $conn->prepare("INSERT INTO UTILISATEUR VALUES(NULL, ?, ?)");
        $requete->bind_param("ss", $email, $password);
        $requete->execute();
        $requete->close();

        return TRUE;
    }

    inscription();
    


?>