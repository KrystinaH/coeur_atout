<?php $strNiveau = './'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>

  <meta charset="utf-8"/>
  <title>Inscription | Coeur Atout - Jouer la carte romantique</title>
  <meta name="viewport" content="width=device-width"/>
  <link href="https://fonts.googleapis.com/css?family=Nixie+One|Roboto:300,400,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="assets/css/styles.css"/>

</head>
<body>

  <header>
    <div class="conteneur">
      <p class="visuallyhidden">Coeur Atout</p>
      <p class="visuallyhidden">Jouer la carte romantique</p>
        <a href="index.php"><img class="logo" src="assets/images/logo.svg" alt="Coeur Atout, Jouer la carte romantique"></a>
    </div>
  </header>

  <main class="conteneur">
    <h1>Inscription</h1>

    <form action="confirmation.html" class="formMultiSteps">
      <section aria-labelledby="step1title" id="step1" tabindex="-1" class="formMultiSteps__step">
        <h2>Qui?</h2>
        <fieldset class="ctnForm">
          <legend>Je suis <span class="icone_bon"></span></legend>
          <ul>
            <li>
              <input class="screen-reader-only" type="radio" id="suis_femme" name="jeSuis" required aria-required="true">
              <label for="suis_femme">
                <svg><use xlink:href="#icon-femme"/></svg><span class="visuallyhidden">Une femme</span>
              </label>
            </li>
            <li>
              <input class="screen-reader-only" type="radio" id="suis_homme" name="jeSuis">
              <label for="suis_homme">
                <svg><use xlink:href="#icon-homme"/></svg><span class="visuallyhidden">Un homme</span>
              </label>
            </li>
            <li>
              <input class="screen-reader-only" type="radio" id="suis_autre" name="jeSuis">
              <label for="suis_autre">
                <svg><use xlink:href="#icon-autre"/></svg><span class="visuallyhidden">Une autre identité de genre</span>
              </label>
            </li>
          </ul>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </fieldset>
        <fieldset class="ctnForm">
          <legend>Je cherche <span class="icone_bon"></span></legend>
          <ul>
            <li>
              <input class="jeCherche visuallyhidden" type="checkbox" id="cherche_femme" name="femme"
                     required aria-required="true">
              <label for="cherche_femme">
                <svg><use xlink:href="#icon-femme"/></svg><span class="visuallyhidden">Une femme</span>
              </label>
            </li>
            <li>
              <input class="jeCherche visuallyhidden" type="checkbox" id="cherche_homme" name="homme">
              <label for="cherche_homme">
                <svg><use xlink:href="#icon-homme"/></svg><span class="visuallyhidden">Un homme</span>
              </label>
            </li>
            <li>
              <input class="jeCherche visuallyhidden" type="checkbox" id="cherche_autre" name="autre">
              <label for="cherche_autre">
                <svg><use xlink:href="#icon-autre"/></svg><span class="visuallyhidden">Une autre identité de genre</span>
              </label>
            </li>
          </ul>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </fieldset>
      </section>
      <section aria-labelledby="step2title" id="step2" tabindex="-1" class="formMultiSteps__step">
        <h2>Mon profil</h2>
        <fieldset class="ctnForm">
          <legend class="dateValide">Ma date de naissance (JJ-MM-AAAA) <span class="icone_bon"></span></legend>
            <div class="ctnForm">
                <label class="visuallyhidden" for="jour">Jour</label>
                <input type="number" minlength="1" maxlength="2" pattern="^[0-9]{1,2}$" id="jour" name="jour" required
                       aria-required="true">
                <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
            </div>
            <div class="ctnForm">
                <label class="visuallyhidden" for="mois">Mois</label>
                <select name="mois" id="mois" required aria-required="true">
                    <option value="0">Mois</option>
                    <option value="1">Janvier</option>
                    <option value="2">Février</option>
                    <option value="3">Mars</option>
                    <option value="4">Avril</option>
                    <option value="5">Mai</option>
                    <option value="6">Juin</option>
                    <option value="7">Juillet</option>
                    <option value="8">Août</option>
                    <option value="9">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                </select>
                <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
            </div>
          <div class="ctnForm">
              <label class="visuallyhidden" for="annee">Année</label>
              <input type="number" minlength="4" maxlength="4" pattern="^[0-9]{4}$" id="annee" name="annee"
                     required aria-required="true">
              <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
          </div>
          <p class="info">Vous devez avoir 18 ans ou plus.</p>
          <p class="erreur dateNonValide" aria-live="assertive" aria-atomic="true"></p>
        </fieldset>
        <div class="ctnForm">
          <p>
            <label for="code_postal">Mon code postal (A0A 0A0) <span class="icone_bon"></span></label>
            <input type="text" minlength="6" maxlength="7"
                   pattern="^[a-zA-Z][0-9][a-zA-Z] ?[0-9][a-zA-Z][0-9]$" id="code_postal" name="code_postal"
                   required aria-required="true" aria-describedby="info_code_postal">
          </p>
          <p class="info" id="info_code_postal">Votre code postal ne sera pas dévoilé.</p>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </div>
      </section>
      <section aria-labelledby="step3title" id="step3" tabindex="-1" class="formMultiSteps__step">
        <h2>Mon compte</h2>
        <div class="ctnForm">
          <p>
            <label for="pseudo">Mon prénom ou pseudo <span class="icone_bon"></span></label>
            <input type="text" minlength="2" maxlength="30" pattern="^[a-zA-Z\- ]{2,30}$" id="pseudo" name="pseudo"
                   required aria-required="true" aria-describedby="info_pseudo">
          </p>
          <p class="info" id="info_pseudo">
            Utilisez des lettres, des traits d'unions ou des espaces pour composer votre nom d'usager.
          </p>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </div>
        <div class="ctnForm">
          <p>
            <label for="courriel">Mon courriel <span class="icone_bon"></span></label>
            <input type="email" minlength="6" maxlength="60"
                   pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" id="courriel"
                   name="courriel" required aria-required="true" aria-describedby="info_courriel">
          </p>
          <p class="info" id="info_courriel">Votre courriel ne sera pas dévoilé.</p>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </div>
        <div class="ctnForm">
          <p id="mdpContenu">
            <label for="mdp">Mon mot de passe <span class="icone_bon"></span></label>
            <input type="password" minlength="6" maxlength="10"
                   pattern="^(?=(.*[a-z]+))(?=(.*[A-Z]+))(?=(.*[0-9]+))[a-zA-Z0-9]{6,10}$" id="mdp" name="mdp"
                   required aria-required="true" aria-describedby="info_mdp">
            <span class="mdpContenu__oeil">
                <input class="visuallyhidden" type="checkbox" id="afficherMdp" name="afficher_mdp">
                <label for="afficherMdp">
                    <svg><use xlink:href="#icon-oeil"/></svg><span class="visuallyhidden">Afficher le mot de passe</span>
                </label>
            </span>
          </p>
          <p class="info" id="info_mdp">
            Entre 6 et 10 caractères, lettres minuscule et majuscule et chiffre obligatoire.
          </p>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </div>
        <div class="ctnForm">
          <p>
            <input type="checkbox" id="consentement" name="consentement" required aria-required="true">
            <label for="consentement">J'ai lu et j'accepte les <a href="">conditions d'utilisation</a> et la
              <a href="">politique de confidentialité</a> du réseau Cœur Atout. <span class="icone_bon"></span></label>
          </p>
          <p class="erreur" aria-live="assertive" aria-atomic="true"></p>
        </div>
      </section>
      <button type="submit" name="minscrire" class="formMultiSteps__btn">M'inscrire</button>
    </form>

  </main>

  <footer>
    <small>© 2018 Coeur Atout Inc. Tous droits réservés</small>
  </footer>

  <!-- Chargement de objMessages, l'objet json des messages d'erreurs -->
  <script src="<?php echo $strNiveau ;?>assets/js/objMessages.js"></script>

  <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
       xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-homme" viewBox="0 0 32 32">
        <title>homme</title>
        <path d="M29.32 3.549v0c0-0.491-0.393-0.884-0.87-0.884v0c-0.014 0-0.014 0-0.028 0h-5.135c-0.477 0-0.87
        0.393-0.87 0.87s0.393 0.87 0.87 0.87h3.044l-5.205 5.205c-2.020-1.712-4.573-2.665-7.267-2.665-2.988 0-5.794
        1.164-7.912 3.283-2.104 2.104-3.269 4.924-3.269 7.912s1.164 5.794 3.283 7.912c2.104 2.104 4.91 3.269 7.898
        3.269s5.794-1.164 7.912-3.283c2.118-2.118 3.283-4.924 3.283-7.912 0-2.694-0.94-5.247-2.68-7.267l5.205-5.205v3.044c0
        0.477 0.393 0.87 0.87 0.87v0c0.477 0 0.87-0.393 0.87-0.87v-5.149zM20.538 24.803c-1.782 1.782-4.153 2.764-6.664
        2.764s-4.882-0.982-6.664-2.764c-1.782-1.782-2.764-4.153-2.764-6.664s0.982-4.882 2.764-6.664c1.768-1.796 4.139-2.778
        6.65-2.778 2.525 0 4.882 0.982 6.664 2.764s2.764 4.153 2.764 6.664c0.014 2.525-0.968 4.896-2.75 6.678z"></path>
      </symbol>
      <symbol id="icon-autre" viewBox="0 0 32 32">
        <title>autre</title>
        <path d="M16.596 0.337v0c-0.337-0.337-0.87-0.337-1.192 0v0c0 0-0.014 0.014-0.014 0.014l-3.507 3.493c-0.337
        0.337-0.337 0.87 0 1.192 0.337 0.337 0.87 0.337 1.192 0l2.076-2.062v7.085c-2.553 0.196-4.938 1.291-6.776 3.128-2.034
        2.034-3.156 4.742-3.156 7.632 0 2.876 1.122 5.584 3.156 7.632 2.034 2.034 4.742 3.157 7.632 3.157 2.876 0 5.598-1.122
        7.632-3.157s3.157-4.742 3.157-7.632c0-2.876-1.122-5.584-3.157-7.632-1.838-1.838-4.223-2.932-6.79-3.128v-7.085l2.062
        2.076c0.337 0.337 0.87 0.337 1.192 0v0c0.337-0.337 0.337-0.87 0-1.192l-3.507-3.521zM25.098 20.819c0 2.427-0.94
        4.714-2.666 6.439-1.712 1.712-3.998 2.666-6.439 2.666-2.427 0-4.714-0.94-6.439-2.666-1.712-1.712-2.665-3.998-2.665-6.439
        0-2.427 0.94-4.714 2.665-6.439 1.712-1.712 3.998-2.665 6.439-2.665 2.427 0 4.714 0.94 6.439 2.665s2.666 4.012 2.666
        6.439z"></path>
        <path class="titeBarre" fill="none" stroke="#000" stroke-width="1.6835" stroke-miterlimit="10"
              stroke-linecap="round" stroke-linejoin="miter" d="M12.626 7.716h6.734"></path>
      </symbol>
      <symbol id="icon-bon" viewBox="0 0 32 32">
        <title>bon</title>
        <path class="coeur" d="M29.231 10.523c-0.431-4.615-3.692-7.938-7.754-7.938-2.708 0-5.231 1.477-6.585
        3.815-1.415-2.338-3.815-3.815-6.462-3.815-4.062 0-7.323 3.385-7.754 7.938-0.062 0.246-0.185 1.292 0.246 3.015
        0.615 2.523 1.969 4.8 3.938 6.646l9.969 9.046 10.154-9.046c2.031-1.785 3.385-4.123 3.938-6.646 0.431-1.723
        0.308-2.769 0.308-3.015zM27.877 13.292c-0.554 2.277-1.785 4.369-3.631 6.031l-9.415
        8.431-9.231-8.369c-1.846-1.662-3.077-3.754-3.631-6.031-0.369-1.662-0.246-2.585-0.246-2.585v-0.062c0.369-4.062
        3.2-7.015 6.708-7.015 2.585 0 4.862 1.6 5.908 4.123l0.492 1.231 0.492-1.231c1.046-2.523 3.446-4.123 6.092-4.123 3.508
        0 6.277 2.954 6.646 7.015 0.062 0 0.246 0.923-0.185 2.585z"></path>
        <path class="coeur" d="M9.415 5.969c-3.015 0-5.538 2.462-5.538 5.538 0 0.308 0.246 0.554 0.554 0.554s0.554-0.246
        0.554-0.554c0-2.4 1.969-4.431 4.431-4.431 0.308 0 0.554-0.246 0.554-0.554s-0.246-0.554-0.554-0.554z"></path>
        <path class="crochet" fill="none" stroke="#000" stroke-width="1.2308" stroke-miterlimit="10"
              stroke-linecap="round" stroke-linejoin="round" d="M8 16.431l4.308 4.677 18.954-14.462"></path>
      </symbol>
      <symbol id="icon-erreur" viewBox="0 0 32 32">
        <title>erreur</title>
        <path d="M31.938 9.969c-0.431-5.108-4.123-8.862-8.677-8.862-3.015 0-5.785 1.662-7.385
        4.246-1.538-2.646-4.185-4.246-7.138-4.246-4.554 0-8.246 3.754-8.677 8.862-0.062 0.246-0.185 1.415 0.246 3.385
        0.677 2.831 2.215 5.354 4.431 7.385l11.138 10.092 11.323-10.092c2.215-2.031 3.754-4.554 4.431-7.385 0.492-1.908
        0.369-3.138 0.308-3.385zM30.462 13.108c-0.615 2.585-2.031 4.923-4.062 6.769l-10.462
        9.354-10.338-9.415c-2.031-1.846-3.446-4.185-4.062-6.769-0.431-1.846-0.246-2.892-0.246-2.892v-0.062c0.369-4.492
        3.508-7.754 7.446-7.754 2.892 0 5.415 1.785 6.646 4.615l0.554 1.354 0.554-1.354c1.169-2.831 3.877-4.615
        6.831-4.615 3.938 0 7.015 3.262 7.446 7.815-0.062 0.062 0.123 1.108-0.308 2.954z"></path>
        <path fill="none" stroke="#000" stroke-width="1.2308" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round" style="stroke: var(--color1, #000)" d="M17.415 27.877l-4.492-4.369
              5.415-0.554-5.415-6.954 6.954-1.662-3.877-7.262"></path>
      </symbol>
      <symbol id="icon-femme" viewBox="0 0 32 32">
        <title>femme</title>
        <path d="M27.020 11.020c0-6.076-4.943-11.020-11.019-11.020s-11.020 4.943-11.020 11.020c0 5.719 4.38 10.432
        9.962 10.967v2.915h-3.923c-0.585 0-1.059 0.474-1.059 1.059s0.474 1.059 1.059 1.059h3.922v3.921c0 0.585 0.474
        1.059 1.059 1.059s1.059-0.474 1.059-1.059v-3.921h3.921c0.585 0 1.059-0.474
        1.059-1.059s-0.474-1.059-1.059-1.059h-3.921v-2.915c5.581-0.535 9.96-5.248 9.96-10.967zM7.098 11.020c0-4.909
        3.994-8.902 8.903-8.902s8.901 3.993 8.901 8.902c0 4.908-3.993 8.901-8.901 8.901s-8.903-3.993-8.903-8.901z"></path>
      </symbol>
      <symbol id="icon-oeil" viewBox="0 0 32 32">
        <title>oeil</title>
        <path d="M27.601 11.655c-6.427-6.426-16.882-6.426-23.309 0l-4.292 4.292 4.399 4.399c3.213 3.213 7.434 4.82
        11.655 4.82s8.441-1.607 11.655-4.82l4.292-4.292-4.399-4.398zM26.943 19.581c-6.005 6.004-15.775 6.004-21.78
        0l-3.635-3.635 3.528-3.528c6.005-6.004 15.775-6.004 21.78 0l3.635 3.635-3.528 3.528z"></path>
        <path d="M15.444 11.659c-2.086 0-3.784 1.697-3.784 3.784 0 0.298 0.242 0.541 0.541 0.541s0.541-0.242
        0.541-0.541c0-1.49 1.212-2.703 2.703-2.703 0.298 0 0.541-0.242 0.541-0.541s-0.242-0.541-0.541-0.541z"></path>
        <path d="M15.985 8.957c-3.875 0-7.027 3.152-7.027 7.027s3.152 7.027 7.027 7.027 7.027-3.152
        7.027-7.027-3.152-7.027-7.027-7.027zM15.985 21.93c-3.278 0-5.946-2.668-5.946-5.946s2.668-5.946 5.946-5.946
        5.946 2.668 5.946 5.946-2.667 5.946-5.946 5.946z"></path>
      </symbol>
    </defs>
  </svg>
  <!-- CDN v2018 -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"
          integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
          crossorigin="anonymous"></script>

  <!-- ALT au CDN: chargement local de la version installée avec Bower -->
  <script>window.jQuery || document.write('<script src="<?php echo $strNiveau ;?>bower_components/jquery/dist/jquery.min.js">\x3C/script>')</script>

  <script>var strNiveau = "<?php echo $strNiveau ;?>";</script>

  <!-- On importe toutes les classes de l'application et on instancie l'application dans app.js. -->
  <script src="<?php echo $strNiveau ;?>bower_components/requirejs/require.js" data-main="<?php echo $strNiveau ;?>assets/js/app.js"></script>
</body>
</html>