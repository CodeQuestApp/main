<?php
function getNodes() {
    $serv = "lakartxela.iutbayonne.univ-pau.fr";
    $usr = "adumolie_bd";
    $pw = "adumolie_bd";
    $bd = "adumolie_bd";

    $algo = new stdClass();
    $nodes = array();

    try {
        $conn = new PDO('mysql:host='.$serv.'dbname='.$bd,$usr,$pw);
        $res = $conn->query("SELECT * FROM SOMMET;");
        $res->setFetchMode(PDO::FETCH_OBJ);

        while ($tuple = $res->fetch()) {
            array_push($nodes,$tuple);
        }

        $algo->nodes = $nodes;
        return utf8_encode(json_encode($algo));
    } catch (Exception $e) {
        print 'Error : '.$e->getMessage().'<br>';
    }
}

echo getNodes();
?>