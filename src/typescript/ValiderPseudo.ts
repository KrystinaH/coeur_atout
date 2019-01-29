/**
 * Pour les tests:
 * les pseudo Kim et Jimmy existent dans la base de données
 */
export class ValiderPseudo{

    private strNiveau:string;
    private $pseudo:JQuery = $('#pseudo');

    constructor(niveau = './'){
        this.strNiveau = niveau;
        /*  il ne devrait pas y avoir d'écouteur d'événement blur
            car la methode verifierDisponibilite devrait être publique
            et appelé seulement lorsque les données du champ de saisie
            ont été validés selon les règles de composition d'un pseudo
         */
        this.$pseudo.on('blur', this.verifierDisponibilite.bind(this));
    }


    private verifierDisponibilite(evenement):void{
        console.log('Je vérifie... un petit moment svp');

        $.ajax({
            context: this,
            url : `${this.strNiveau}inc/scripts/ajax/getPseudo.php`,
            type : 'GET',
            // Concaténation du couple propriete=valeur qu'on doit envoyer au script php
            data : 'pseudo=' + this.$pseudo.val(),
            dataType : 'text'
        })
            .done(function(data, textStatus, jqXHR){
                this.retournerResultat(data, textStatus, jqXHR);
            })
            .fail(function(jqXHR, textStatus, error){
                 console.log(`Ici je peux afficher et gérer une ${error}`);
            })
            .always(function(dataOrJqXHR, textStatus, jQXHRorError){
                console.log('Ici je pourrais faire disparaitre un spinner');
            });
    }

    private retournerResultat(data, textStatus, jqXHR):void{
        switch (data){
            case '-1':
                console.log(`Hum, avez-vous entré un pseudo?`);
                break;
            case '0':
                console.log(`Le pseudo ${this.$pseudo.val()} est disponible!`);
                break;
            default:
                console.log(`Désolé... le pseudo ${data} existe déjà! Avez vous oublié votre mot de passe?`);
                break;
        }
    }

}