var ctx = document.getElementById("myChart").getContext('2d');

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
				    }
			    ],

				label: "BUG 1",
				borderColor: "#3e95cd",
				backgroundColor: "#3e95cd",
				hoverBackgroundColor: "lightgreen",
				radius: 6,
				hoverRadius: 10,
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
				backgroundColor: "#8e5ea2",
				radius: 6,
				hoverRadius: 10,
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
				backgroundColor: "#8e5ea2",
				radius: 6,
				hoverRadius: 10,
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
				backgroundColor: "#ff0016",
				radius: 6,
				hoverRadius: 10,
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

					var message = "my string"

					if(tooltipItem.index == 0) {
						return message;
					}
					else if(tooltipItem.index == 1) {
						return "<?php echo $data2;?>";
					}
					else if(tooltipItem.index == 2) {
						return "<?php echo $data3;?>";
					}
					else {
						return message;
					}
			    },
			}
		}
	}
})




function getDataFromServer () {

	let data = {
		message: 'Hello, Roman! Please, send me json data of your bugs... =)'
	}

	$.ajax({
		type: "post",
		url: "/api/getData", 
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data:  JSON.stringify(data,null, 2)
	}).done(function ( data ) { 
		
		console.log(data)

	});
}