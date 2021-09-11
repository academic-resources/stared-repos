window.onload = function () {
	var lang_chart = new CanvasJS.Chart("chart-container-1",{
	    title :{
	        text: "Languages",
	        fontSize: 25,
	        fontFamily: "Georgia"
	    },
	    axisY:{
         	minimum: 0,
    	   	maximum: 10,
    	   	interval: 2
     	},
	    data: [{
			type: "column",
		    dataPoints : [
			    { label: "Java",  y: 7, color: "#CAD2C5"  },
			    { label: "Python", y: 6, color: "#84A98C"  },
			    { label: "SQL", y: 4.5, color: "#52796F"  },
			    { label: "C/C++",  y: 4, color: "#354F52"  },
			    { label: "Shell",  y: 5, color: "#2F3E46"  }
			]
	    }]
});
	var software_chart = new CanvasJS.Chart("chart-container-2",{
	  	title :{
			text: "Softwares",
	        fontSize: 25,
	        fontFamily: "Georgia"
	    },
	    axisY:{
         	minimum: 0,
    	   	maximum: 10,
    	   	interval: 2
     	},
	    data: [{
			type: "column",
			dataPoints : [
			    { label: "Photoshop",  y: 5, color: "#CAD2C5"  },
			    { label: "Illustrator", y: 4, color: "#84A98C"  },
			    { label: "Lightroom", y: 6, color: "#52796F"  },
			    { label: "Git",  y: 7, color: "#354F52"  },
			    { label: "Metasploit",  y: 5, color: "#2F3E46" },
			    { label: "NMap",  y: 5, color: "#CAD2C5"  },
			]
	    }]
	});
	var framework_chart = new CanvasJS.Chart("chart-container-3",{
	    title :{
			text: "Frameworks",
	        fontSize: 25,
	        fontFamily: "Georgia"
	    },
	    axisY:{
         	minimum: 0,
    	   	maximum: 10,
    	   	interval: 2
     	},
	    data: [{
			type: "column",
			dataPoints : [
			    { label: "Hadoop",  y: 5, color: "#CAD2C5"  },
			    { label: "scikit-learn", y: 5, color: "#84A98C"  },
			    { label: "Robot Framework", y: 5, color: "#52796F"  },
			    { label: "uiautomator-py",  y: 7, color: "#354F52"  },
			]
		    }]
	});
	var android_chart = new CanvasJS.Chart("chart-container-4",{
	    title :{
			text: "Android",
	        fontSize: 25,
	        fontFamily: "Georgia"
	    },
	    axisY:{
         	minimum: 0,
    	   	maximum: 10,
    	   	interval: 2
     	},
	    data: [{
			type: "column",
			dataPoints : [
			    { label: "Android SDK",  y: 7, color: "#CAD2C5"  },
			    { label: "Material Design", y: 5, color: "#84A98C"  },
			    { label: "Realm", y: 5, color: "#52796F"  },
			    { label: "Firebase",  y: 6, color: "#354F52"  }
			]
	    }]
	});
 
lang_chart.render();
software_chart.render();
framework_chart.render();
android_chart.render();
}