<?php
    function logout(){
        session_start();
        session_unset();
        session_destroy();
    }

    logout();

?>