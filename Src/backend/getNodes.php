<?php
//header("Access-Control-Allow-Origin: *");
function getNodes() {
    $usr = "adumolie_bd";
    $pw = "adumolie_bd";
    $bd = "adumolie_bd";

    $server = "lakartxela.iutbayonne.univ-pau.fr";
    

    $algo = new stdClass();
    $nodes = array();

    try {
        $conn = new PDO('mysql:host='.$server.';dbname='.$bd,$usr,$pw);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $res = $conn->query("SELECT * FROM SOMMET;");
        $res->setFetchMode(PDO::FETCH_OBJ);

        while ($tuple = $res->fetch()) {
            array_push($nodes,$tuple);
        }

        $algo->nodes = $nodes;
        return json_encode($algo);
    } catch (Exception $e) {
        print 'Error : '.$e->getMessage().'<br>';
    }
}

echo getNodes();
?>