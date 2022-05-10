//Importation des données
const data = require('./fitness_exercises.csv')

///chargement de d3
const d3 = window.d3

console.log('app run ...', d3)

//cette fonction permet de recuperer une variable passer sur l'url
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//On utulise le blocs try catch pour capture les erreurs
try {

  //Insertion de la div virtuel pour le tooltip et ajoute l'opasité a 0 pour qu'il soit invisible initialement
  const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


  //Selection de tous les elements qui porte la classe muscles
  d3.selectAll(".muscles")
    //Ajoute de l'ecouteur mouseover
    .on("mouseover", function (evt) {
      //changeement de la couleur de fond de l'elemnt  sur le quel on  a mouseover 
      d3.select(this).attr("fill", "#ea8181");
      console.log("evt", d3.select(this).attr("name"));

      //Augmentation de l'opacité du tooltip pour qu'il devient visible
      div.transition().duration(200).style("opacity", .9);

      //Insertion du html dans le tooltip deja visible et puis ajout de ses coordonnés pour son positionneent
      div.html(data.filter(
        a => a.name != null &&
          (a.bodyPart === d3.select(this).attr("name") || a.target === d3.select(this).attr("name"))).length + " Exervices")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

      console.log(d3.mouse(this));
    })
    //Ajoute de l'ecouteur mousout (se declanche lorsque le pointer de la souris quite l'element)
    .on("mouseout", function () {
      //remet la couleur de fond normale
      d3.select(this).attr("fill", "#f2f2f2")
      //rend le tooltip invissible
      div.transition().duration(500).style("opacity", 0);
    })
    .on("click", function () {
      //Ecouteur onclick
      //Cette condition verifie d'abord s'il a des exercises qui correspond au muscle sur le quel on a cliquer et si oui il redirge vers la page de details si non il ne fait rien
      if(d3.select(this).attr("name").length !== 0){
        window.location.href = "exercise.html?target=" + d3.select(this).attr("name")
      }
    });

  //On regarde si l'url contient une variable target
  const target = getParameterByName('target')

  if (target) {
    //ce filtre selectionne tous les exercies correspondant au target passer sur l'url
    const selectedExc = data.filter(a => a.name != null && (a.bodyPart === target || a.target === target))
    const html = []
    //Puis on boucle sur l'ensemble des exercices correspondant en construsant le html qui sera inserer dans la dom. cet html es poussé dans un tableau.
    d3.map(selectedExc, i =>
      html.push(`
        <div class="child" style="padding: 50px; text-align: center;">
        <h2>`+ i.name + `</h2>     
        <h3>Equipement: `+ i.equipment + `</h3>     
        <img src="`+ i.gifUrl + `" alt=""> 
        </div>
        `)

    )
    //ici on utilse  la fonction join pour convertir le tableau de html en string et on insere dans la dom
    d3.select("div").html(
      "<div class='parent'>" + html && html.join('') + "</div>"
    );
    //On inserre les titres dans la dom
    d3.select("h1").text(selectedExc[0].bodyPart);
    d3.select("span").text(selectedExc.length + " Exercises trouvés");

    const goToTop = () => {
      document.body.scrollIntoView({
        behavior: "smooth",
      });
    };
    d3.select(".back-to-top").on("click", goToTop);
    

  }


} catch (error) {
  //Ici on capture d'evantuelle erreur
  console.log('An orror occurs >> ', error)
}




