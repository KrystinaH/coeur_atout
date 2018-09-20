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
                 <li class="stepsBar__title" id="step1title"> <span>1.</span> Qui? </li>
                 <li class="stepsBar__title" id="step2title"> <span>2.</span> Mon profil </li>
                 <li class="stepsBar__title" id="step3title"> <span>3.</span> Mon compte </li>
            </ol>`;

        this.formulaire.insertBefore(this.stepsBar, this.arrSteps[0]);
        this.arrStepsBarTitle = Array.apply(null, document.querySelectorAll('.stepsBar__title'));
        this.afficherEtapeCourante(this.etapeEnCours);
    }

    // private nettoyerEtapePrecedente(){
    //     if(this.boutonSuivant){
    //         this.boutonSuivant.removeEventListener(// ...);
    //             this.arrSteps[this.etapeEnCours].removeChild(this.boutonSuivant);
    //     }
    // }

    private afficherEtapeCourante(numero:number){
        this.arrSteps.forEach(etape => etape.className = "formMultiSteps__step formMultiSteps__step--is-invisible");
        this.arrSteps[numero].className = "formMultiSteps__step formMultiSteps__step--is-visible";
        this.arrStepsBarTitle[numero].setAttribute('aria-current', 'step');

        if(this.etapeEnCours != this.arrSteps.length-1){
            this.afficherBoutonSuivant();
        }
    }

    private afficherBoutonSuivant(){
        this.boutonSuivant = document.createElement('button');
        this.boutonSuivant.setAttribute('disabled', 'true');
        this.boutonSuivant.innerHTML = 'Continuer';
        this.arrSteps[this.etapeEnCours].appendChild(this.boutonSuivant);
    }

    private changerEtape(evenement){

    }

    public activerBoutonSuivant(numeroEtapeFinie:number){
        this.boutonSuivant.removeAttribute('disabled');
    }

    public desactiverBoutonSuivant(numeroEtapeNonFinie:number){
        this.boutonSuivant.setAttribute('disabled', 'true');
    }
}