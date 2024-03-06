<?php
    session_start();

    function verif(){

        $session =  new stdClass;
        $session->active = "";

        if( isset($_SESSION['auth'])){
            $session->active = "true";
            print_r(json_encode($session));
        }else{
            $session->active = "false";
            print_r(json_encode($session));
        }
    }

    verif();
?>