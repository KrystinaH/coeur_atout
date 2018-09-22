/**
 *
 */
import {BarreProgressionEtapes} from "./BarreProgressionEtapes";

export class Validations {

    // ATTRIBUTS
    private objMessages: JSON;

    // -- Éléments de formulaire à valider
    // Étape 1
    private refarrJeSuis: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=jeSuis]'));
    private refarrJeCherche: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('.jeCherche'));
    private refJourNaissance: HTMLInputElement = document.querySelector('#jour');
    private refMoisNaissance: HTMLInputElement = document.querySelector('#mois');
    private refAnneeNaissance: HTMLInputElement = document.querySelector('#annee');
    private dateNaissanceValide = this.formaterDateMax(new Date());
    private refCodePostal: HTMLElement = document.querySelector('#code_postal');
    private refPseudo: HTMLElement = document.querySelector('#pseudo');
    private refCourriel: HTMLElement = document.querySelector('#courriel');
    private refMotDePasse: HTMLInputElement = document.querySelector('#mdp');
    private refAfficherMdp: HTMLInputElement = document.querySelector('#afficherMdp');
    private refConsentement: HTMLInputElement = document.querySelector('#consentement');
    private refbarreEtapes: BarreProgressionEtapes;
    private arrEtapes:any = {
        etape1: [false, false],
        etape2: [false, false],
        etape3: [false, false, false, false],
    };

    // Constructeur
    constructor(objetJSON: JSON, refBarreEtapes: BarreProgressionEtapes){
        this.objMessages = objetJSON;
        document.querySelector('form').noValidate = true;
        this.refbarreEtapes = refBarreEtapes;

        //Écouteurs d'évènements
        this.refarrJeSuis.forEach(btnRadio => btnRadio.addEventListener('blur', this.validerJeSuis.bind(this)));
        this.refarrJeSuis.forEach(btnRadio => btnRadio.addEventListener('click', this.validerJeSuis.bind(this)));
        this.refarrJeCherche[this.refarrJeCherche.length - 1].addEventListener('blur', this.validerJeCherche.bind(this));
        this.refarrJeCherche.forEach(btnCheckbox => btnCheckbox.addEventListener('click', this.validerJeCherche.bind(this)));
        this.refJourNaissance.addEventListener('blur', this.validerJour.bind(this));
        this.refMoisNaissance.addEventListener('change', this.validerMois.bind(this));
        this.refAnneeNaissance.addEventListener('blur', this.validerAnnee.bind(this));
        this.refCodePostal.addEventListener('blur', this.validerCodePostal.bind(this));
        this.refPseudo.addEventListener('blur', this.validerPseudo.bind(this));
        this.refCourriel.addEventListener('blur', this.validerCourriel.bind(this));
        this.refMotDePasse.addEventListener('blur', this.validerMotDePasse.bind(this));
        this.refAfficherMdp.addEventListener('click', this.basculerTypeMdp.bind(this));
        this.refConsentement.addEventListener('blur', this.validerConsentement.bind(this));
        this.refConsentement.addEventListener('click', this.validerConsentement.bind(this));
    }

    // Méthodes de validation
    /**
     * Valide si l'un des boutons radio du fieldset est coché et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerJeSuis(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        let blnChecked: boolean = false;
        for(let intCpt:number = 0; intCpt < this.refarrJeSuis.length && !blnChecked; intCpt++){
            if(this.refarrJeSuis[intCpt].checked){
                blnChecked = true;
            }
        }

        if(!blnChecked){
            this.afficherErreur(element, 'vide');
            this.arrEtapes.etape1[0] = false;
            this.verifierEtapeCompletee(1);
        } else{
            this.afficherSucces(element);
            this.arrEtapes.etape1[0] = true;
            this.verifierEtapeCompletee(1);
        }
    }

    /**
     * Valide si l'un des checkbox du fieldset est coché et affiche
     * ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerJeCherche(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        let blnChecked: boolean = false;
        for(let intCpt:number = 0; intCpt < this.refarrJeCherche.length && !blnChecked; intCpt++){
            if(this.refarrJeCherche[intCpt].checked){
                blnChecked = true;
            }
        }

        if(!blnChecked){
            this.effacerSucces(element);

            const pErreur = element.closest('.ctnForm').querySelector('.erreur');

            if(pErreur.innerHTML == ''){
                element.classList.add('elemErreur');
                pErreur.innerHTML = '<svg><use xlink:href="#icon-erreur"/></svg>'
                    + this.objMessages['jeCherche']['erreurs']['vide'];
            }
            this.arrEtapes.etape1[1] = false;
            this.verifierEtapeCompletee(1);
        } else{
            this.afficherSucces(element);
            this.arrEtapes.etape1[1] = true;
            this.verifierEtapeCompletee(1);
        }
    }

    /**
     * Valide si l'entrée dans l'input est présente et conforme au motif
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerJour(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.effacerSucces(document.querySelector('.dateNonValide'));
                this.afficherErreur(element, 'motif');
            } else{
                this.effacerErreur(element);
            }
            if (this.refJourNaissance.value != '' && this.refMoisNaissance.value != '0'
                && this.refAnneeNaissance.value != ''){
                this.afficherErreurDateComplete();
            }
        } else{
            this.effacerSucces(document.querySelector('.dateNonValide'));
            this.afficherErreur(element, 'vide');
        }
    }

    /**
     * Valide si une option a été choisie dans le select
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerMois(evenement):void{
        const element = evenement.currentTarget;

        if(element.value == 0){
            this.effacerSucces(document.querySelector('.dateNonValide'));
            this.afficherErreur(element, 'vide');
        } else {
            this.effacerErreur(element);
        }

        if (this.refJourNaissance.value != '' && this.refMoisNaissance.value != '0'
            && this.refAnneeNaissance.value != ''){
            this.afficherErreurDateComplete();
        }
    }

    /**
     * Valide si l'entrée dans l'input est présente et conforme au motif
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerAnnee(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.effacerSucces(document.querySelector('.dateNonValide'));
                this.afficherErreur(element, 'motif');
            } else{
                this.effacerErreur(element);
            }
            if (this.refJourNaissance.value != '' && this.refMoisNaissance.value != '0'
                && this.refAnneeNaissance.value != ''){
                this.afficherErreurDateComplete();
            }
        } else{
            this.effacerSucces(document.querySelector('.dateNonValide'));
            this.afficherErreur(element, 'vide');
        }
    }

    /**
     * Valide si la date formée par les champs jour, mois et année est valide ou non
     * @return {boolean} date valide ou non
     */
    private validerDateEntree():boolean{
        let blnEntreeValide:boolean = true;
        if(!this.validerDateNaissance(this.formerDate(this.refJourNaissance.value, this.refMoisNaissance.value,
            this.refAnneeNaissance.value))){
            blnEntreeValide = false;
        }

        return blnEntreeValide;
    }

    /**
     * Valide si l'entrée dans l'input est présente et conforme au motif
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerCodePostal(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
                this.arrEtapes.etape2[1] = false;
                this.verifierEtapeCompletee(2);
            } else{
                this.afficherSucces(element);
                this.arrEtapes.etape2[1] = true;
                this.verifierEtapeCompletee(2);
            }
        } else{
            this.afficherErreur(element, 'vide');
            this.arrEtapes.etape2[1] = false;
            this.verifierEtapeCompletee(2);
        }
    }

    /**
     * Valide si l'entrée dans l'input est présente et conforme au motif
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerPseudo(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
                this.arrEtapes.etape3[0] = false;
                this.verifierEtapeCompletee(3);
            } else{
                this.afficherSucces(element);
                this.arrEtapes.etape3[0] = true;
                this.verifierEtapeCompletee(3);
            }
        } else{
            this.afficherErreur(element, 'vide');
            this.arrEtapes.etape3[0] = false;
            this.verifierEtapeCompletee(3);
        }
    }

    /**
     * Valide si l'entrée dans l'input est présente et conforme au motif
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerCourriel(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
                this.arrEtapes.etape3[1] = false;
                this.verifierEtapeCompletee(3);
            } else{
                this.afficherSucces(element);
                this.arrEtapes.etape3[1] = true;
                this.verifierEtapeCompletee(3);
            }
        } else{
            this.afficherErreur(element, 'vide');
            this.arrEtapes.etape3[1] = false;
            this.verifierEtapeCompletee(3);
        }
    }

    /**
     * Valide si l'entrée dans l'input est présente et conforme aux différents motifs
     * et affiche ou efface un message d'erreur ou de succès
     * @param evenement
     */
    private validerMotDePasse(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;
        const pErreur: HTMLElement = element.closest('.ctnForm').querySelector('.erreur');

        if(element.value != ""){
            this.effacerErreur(element, 'vide');
            if(!this.validerPattern(element)){
                this.arrEtapes.etape3[2] = false;
                this.verifierEtapeCompletee(3);
                if(!this.validerPattern(element, '^.{6,10}$')){
                    this.afficherErreur(element, 'size');
                } else{
                    this.effacerErreur(element, 'size');
                }
                if(!this.validerPattern(element, '[a-z]+')){
                    this.afficherErreur(element, 'minus');
                } else{
                    this.effacerErreur(element, 'minus');
                }
                if(!this.validerPattern(element, '[A-Z]+')){
                    this.afficherErreur(element, 'majus');
                } else{
                    this.effacerErreur(element, 'majus');
                }
                if(!this.validerPattern(element, '[0-9]+')){
                    this.afficherErreur(element, 'num');
                } else{
                    this.effacerErreur(element, 'num');
                }
            } else{
                this.afficherSucces(element);
                element.closest('.ctnForm').querySelector('.erreur').innerHTML = '';
                this.arrEtapes.etape3[2] = true;
                this.verifierEtapeCompletee(3);
            }
        } else{
            this.afficherErreur(element, 'vide');
            this.arrEtapes.etape3[2] = false;
            this.verifierEtapeCompletee(3);
        }
    }

    /**
     * Valide si le checkbox est coché et affiche
     * ou efface un message d'erreur ou de succès
     */
    private validerConsentement():void{
        if(!this.refConsentement.checked){
            this.afficherErreur(this.refConsentement, 'vide');
            this.arrEtapes.etape3[3] = false;
            this.verifierEtapeCompletee(3);
        } else{
            this.afficherSucces(this.refConsentement);
            this.arrEtapes.etape3[3] = true;
            this.verifierEtapeCompletee(3);
        }
    }


    // Méthodes utilitaires
    /**
     * Retourne vrai si l'élément correspond au motif
     * @param element
     * @param motif
     * @return {boolean} patron valide ou non
     */
    private validerPattern(element:HTMLInputElement, motif:string = element.pattern):boolean {
        const regexp: RegExp = new RegExp(motif);
        return regexp.test(element.value);
    }

    /**
     * Affiche un message d'erreur adapté à l'élément et au type d'erreur
     * @param element
     * @param typeErreur
     */
    private afficherErreur(element:HTMLInputElement, typeErreur:string):void{
        this.effacerSucces(element);
        this.effacerErreur(element);

        const pErreur: HTMLElement = element.closest('.ctnForm').querySelector('.erreur');

        if(element.name == 'mdp'){
            element.classList.add('elemErreur');
            if(pErreur.innerHTML.indexOf(this.objMessages[element.name]['erreurs'][typeErreur]) == -1){
                pErreur.innerHTML += '<p id="' + typeErreur + '"><svg><use xlink:href="#icon-erreur"/></svg>'
                    + this.objMessages[element.name]['erreurs'][typeErreur]+'</p>';
            }
        } else{
            if(pErreur.innerHTML == ''){
                element.classList.add('elemErreur');
                pErreur.innerHTML = '<span class="erreur__contenu"><svg><use xlink:href="#icon-erreur"/></svg>'
                    + this.objMessages[element.name]['erreurs'][typeErreur] + '</span>';
            }
        }
    }

    /**
     * Affiche une erreur ou un succès selon les entrées des champs
     * de jour, de mois et d'année
     */
    private afficherErreurDateComplete():void{
        const pDateNonValide: HTMLInputElement = document.querySelector('.dateNonValide');

        if(this.validerDateEntree()){
            this.afficherSucces(pDateNonValide);

            pDateNonValide.closest('.ctnForm').classList.remove('elemErreur');
            pDateNonValide.innerHTML = '';
            this.arrEtapes.etape2[0] = true;
            this.verifierEtapeCompletee(2);
        } else{
            this.effacerSucces(pDateNonValide);

            pDateNonValide.closest('.ctnForm').classList.add('elemErreur');
            pDateNonValide.innerHTML = '<svg><use xlink:href="#icon-erreur"/></svg>'
                + this.objMessages[this.refAnneeNaissance.name]['erreurs']['age'];
            this.arrEtapes.etape2[0] = false;
            this.verifierEtapeCompletee(2);
        }
    }

    /**
     * Efface le message d'erreur et affiche celui de succès de l'élément
     * @param element
     */
    private afficherSucces(element:HTMLInputElement):void{
        this.effacerErreur(element);

        const spanBon: HTMLElement = element.closest('.ctnForm').querySelector('.icone_bon');

        if(spanBon.innerHTML == ''){
            spanBon.innerHTML = '<svg><use xlink:href="#icon-bon"/></svg>';
        }
    }

    /**
     * Efface le message de succès de l'élément
     * @param element
     */
    private effacerSucces(element:HTMLInputElement):void{
        const spanBon: HTMLElement = element.closest('.ctnForm').querySelector('.icone_bon');

        if(spanBon != null){
            if(spanBon.innerHTML != ''){
                spanBon.innerHTML = '';
            }
        }
    }

    /**
     * Efface le message d'erreur de l'élément selon le type d'erreur si spécifié
     * @param element
     * @param typeErreur
     */
    private effacerErreur(element, typeErreur: string = ''):void{
        element.classList.remove('elemErreur');

        const pErreur: HTMLElement = element.closest('.ctnForm').querySelector('.erreur');

        if(element.name == 'mdp') {
            if(document.getElementById(typeErreur) != null){
                const pMsgCible = document.getElementById(typeErreur);
                pErreur.removeChild(pMsgCible);
            }
        } else{
            pErreur.innerHTML = '';
        }
    }

    /**
     * Forme une date avec le jour, le mois et l'année spécifiés
     * @param refJour
     * @param refMois
     * @param refAnnee
     */
    private formerDate(refJour:string, refMois:string, refAnnee:string){
        const jour:string = refJour;
        const mois:string = refMois;
        const annee:string = refAnnee;

        return `${annee}-${mois}-${jour}`;
    }

    /**
     * Valide si la date de naissance spécifiée est égale
     * ou inférieure à la date maximum (18 ans ou plus)
     * @param dateNaissance
     * @return date avant la date maximum ou non
     */
    private validerDateNaissance(dateNaissance:string):boolean{
        const dateAnniversaire:Date = new Date(dateNaissance);
        return this.dateNaissanceValide.getTime() >= dateAnniversaire.getTime();
    }

    /**
     * Retourne la date maximum pour être majeur aujourd'hui
     * @param date
     * @return date maximum
     */
    private formaterDateMax(date):Date{
        const dateButoir:Date = new Date(date);
        console.log(`Nous sommes le : ${dateButoir}`);

        dateButoir.setFullYear(dateButoir.getFullYear() - 18);
        console.log(`L'année de naissance maximum est: ${dateButoir.getFullYear()}`);

        let mois:string = '' + (dateButoir.getMonth() + 1),
            jour:string = '' + dateButoir.getDate(),
            annee:number = dateButoir.getFullYear();
        if (mois.length < 2) mois = '0' + mois;
        if (jour.length < 2) jour = '0' + jour;

        console.log(`La date complète maximum est: ${[annee, mois, jour].join('-')}`);
        return new Date([annee, mois, jour].join('-'));
    }

    /**
     * Fais basculer le type de l'input du mot de passe
     * de password à text et inversement
     */
    private basculerTypeMdp():void{
        if(this.refMotDePasse.type == 'password'){
            this.refMotDePasse.type = 'text';
        } else{
            this.refMotDePasse.type = 'password';
        }
    }

    /**
     * Valide si une étape du formulaire est complétée selon celle qui est spécifiée
     * et détermine quelle fonction de la barre de progression appeler
     * @param intNumEtape
     */
    private verifierEtapeCompletee(intNumEtape:number):void{
        const intEtapeCible:string = 'etape'+intNumEtape;
        const arrEtapeCible:Array<boolean> = this.arrEtapes[intEtapeCible];

        if(intNumEtape != 3){
            if(arrEtapeCible.every(elem => elem == true)){
                this.refbarreEtapes.activerBoutonSuivant();
            } else{
                this.refbarreEtapes.desactiverBoutonSuivant();
            }
        } else{
            if(arrEtapeCible.every(elem => elem == true)){
                this.refbarreEtapes.activerBoutonSubmit();
            } else{
                this.refbarreEtapes.desactiverBoutonSubmit();
            }
        }
    }
}
