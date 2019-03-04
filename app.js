


var testDesc = `

--------- Description of the bug --------- 

\nID/name: Keep it brief and use correct terms. A best practice is to include the name of the feature where you found an issue. A good example could be 'CART - Unable to add new item to my cart'.
\nDescription/summary: If you feel the name is not sufficient, explain the bug in a few words. Share it in easy-to-understand language. Keep in mind that your description might be used to search in your bug tracking application, so make sure to use the right words.
\nEnvironment: Depending on your browser, operating system, zoom level and screen size, websites may behave differently from one environment to another. Make sure your developers know your technical environment.
\nSource URL: Make it easy for your developers spot the problem by including the URL of the page where you found the bug. Big time saver!
\nVisual proof: A picture is worth a thousand words. Although it might not be enough, a visual element like a screenshot or a video will help your developers understand the problem better and faster.
\nSteps to reproduce: A screenshot is a proof that you had a problem, but keep in mind that your developer might not be able to reproduce the bug. Make sure to describe, with as much detail as possible, the steps you took before you encountered the bug.
\nExpected vs. actual results: Explain what results you expected - be as specific as possible. Just saying "the app doesn’t work as expected" is not useful. It's also helpful to describe what you actually experienced.
\nOptional: You can also include extra information such as the severity (critical, major, minor, trivial, enhancement), priority (high, medium, low), name of the reporter, person assigned or a due date.

\n--------- Description of the bug --------- 

`

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var ctx = document.getElementById("myChart").getContext('2d');


function getDataFromServer () {

	// let data = {
	// 	message: 'Hello, Roman! Please, send me json data of your bugs... =)'
	// }

	$.ajax({
		type: "GET",
		url: "http://localhost:8080/plot/file.json"
	}).done(function ( data ) { 
		console.log(data)

		if (data != null) {
			dataJSON = data;
		} else {
			console.log('data is not definded....')
		}
	});	

	var resultMass = []

	for (let i = 0; i < dataJSON.BigData.length; i++) {

		var data = [];
        var color = getRandomColor();

		for (let j = 0; j < dataJSON.BigData[i].versions.length; j++) {
			if (dataJSON.BigData[i].versions[j].visible) {
				data.push({
					x: dataJSON.BigData[i].versions[j].name,
					y: dataJSON.BigData[i].id,
                    desc: "description of the bug",
                    status: "status"
				})
			} else {
				data.push({})
			}
		}

        resultMass.push({
            data: data,

            label: dataJSON.BigData[i].bugName,
            issueProps: dataJSON.BigData[i].issuetype,
            borderColor: color,
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
			yAxes: [
				{
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
					        return dataJSON.BigData[label-1].bugName;
					    }
					}
				}
			]
		},
		tooltips: {
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

                    // console.log(tooltipItem.index)
                    // console.log(data.datasets[0])
                    console.log(data.datasets[0].label)

					if(tooltipItem.index == 0) {
						return message;
					}
					else if(tooltipItem.index == 1) {
						return message;
					}
					else if(tooltipItem.index == 2) {
						return message;
					}
					else {
						return message;
					}
			    },
			     title: function(tooltipItems, data) {
		            //Return value for title
		            
		            return tooltipItems[0].xLabel;
		        },
                afterLabel: function(tooltipItem, data) {

                    console.log(data.datasets[0])

                    var message = `

                    Bug name: ${data.datasets[0].label}\n
                    Bug status: ${data.datasets[0].data[tooltipItem.index].status}\n

                    `;

                    return message + testDesc;
                }
			}
		}
	}
})


}


window.onload = function () {
	getDataFromServer()
}













// var myChart = new Chart(ctx, {
// 	type: 'line',
//   	data: {
// 		labels: ['VM 1.0.0', 'VM 1.0.1', 'VM 1.0.2', 'VM 1.0.3', 'VM 1.0.4', 'VM 1.1.0', 'VM 1.1.1', 'VM 1.1.2', 'VM 1.1.3', 'VM 1.1.4', 'VM 1.1.5'],
// 		datasets: [
// 			{ 
// 				data: [
//                     {},
// 					{
// 				        x: 'VM 1.0.1',
// 				        y: 1
// 				    }, {
// 				        x: 'VM 1.0.2',
// 				        y: 1
// 				    }, {
// 				        x: 'VM 1.0.3',
// 				        y: 1
// 				    },
//                     {},
//                     {},
//                     {
//                         x: 'VM 1.1.1',
//                         y: 1
//                     },
//                     {},
//                     {
//                         x: 'VM 1.1.3',
//                         y: 1
//                     }

// 			    ],

// 				label: "BUG 1",
// 				borderColor: "#3e95cd",
// 				backgroundColor: "#3e95cd",
// 				hoverBackgroundColor: "lightgreen",
// 				radius: 6,
// 				hoverRadius: 10,
// 				fill: false
// 			}, 

// 			{ 
// 				data: [
// 					{
// 				        x: 'VM 1.0.1',
// 				        y: 2
// 				    }, {
// 				        x: 'VM 1.0.2',
// 				        y: 2
// 				    }, {
// 				        x: 'VM 1.0.4',
// 				        y: 2
// 				    }
// 			    ],
// 				label: "BUG 2",
// 				borderColor: "#8e5ea2",
// 				backgroundColor: "#8e5ea2",
// 				radius: 6,
// 				hoverRadius: 10,
// 				fill: false
// 			},

// 			{ 
// 				data: [
// 					{
// 				        x: 'VM 1.1.1',
// 				        y: 2
// 				    }, {
// 				        x: 'VM 1.1.2',
// 				        y: 2
// 				    }, {
// 				        x: 'VM 1.1.3',
// 				        y: 2
// 				    }, {
// 				        x: 'VM 1.1.4',
// 				        y: 2
// 				    },
//                     null,
//                     null,
//                     {
//                         x: 'VM 1.1.7',
//                         y: 2
//                     },

// 			    ],
// 				label: "BUG 2",
// 				borderColor: "#8e5ea2",
// 				backgroundColor: "#8e5ea2",
// 				radius: 6,
// 				hoverRadius: 10,
// 				fill: false
// 			},
// 			{ 
// 				data: [
// 					{
// 				        x: 'VM 1.0.4',
// 				        y: 3
// 				    }, {
// 				        x: 'VM 1.1.0',
// 				        y: 3
// 				    }, {
// 				        x: 'VM 1.1.1',
// 				        y: 3
// 				    }, {
// 				        x: 'VM 1.1.2',
// 				        y: 3
// 				    }
// 			    ],
// 				label: "BUG 3",
// 				borderColor: "#ff0016",
// 				backgroundColor: "#ff0016",
// 				radius: 6,
// 				hoverRadius: 10,
// 				fill: false
// 			}
// 		]
// 	},
// 	options: {
// 		title: {
// 			display: true,
// 			text: `Analysing bug's statuses in Test Runs (JIRA Structure)`
// 		},
// 		scales: {
// 			yAxes: [
// 				{
// 					ticks: {
// 						min: 0,
// 					    max: 4,
// 					    stepSize: 1,
// 					    suggestedMin: 0.5,
// 					    suggestedMax: 5.5,
// 					    callback: function(label, index, labels) {
// 					        switch (label) {
// 					            case 0:
// 					                return 'ZERO';
// 					            case 1:
// 					                return 'BUG 1';
// 					            case 2:
// 					                return 'BUG 2';
// 					            case 3:
// 					                return 'BUG 3';
// 					            case 4:
// 					                return 'BUG 4';
// 					            case 5:
// 					                return 'BUG 5';
// 					        }
// 					    }
// 					}
// 				}
// 			]
// 		},
// 		tooltips: {
// 			bodyFontColor: "#000000", //#000000
// 		    bodyFontSize: 20,
// 		    bodyFontStyle: "bold",
// 		    bodyFontColor: '#FFFFFF',
// 		    bodyFontFamily: "'Helvetica', 'Arial', sans-serif",
// 		    footerFontSize: 20,
// 		    callbacks: {
// 			    label: function(tooltipItem, data) {
// 					var value = data.datasets[0].data[tooltipItem.index];

// 					var message = "my string"

// 					if(tooltipItem.index == 0) {
// 						return message;
// 					}
// 					else if(tooltipItem.index == 1) {
// 						return "<?php echo $data2;?>";
// 					}
// 					else if(tooltipItem.index == 2) {
// 						return "<?php echo $data3;?>";
// 					}
// 					else {
// 						return message;
// 					}
// 			    },
// 			}
// 		}
// 	}
// })
