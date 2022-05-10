const data = require('./fitness_exercises.csv')
const d3 = window.d3

console.log('app run ...', d3)

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

  const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

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


} catch (error) {
  console.log('an orror occurs >> ', error)
}

//Back to top
const backToTopButton = document.querySelector(".back-to-top")

const goToTop = () => {
  document.body.scrollIntoView();
};
backToTopButton.addEventListener("click", goToTop)
