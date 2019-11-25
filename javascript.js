var lineChartData = {
    labels: [],
    datasets: [{
        label: 'Word count',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        fill: false,
        data: [],
        yAxisID: 'y-axis-1',
    }, {
        label: 'Sources in literatur.bib',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgb(54, 162, 235)',
        fill: false,
        data: [],
        yAxisID: 'y-axis-2'
    }, {
        label: 'Used sources',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        fill: false,
        data: [],
        yAxisID: 'y-axis-2'
    }]
};


var client = new XMLHttpRequest();
client.open('GET', 'data/stats.csv');
client.onreadystatechange = function () {
    console.log(client.responseText);
    if (client.responseText != "") {
        var rows = client.responseText.split(/\r?\n/);
        var lables = [];
        var pages = [];
        var words = [];
        var totalSources = [];
        var usedSources = [];
        for (var i = 0; i < rows.length; i++) {
            var points = rows[i].split(" , ");
            if (points.length != 7) {
                //console.log("Warning line " + i + " only has " + points.length + " points");
            } else {
                lables.push(new Date(points[1] * 1000));
                pages.push(points[3]);
                words.push(points[4]);
                totalSources.push(points[5]);
                usedSources.push(points[6]);
            }
        }
        lineChartData.labels = lables;
        lineChartData.datasets[0].data = words;
        lineChartData.datasets[1].data = totalSources;
        lineChartData.datasets[2].data = usedSources;
    }
}
client.send();


window.onload = function () {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Studienarbeit Statistiken'
            },
            scales: {
                yAxes: [{
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
					scaleLabel: {
						display: true,
						labelString: '# of Words'
					}
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
					scaleLabel: {
						display: true,
						labelString: '# of Sources'
					},

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    });
};
