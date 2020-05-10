const readline = require('readline-sync');
const prompt = '>';
const fs = require('fs')
var vg = require('vega');
var vegalite = require('vega-lite');

function createChart(chart) {

    var isValid = true;
    do {
        if (!isValid) {
            console.log("Invalid path");
        }
        console.log("Where do you want to save your file? (E.g. C:\\Users\\user\\Desktop\\myfile.svg(or .png))");
        let path = readline.question(`${prompt}`);

        format = path.substring(path.length-3,path.length);

        const myChart = vegalite.compile(chart).spec;


        if (format == "svg") {
            isValid = true;
            var runtime = vg.parse(myChart);
            var view = new vg.View(runtime).renderer('svg').run();
            var mySvg = view.toSVG();
            mySvg.then(function(res){
                fs.writeFileSync(path, res)
                view.finalize();
            });
        } else if (format == "png") {
            isValid = true;
            var view = new vg.View(vg.parse(myChart)).renderer('none').run();
            view.toCanvas().then(function(res){
                fs.writeFileSync(path, res.toBuffer());
                view.finalize();
            })
        } else isValid = false;
    } while (!isValid);


}

module.exports = createChart
