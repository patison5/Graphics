var dataJSON = {};

var _isHovered = false;
var tmpData;
var selectedIndex;

function getColor(id) {
    id = parseInt(id);

    switch (id) {
        case 1:
            return "#c85656";
            break;

        case 2:
            return "#fa9722";
            break;

        case 3:
            return "#23a1c4";
            break;

        case 4:
            return "#339219";
            break;

        case 5:
            return "#8adc74";
            break;
    }
}

function find_in_object(my_object, my_criteria){

  return my_object.filter(function(obj) {
    return Object.keys(my_criteria).every(function(c) {
      return obj[c] == my_criteria[c];
    });
  });

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var ctx = document.getElementById("myChart").getContext('2d');




function drawGraph(dataJSON) {
    if (true) {

        var resultMass = []

        for (let i = 0; i < dataJSON.BigData.length; i++) {

            var data = [];
            var color = getColor(dataJSON.BigData[i].issueProps.priorityId);

            for (let j = 0; j < dataJSON.BigData[i].versions.length; j++) {
                if (dataJSON.BigData[i].versions[j].visible) {
                    data.push({
                        x: dataJSON.BigData[i].versions[j].name,
                        y: dataJSON.BigData[i].id,
                        desc: "description of the bug",
                        status: "status"
                    })
                } else {
                    data.push(null)
                }
            }

            resultMass.push({
                data: data,

                label: dataJSON.BigData[i].bugName,
                issueProps: dataJSON.BigData[i].issueProps,

                borderColor: (dataJSON.BigData[i].issueProps.status === "Закрыт") ? "#000000d6" : color,
                backgroundColor: color,
                hoverBackgroundColor: color,
                radius: 6,
                hoverRadius: 10,
                fill: false
            })
        }

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataJSON.Labels,
                datasets: resultMass
            },
            options: {
                title: {
                    display: true,
                    fontSize: 25,
                    text: `Analysing bug's statuses in Test Runs (JIRA Structure)`
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            // max: 100,
                            stepSize: 1,
                            suggestedMin: 0.5,
                            suggestedMax: 5.5,
                            callback: function(label, index, labels) {
                                if (label == 0) {
                                    return 'SHIT'
                                }
                                return dataJSON.BigData[label - 1].bugName;
                            }
                        }
                    }]
                },
                hover: {mode: null},
                onHover: function(evt) {
                    // console.log('hello')
                    var item = myChart.getElementAtEvent(evt);
                    
                    // if (typeof(item) != undefined) {
                    //     
                    // }



                    if ((item.length != 0) && (!_isHovered)) {
                        _isHovered = true;
                        var id = item[0]._datasetIndex;
                        var element = myChart.data.datasets[id];

                        // console.log(element.label)

                        for (var i = 0; i < myChart.data.datasets.length; i++) {
                            if (myChart.data.datasets[i].label === element.label) {
                                // console.log("Finded: ", myChart.data.datasets[i])

                                selectedIndex = i;

                                tmpData = myChart.data.datasets[i].data;
                                var tmpDataRes = [];

                                for (var j = 0; j < myChart.data.datasets[i].data.length; j++) {
                                    if (myChart.data.datasets[i].data[j] != null) {
                                        tmpDataRes.push(myChart.data.datasets[i].data[j])
                                    }
                                }

                                // console.log("resData: ", tmpDataRes)

                                console.log(myChart.data.datasets[i])
                                myChart.data.datasets[i].data = tmpDataRes;
                                console.log(myChart.data.datasets[i])

                                myChart.update();

                                break;
                            }
                        }

                    } else if ((item.length == 0) && (_isHovered)) {
                        console.log("mouse out")
                        myChart.data.datasets[selectedIndex].data = tmpData;
                        myChart.update();
                    }

                    if ((item.length == 0))
                        _isHovered = false;
 
                },
                legend: {
                    display: true
                },
                animation: {
                    easing: 'easeInSine'
                },
                tooltips: {
                    // mode: 'index',
                    bodyFontColor: "#000000", //#000000
                    bodyFontSize: 15,
                    bodyFontStyle: "bold",
                    bodyFontColor: '#FFFFFF',
                    bodyFontFamily: "'Helvetica', 'Arial', sans-serif",
                    footerFontSize: 20,


                    callbacks: {
                        label: function(tooltipItem, data) {
                            var value = data.datasets[0].data[tooltipItem.index];

                            var message = ``;

                            if (tooltipItem.index == 0) {
                                return message;
                            } else if (tooltipItem.index == 1) {
                                return message;
                            } else if (tooltipItem.index == 2) {
                                return message;
                            } else {
                                return message;
                            }
                        },
                        title: function(tooltipItems, data) {
                            //Return value for title

                            var title = data.datasets[tooltipItems[0].datasetIndex].issueProps.summary;

                            return tooltipItems[0].xLabel + "  " + title;
                        },
                        afterLabel: function(tooltipItem, data) {

                            // console.log(data.datasets[tooltipItem.datasetIndex])

                            var tooltipText =
                                `Описание: \n${data.datasets[tooltipItem.datasetIndex].issueProps.description}
                            \n\nСостояние: ${data.datasets[tooltipItem.datasetIndex].issueProps.issuetype}
                            \nСтатус: ${data.datasets[tooltipItem.datasetIndex].issueProps.status}
                            \nПриоритет: ${data.datasets[tooltipItem.datasetIndex].issueProps.priority}
                            \nСоздатель: ${data.datasets[tooltipItem.datasetIndex].issueProps.creator}
                            \nВыполняющий: ${data.datasets[tooltipItem.datasetIndex].issueProps.assignee}`

                            return tooltipText;
                        }
                    }
                }
            }
        })

    }
}

function getDataFromServer() {

    // let data = {
    //  message: 'Hello, Roman! Please, send me json data of your bugs... =)'
    // }

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/plot/BigData.json"
    }).done(function(data) {
        console.log(data)

        if (data != null) {
            drawGraph(data)
        } else {
            alert('data is not definded....')
        }
    });
}


window.onload = function() {
    getDataFromServer()


    //вот это мое для тестов.. будешь комитить для своих
    drawGraph(dataJSON);
}






function changeData () {
    console.log(myChart)
}

changeData();

