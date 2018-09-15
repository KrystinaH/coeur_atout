/**
 *
 */
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
    private refConsentement: HTMLInputElement = document.querySelector('#consentement')

    // Constructeur
    constructor(objetJSON: JSON){
        this.objMessages = objetJSON;
        document.querySelector('form').noValidate = true;

        this.refarrJeSuis.forEach(btnRadio => btnRadio.addEventListener('blur', this.validerJeSuis.bind(this)));
        this.refarrJeCherche[this.refarrJeCherche.length - 1].addEventListener('blur', this.validerJeCherche.bind(this));
        this.refarrJeCherche.forEach(btnCheckbox => btnCheckbox.addEventListener('click', this.validerJeCherche.bind(this)));
        this.refJourNaissance.addEventListener('blur', this.validerJour.bind(this));
        this.refMoisNaissance.addEventListener('blur', this.validerMois.bind(this));
        this.refAnneeNaissance.addEventListener('blur', this.validerAnnee.bind(this));
        this.refCodePostal.addEventListener('blur', this.validerCodePostal.bind(this));
        this.refPseudo.addEventListener('blur', this.validerPseudo.bind(this));
        this.refCourriel.addEventListener('blur', this.validerCourriel.bind(this));
        this.refMotDePasse.addEventListener('blur', this.validerMotDePasse.bind(this));
        this.refAfficherMdp.addEventListener('click', this.basculerTypeMdp.bind(this));
        this.refConsentement.addEventListener('blur', this.validerConsentement.bind(this));
    }

    // Méthodes de validation
    private validerJeSuis(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;
        this.effacerErreur(element);
        let blnChecked: boolean = false;
        for(let intCpt = 0; intCpt < this.refarrJeSuis.length && !blnChecked; intCpt++){
            if(this.refarrJeSuis[intCpt].checked){
                blnChecked = true;
            }
        }

        if(!blnChecked){
            this.afficherErreur(element, 'vide');
        } else{
            console.log('Valide!');
        }
    }

    private validerJeCherche(evenement):void{
        const element: HTMLInputElement = evenement.currentTarget;
        element.closest('.ctnForm').querySelector('.erreur').innerHTML = '';
        let blnChecked: boolean = false;
        for(let intCpt = 0; intCpt < this.refarrJeCherche.length && !blnChecked; intCpt++){
            if(this.refarrJeCherche[intCpt].checked){
                blnChecked = true;
            }
        }

        if(!blnChecked){
            element.closest('.ctnForm').querySelector('.erreur').innerHTML = this.objMessages['jeCherche']['erreurs']['vide'];
        } else{
            console.log('Valide!');
        }
    }

    private validerJour(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        document.querySelector('.dateNonValide').innerHTML = '';
        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                if(this.validerDateEntree()){
                    console.log('Valide!');
                } else{
                    document.querySelector('.dateNonValide')
                        .innerHTML = this.objMessages[this.refAnneeNaissance.name]['erreurs']['age'];
                }
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerMois(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        document.querySelector('.dateNonValide').innerHTML = '';
        if(element.value == 0){
            this.afficherErreur(element, 'vide');
        } else{
            if(this.validerDateEntree()){
                console.log('Valide!');
            } else{
                document.querySelector('.dateNonValide')
                    .innerHTML = this.objMessages[this.refAnneeNaissance.name]['erreurs']['age'];
            }
        }
    }

    private validerAnnee(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        document.querySelector('.dateNonValide').innerHTML = '';
        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                if(this.validerDateEntree()){
                    console.log('Valide!');
                } else{
                    document.querySelector('.dateNonValide')
                        .innerHTML = this.objMessages[this.refAnneeNaissance.name]['erreurs']['age'];
                }
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerDateEntree():boolean{
        let blnEntreeValide = true;
        if(this.refJourNaissance.value != '' && this.refMoisNaissance.value != '0' && this.refAnneeNaissance.value != ''){
            if(!this.validerDateNaissance(this.formerDate(this.refJourNaissance.value, this.refMoisNaissance.value, this.refAnneeNaissance.value))){
                blnEntreeValide = false;
            }
        }

        return blnEntreeValide;
    }

    private validerCodePostal(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                console.log('Valide!');
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerPseudo(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                console.log('Valide!');
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerCourriel(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                console.log('Valide!');
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerMotDePasse(evenement):void{
        const element = evenement.currentTarget;
        this.effacerErreur(element);
        if(element.value != ""){
            if(!this.validerPattern(element)){
                this.afficherErreur(element, 'motif');
            } else{
                console.log('Valide!');
            }
        } else{
            this.afficherErreur(element, 'vide');
        }
    }

    private validerConsentement():void{
        if(!this.refConsentement.checked){
            this.afficherErreur(this.refConsentement, 'vide');
        } else{
            console.log('Valide!');
        }
    }


    // Méthodes utilitaires
    private validerPattern(element:HTMLInputElement, motif = element.pattern):boolean {
        const regexp = new RegExp(motif);
        return regexp.test(element.value);
    }

    private afficherErreur(element:HTMLInputElement, typeErreur:string):void{
        element.closest('.ctnForm')
            .querySelector('.erreur')
            .innerHTML = this.objMessages[element.name]['erreurs'][typeErreur];
    }

    private effacerErreur(element):void{
        element.closest('.ctnForm')
            .querySelector('.erreur')
            .innerHTML = '';
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
}
