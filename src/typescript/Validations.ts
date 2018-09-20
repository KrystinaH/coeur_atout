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
    constructor(objetJSON: JSON, refBarreEtapes){
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
    private validerJeSuis(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        let blnChecked: boolean = false;
        for(let intCpt = 0; intCpt < this.refarrJeSuis.length && !blnChecked; intCpt++){
            if(this.refarrJeSuis[intCpt].checked){
                blnChecked = true;
            }
        }

        if(!blnChecked){
            this.afficherErreur(element, 'vide');
            this.arrEtapes.etape1[0] = false;
            this.verifierEtapeCompletee(0);
        } else{
            this.afficherSucces(element);
            this.arrEtapes.etape1[0] = true;
            this.verifierEtapeCompletee(0);
        }
    }

    private validerJeCherche(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;

        let blnChecked: boolean = false;
        for(let intCpt = 0; intCpt < this.refarrJeCherche.length && !blnChecked; intCpt++){
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

    private validerJour(evenement):void{
        const element = evenement.currentTarget;

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

    private validerAnnee(evenement):void{
        const element = evenement.currentTarget;

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

    private validerDateEntree():boolean{
        let blnEntreeValide = true;
        if(!this.validerDateNaissance(this.formerDate(this.refJourNaissance.value, this.refMoisNaissance.value,
            this.refAnneeNaissance.value))){
            blnEntreeValide = false;
        }

        return blnEntreeValide;
    }

    private validerCodePostal(evenement):void{
        const element = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                this.afficherSucces(element);
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerPseudo(evenement):void{
        const element = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                this.afficherSucces(element);
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerCourriel(evenement):void{
        const element = evenement.currentTarget;

        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                this.afficherSucces(element);
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerMotDePasse(evenement):void{
        const element = evenement.currentTarget;
        const pErreur = element.closest('.ctnForm').querySelector('.erreur');

        if(element.value != ""){
            this.effacerErreur(element, 'vide');
            if(!this.validerPattern(element)){
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
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerConsentement():void{
        if(!this.refConsentement.checked){
            this.afficherErreur(this.refConsentement, 'vide');
        } else{
            this.afficherSucces(this.refConsentement);
        }
    }


    // Méthodes utilitaires
    private validerPattern(element:HTMLInputElement, motif = element.pattern):boolean {
        const regexp = new RegExp(motif);
        return regexp.test(element.value);
    }

    private afficherErreur(element:HTMLInputElement, typeErreur:string):void{
        this.effacerSucces(element);

        const pErreur = element.closest('.ctnForm').querySelector('.erreur');

        if(element.name == 'mdp'){
            element.classList.add('elemErreur');
            if(pErreur.innerHTML.indexOf(this.objMessages[element.name]['erreurs'][typeErreur]) == -1){
                pErreur.innerHTML += '<p id="' + typeErreur + '"><svg><use xlink:href="#icon-erreur"/></svg>'
                    + this.objMessages[element.name]['erreurs'][typeErreur]+'</p>';
            }
        } else{
            if(pErreur.innerHTML == ''){
                element.classList.add('elemErreur');
                pErreur.innerHTML = '<svg><use xlink:href="#icon-erreur"/></svg>'
                    + this.objMessages[element.name]['erreurs'][typeErreur];
            }
        }
    }

    private afficherErreurDateComplete():void{
        const pDateNonValide: HTMLInputElement = document.querySelector('.dateNonValide');

        if(this.validerDateEntree()){
            this.afficherSucces(pDateNonValide);

            pDateNonValide.closest('.ctnForm').classList.remove('elemErreur');
            pDateNonValide.innerHTML = '';
        } else{
            this.effacerSucces(pDateNonValide);

            pDateNonValide.closest('.ctnForm').classList.add('elemErreur');
            pDateNonValide.innerHTML = '<svg><use xlink:href="#icon-erreur"/></svg>'
                + this.objMessages[this.refAnneeNaissance.name]['erreurs']['age'];
        }
    }

    private afficherSucces(element:HTMLInputElement):void{
        this.effacerErreur(element);

        const spanBon = element.closest('.ctnForm').querySelector('.icone_bon');

        if(spanBon.innerHTML == ''){
            spanBon.innerHTML = '<svg><use xlink:href="#icon-bon"/></svg>';
        }
    }

    private effacerSucces(element:HTMLInputElement):void{
        const spanBon = element.closest('.ctnForm').querySelector('.icone_bon');

        if(spanBon != null){
            if(spanBon.innerHTML != ''){
                spanBon.innerHTML = '';
            }
        }
    }

    private effacerErreur(element, typeErreur = ''):void{
        element.classList.remove('elemErreur');

        const pErreur = element.closest('.ctnForm').querySelector('.erreur');

        if(element.name == 'mdp') {
            if(document.getElementById(typeErreur) != null){
                const pMsgCible = document.getElementById(typeErreur);
                pErreur.removeChild(pMsgCible);
            }
        } else{
            pErreur.innerHTML = '';
        }
    }

    private formerDate(refJour, refMois, refAnnee){
        const jour = refJour;
        const mois = refMois;
        const annee = refAnnee;

        return `${annee}-${mois}-${jour}`;
    }

    private validerDateNaissance(dateNaissance):boolean{
        const dateAnniversaire = new Date(dateNaissance);
        return this.dateNaissanceValide.getTime() >= dateAnniversaire.getTime();
    }

    private formaterDateMax(date) {
        const dateButoir = new Date(date);
        console.log(`Nous sommes le : ${dateButoir}`);

        dateButoir.setFullYear(dateButoir.getFullYear() - 18);
        console.log(`L'année de naissance maximum est: ${dateButoir.getFullYear()}`);

        let mois = '' + (dateButoir.getMonth() + 1),
            jour = '' + dateButoir.getDate(),
            annee = dateButoir.getFullYear();
        if (mois.length < 2) mois = '0' + mois;
        if (jour.length < 2) jour = '0' + jour;

        console.log(`La date complète maximum est: ${[annee, mois, jour].join('-')}`);
        return new Date([annee, mois, jour].join('-'));
    }

    private basculerTypeMdp():void{
        if(this.refMotDePasse.type == 'password'){
            this.refMotDePasse.type = 'text';
        } else{
            this.refMotDePasse.type = 'password';
        }
    }

    private verifierEtapeCompletee(intNumEtape:number):void{
        const intEtapeCible = 'etape'+intNumEtape;
        const arrEtapeCible = this.arrEtapes[intEtapeCible];
        console.log(arrEtapeCible);

        if(arrEtapeCible.every(elem => elem == true)){
            this.refbarreEtapes.activerBoutonSuivant(intNumEtape);
        } else{
            this.refbarreEtapes.desactiverBoutonSuivant(intNumEtape);
        }
    }
}
