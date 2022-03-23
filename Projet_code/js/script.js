//FONCTIONS
function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
}


//
// MON CODE

domOn('.muscles', 'mouseover', evt => {
    const monMuscle = evt.target;
    const color = monMuscle.getAttribute('fill');
    monMuscle.setAttribute('fill', '#ea8181');
    // const overcouleur = monMuscle.getAttribute('fill');
    // console.log(overcouleur);
})

domOn('.muscles', 'mouseout', evt => {
    const monMuscle = evt.target;
    const color = monMuscle.getAttribute('fill');
    monMuscle.setAttribute('fill', '#f2f2f2');
})
