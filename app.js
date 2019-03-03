var ctx = document.getElementById("myChart").getContext('2d');

// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });


var bubbleData = {
	datasets: [
		{
			label: 'bug 1',
			data: [{
		        x: 10,
		        y: 10
		    }, {
		        x: 20,
		        y: 10
		    }, {
		        x: 30,
		        y: 10
		    }],
			backgroundColor: 'salmon',
			borderColor: 'firebrick'
		},
		{
			label: 'bug 2',
			data: [{
		        x: 10,
		        y: 20
		    }, {
		        x: 30,
		        y: 20
		    }, {
		        x: 30,
		        y: 10
		    }],
		}
	]
}


var bubbleOptions = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true
				},
				stacked: true
			}
		]
	}
}

var myChart = new Chart(ctx, {
	type: 'line',
  	data: {
		labels: ['1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.0.4', '1.1.0', '1.1.1', '1.1.2', '1.1.3', '1.1.4', '1.1.5'],
		datasets: [
			{ 
				data: [
				{
			        x: '1.0.1',
			        y: 1
			    }, {
			        x: '1.0.2',
			        y: 1
			    }, {
			        x: '1.0.3',
			        y: 1
			    }],
				label: "BUG 1",
				borderColor: "#3e95cd",
				fill: false
			}, 

			{ 
				data: [
					{
				        x: '1.0.1',
				        y: 2
				    }, {
				        x: '1.0.2',
				        y: 2
				    }, {
				        x: '1.0.4',
				        y: 2
				    }
			    ],
				label: "BUG 2",
				borderColor: "#8e5ea2",
				fill: false
			},

			{ 
				data: [
					{
				        x: '1.1.1',
				        y: 2
				    }, {
				        x: '1.1.2',
				        y: 2
				    }, {
				        x: '1.1.3',
				        y: 2
				    }, {
				        x: '1.1.4',
				        y: 2
				    }
			    ],
				label: "BUG 2",
				borderColor: "#8e5ea2",
				fill: false
			},
			{ 
				data: [
					{
				        x: '1.0.4',
				        y: 3
				    }, {
				        x: '1.1.0',
				        y: 3
				    }, {
				        x: '1.1.1',
				        y: 3
				    }, {
				        x: '1.1.2',
				        y: 3
				    }
			    ],
				label: "BUG 3",
				borderColor: "#ff0016",
				fill: false
			}
		]
	},
	options: {
		title: {
			display: true,
			text: `Analysing bug's statuses in Test Runs (JIRA Structure)`
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
					    max: 4,
					    stepSize: 1,
					    suggestedMin: 0.5,
					    suggestedMax: 5.5,
					    callback: function(label, index, labels) {
					        switch (label) {
					            case 0:
					                return 'ZERO';
					            case 1:
					                return 'BUG 1';
					            case 2:
					                return 'BUG 2';
					            case 3:
					                return 'BUG 3';
					            case 4:
					                return 'BUG 4';
					            case 5:
					                return 'BUG 5';
					        }
					    }
					}
				}
			]
		},
		tooltips: {
			bodyFontColor: "#000000", //#000000
		    bodyFontSize: 20,
		    bodyFontStyle: "bold",
		    bodyFontColor: '#FFFFFF',
		    bodyFontFamily: "'Helvetica', 'Arial', sans-serif",
		    footerFontSize: 20,
		    callbacks: {
			    label: function(tooltipItem, data) {
					var value = data.datasets[0].data[tooltipItem.index];


					if(tooltipItem.index == 0) {
						return `
							that's my text

							and this is too
						`;
					}
					else if(tooltipItem.index == 1) {
						return "<?php echo $data2;?>";
					}
					else if(tooltipItem.index == 2) {
						return "<?php echo $data3;?>";
					}
					else {
						return "<?php echo $data4; ?>";
					}
			    },
			}
		}
	}
})