<h1 align="center">Previously On</h1>
<img src="images/accueil.png" alt="accueil">
<h2>Présentation du projet</h2>
<p>Vous ne savez plus où vous en êtes entre Vikings, Community, One Piece et Plus belle la vie ? Il vous faut donc un très bon outil pour gérer tout ça et ne plus vous retrouver à rematter 15 fois la mort de SPOILER ALERT dans Game of Thrones parce que vous avez peur de sauter un épisode. Voici Previously On, une application développée en React JS, Node JS, avec la très complète API BetaSeries: http://www.betaseries.com/api/docs</p>
<p>Ceci est un projet réalisé en duo avec mon super binôme <a href="https://github.com/CorentinNrd">Corentin Nrd ⭐️</a></p>

<h2>Installation du projet</h2>
<p>BetaSeries étant une API privée <i><strong>il est impératif de déjà posséder un compte sur ce site ou de s'y inscrire au préalable</strong></i>, aussi la connexion à notre app ne comprend pas la prise en charge de réseaux sociaux alors inscrivez vous à l'aide d'une adresse mail et choisissez un mot de passe <a href="https://www.betaseries.com/inscription/compte">ici</a> (oui c'est long et ancien mais c'est important 😄)</p>
<p>Côté code, clônez le répertoire suivant. Une fois clôné, dirigez vous dans votre terminal sur le dossier "serveur", entrez <code>npm install</code> une fois l'installation faite, allez dans "client" et refaites <code>npm install</code>. Vous avez installé tous les packages nécéssaires au bon fonctionnement de l'app! Il reste une dernière étape: le <code>.env</code></p>
<p> Vous êtes normalement toujours dans client, ouvrez un nouveau fichier, lequel s'appellera .env; à l'intérieur écrivez ces deux lignes:
  <ul>
    <li>REACT_APP_CLIENT_ID=""</li>
    <li>REACT_APP_REDIRECT_URI=""</li>
  </ul>
