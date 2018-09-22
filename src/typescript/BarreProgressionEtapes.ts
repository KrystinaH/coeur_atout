import {Validations} from './Validations';

export class BarreProgressionEtapes {
    private formulaire: HTMLFormElement = document.querySelector('.formMultiSteps');
    private stepsBar: HTMLElement;
    private arrStepsBarTitle: Array<HTMLElement>;
    private arrSteps: Array<HTMLElement> = Array.apply(null, document.querySelectorAll('.formMultiSteps__step'));
    private etapeEnCours: number = 0;
    private boutonSubmit: HTMLButtonElement = document.querySelector('.formMultiSteps__btn[type=submit]');
    private boutonSuivant: HTMLButtonElement;

    public constructor(){
        this.stepsBar = document.createElement('div');
        this.stepsBar.setAttribute('aria-label', 'Formulaire en plusieurs étapes');
        this.stepsBar.innerHTML =
            `<ol class="stepsBar">
                 <li class="stepsBar__title" id="step1title">Qui?</li>
                 <li class="stepsBar__title" id="step2title">Mon profil</li>
                 <li class="stepsBar__title" id="step3title">Mon compte</li>
            </ol>`;

        this.formulaire.insertBefore(this.stepsBar, this.arrSteps[0]);
        this.arrStepsBarTitle = Array.apply(null, document.querySelectorAll('.stepsBar__title'));
        this.afficherEtapeCourante(this.etapeEnCours);
    }

    /**
     * Retire le bouton de l'étape précédente
     */
    private nettoyerEtapePrecedente(){
        if(this.boutonSuivant){
            this.boutonSuivant.removeEventListener('click', this.changerEtape.bind(this));
                this.arrSteps[this.etapeEnCours].removeChild(this.boutonSuivant);
        }

        this.arrStepsBarTitle[this.etapeEnCours].removeAttribute('aria-current');
        this.arrStepsBarTitle[this.etapeEnCours].classList.add('stepCompleted');
    }

    /**
     * Affiche l'étape au numéro précisée
     * @param numero
     */
    private afficherEtapeCourante(numero:number){
        this.arrSteps.forEach(etape => etape.className = "formMultiSteps__step formMultiSteps__step--is-invisible");
        this.arrSteps[numero].className = "formMultiSteps__step formMultiSteps__step--is-visible";
        this.arrStepsBarTitle[numero].setAttribute('aria-current', 'step');

        if(this.etapeEnCours != this.arrSteps.length-1){
            this.afficherBoutonSuivant();
        } else{
            this.boutonSubmit.classList.add('OK');
            this.boutonSubmit.setAttribute('disabled', 'true');
        }
    }

    /**
     * Affiche le bouton adapté à l'étape couurante
     */
    private afficherBoutonSuivant(){
        this.boutonSuivant = document.createElement('button');
        this.boutonSuivant.setAttribute('disabled', 'true');
        this.boutonSuivant.setAttribute('type', 'button');
        this.boutonSuivant.addEventListener('click', this.changerEtape.bind(this));
        this.boutonSuivant.innerHTML = 'Continuer';
        this.arrSteps[this.etapeEnCours].appendChild(this.boutonSuivant);
    }

    /**
     * Change l'étape du formulaire
     * @param evenement
     */
    private changerEtape(evenement){
        this.nettoyerEtapePrecedente();
        this.etapeEnCours++;
        this.afficherEtapeCourante(this.etapeEnCours);
    }

    /**
     * Enlève l'attribut disabled au bouton suivant
     */
    public activerBoutonSuivant(){
        this.boutonSuivant.removeAttribute('disabled');
    }

    /**
     * Ajoute l'attribut disabled au bouton suivant
     */
    public desactiverBoutonSuivant(){
        this.boutonSuivant.setAttribute('disabled', 'true');
    }

    /**
     * Enlève l'attribut disabled au bouton submit
     */
    public activerBoutonSubmit(){
        this.boutonSubmit.removeAttribute('disabled');
    }

    /**
     * Ajoute l'attribut disabled au bouton submit
     */
    public desactiverBoutonSubmit(){
        this.boutonSubmit.setAttribute('disabled', 'true');
    }
}