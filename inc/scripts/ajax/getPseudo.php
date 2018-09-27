<?php

// Inclusions du fichier de configuration
require_once('../config.inc.php');

// initialiser la réponse
$reponse = -1;


if((isset($_GET['pseudo']) ==  true) && ($_GET['pseudo'] !== '')){

    $strRequetePseudo = "SELECT pseudo FROM t_ami WHERE pseudo = '" . $_GET['pseudo'] . "'";

    $resultatPseudo = $objPdoConnexion->query($strRequetePseudo);
    $resultatPseudo->execute();
    $intNbreTotalItems = $resultatPseudo->rowCount();
    $arrPseudo = $resultatPseudo->fetch();


    if ($intNbreTotalItems > 0){
        $reponse = $arrPseudo['pseudo'];
    }
    else{
        $reponse = $intNbreTotalItems;
    }

    $resultatPseudo->closeCursor();

}

echo $reponse;