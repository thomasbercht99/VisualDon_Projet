const data = require('./fitness_exercises.csv')

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

const margin = { top: 30, right: 20, bottom: 30, left: 50 },
  width = 600 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

try {

  const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


  d3.selectAll(".muscles")
    .on("mouseover", function (evt) {
      d3.select(this)
        .attr("fill", "#ea8181");

      console.log("evt", d3.select(this).attr("name"));

      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(data.filter(
        a => a.name != null &&
          (a.bodyPart === d3.select(this).attr("name") || a.target === d3.select(this).attr("name"))).length + " Exervices")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

      console.log(d3.mouse(this));
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("fill", "#f2f2f2")
      div.transition()
        .duration(500)
        .style("opacity", 0);
    })
    .on("click", function () {
      window.location.href = "exercise.html?target=" + d3.select(this).attr("name")
    });

  const target = getParameterByName('target')
  if (target) {
    const selectedExc = data.filter(a => a.name != null && (a.bodyPart === target || a.target === target))
    const html = []
    d3.map(selectedExc, i =>
      html.push(`
        <div class="child" style="padding: 50px; text-align: center;">
        <h2>`+ i.name + `</h2>     
        <h3>Equipement: `+ i.equipment + `</h3>     
        <img src="`+ i.gifUrl + `" alt=""> 
        </div>
        `)

    )

    d3.select("div").html(
      "<div class='parent'>" + html && html.join('') + "</div>"
    );
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
  console.log('An orror occurs >> ', error)
}




