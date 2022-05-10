// Importation des données
const data = require('./fitness_exercises.csv')

// Chargement de d3
const d3 = window.d3

console.log('app run ...', d3)

// Cette fonction permet de récuperer une variable passée sur l'url
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// On utilise le bloc try catch pour capturer les erreurs
try {

  // Insertion de la div virtuel pour le tooltip et ajout de l'opacité à 0 pour qu'il soit invisible initialement
  const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


  // Selection de tous les éléments comportant la class "muscles"
  d3.selectAll(".muscles")
    // Ajout de l'écouteur "mouseover"
    .on("mouseover", function (evt) {
      // Changement de la couleur de fond de l'élément  sur lequel on fait le "mouseover" 
      d3.select(this).attr("fill", "#ea8181");
      console.log("evt", d3.select(this).attr("name"));

      // Augmentation de l'opacité du tooltip pour qu'il devienne visible
      div.transition().duration(200).style("opacity", .9);

      // Insertion de l'html dans le tooltip déjà visible et ajout de ses coordonnés pour son positionnement
      div.html(data.filter(
        a => a.name != null &&
          (a.bodyPart === d3.select(this).attr("name") || a.target === d3.select(this).attr("name"))).length + " Exercises")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

      console.log(d3.mouse(this));
    })
    // Ajout de l'écouteur "mousout" (se déclenche lorsque le pointeur de la souris quitte l'élément)
    .on("mouseout", function () {
      // Remet la couleur de fond principale
      d3.select(this).attr("fill", "#f2f2f2")
      // Rend le tooltip invisible
      div.transition().duration(500).style("opacity", 0);
    })
    .on("click", function () {
      // Ecouteur onclick
      // Cette condition vérifie d'abord s'il y a des exercices correspondant au muscle sur lequel on a cliqué et si oui, il redirge vers la page des exercices, si non, rien ne se passe
      if(d3.select(this).attr("name").length !== 0){
        window.location.href = "exercise.html?target=" + d3.select(this).attr("name")
      }
    });

  // On regarde si l'url contient une variable target
  const target = getParameterByName('target')

  if (target) {
    // Ce filtre sélectionne tous les exercices correspondant au target passé sur l'url
    const selectedExc = data.filter(a => a.name != null && (a.bodyPart === target || a.target === target))
    const html = []
    // Puis on boucle sur l'ensemble des exercices correspondant en construisant l'html qui sera inséré dans le DOM. Cet html est poussé dans un tableau.
    d3.map(selectedExc, i =>
      html.push(`
        <div class="child" style="padding: 50px; text-align: center;">
        <h2>`+ i.name + `</h2>     
        <h3>Equipment : `+ i.equipment + `</h3>     
        <img src="`+ i.gifUrl + `" alt=""> 
        </div>
        `)

    )
    // Ici, on utilse la fonction "join" pour convertir le tableau html en string puis on insère dans le DOM
    d3.select("div").html(
      "<div class='parent'>" + html && html.join('') + "</div>"
    );
    // On insère les titres dans le DOM
    d3.select("h1").text(selectedExc[0].bodyPart);
    d3.select("span").text(selectedExc.length + " Exercises found");

    const goToTop = () => {
      document.body.scrollIntoView({
        behavior: "smooth",
      });
    };
    d3.select(".back-to-top").on("click", goToTop);
    

  }


} catch (error) {
  // Ici, on capture d'éventuelles erreurs
  console.log('An orror occurs >> ', error)
}




