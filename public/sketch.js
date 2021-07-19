
function setup() {
  noCanvas();

  var gateinput = select('#gate');
  var cgpiinput = select('#cgpi');
  var internshipsinput = select('#internships');
  var branchinput = select('#branch');
  var predict = select('#predict');
  predict.mousePressed(submitcgpi);

  function submitcgpi() {

    var url = '/all/' + gateinput.value() + '/' + cgpiinput.value() + '/' + internshipsinput.value() + '/' + branchinput.value();
    loadJSON(url, submitted);
    function submitted(result) {
      console.log(result);
    }
  }
}
