function buildMetadata(sample) {
    // Access the website and use d3 to operate on the data
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
    d3.json(url).then((data) => { 
  
      // Filter the data for the object with the desired sample number (the id)
      let metadata = data.metadata;        
      let filteredArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = filteredArray[0]
      // Select the panel with id of `#sample-metadata`
      let panel = d3.select("#sample-metadata") 
  
      // Clear existing metadata - use `.html("")`
      panel.html("")
  
      // Append new tags for each key-value in the metadata
      for (key in result){
        panel.append('h6').text(`${key.toUpperCase()}: ${result[key]}`)
      };
  
      // If you want to do the bonus, you can make the gauge chart here
      
  
    ;
  })
}
  function buildCharts(sample) {
    // Access the website and use .then to operate on the data
    let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
    d3.json(url).then((data) => { 
  
      // Filter the data for the object with the desired sample number (the id)
      let sampleValues = data.samples;        
      let filteredArray = sampleValues.filter(sampleObj => sampleObj.id == sample);
      let result = filteredArray[0]
  
      // Pull the desired information (ids, labels, values) from your filtered data
      let otuIds = result.otu_ids
      let otuValues = result.sample_values
      let otuLabels = result.otu_labels
      // Build a Bubble Chart
      var trace2 = {
        x: otuIds,
        y: otuValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: otuValues,
          color: otuIds
        }
      };
      
      var data = [trace2];
      
      var layout = {
        title: 'Bacteria Cultures per Sample',
        xaxis:{title:'OTU ID'}
      };
      
      Plotly.newPlot('bubble', data, layout);
  

  
  
      // Build a Horizontal Bar Chart
      let trace1 = {
        x:otuValues.slice(0,10).reverse(),
        y:otuIds.slice(0,10).map(ID => `OTU ${ID}`).reverse(),
        text: otuLabels.slice(0,10).reverse(),
        type:'bar',
        orientation:'h'
      }
      let traceData = [trace1]
      Plotly.newPlot('bar',traceData) 
  
    });
  }
  
    function init() {
        // Get the reference to the dropdown menu
        let selector = d3.select("#selDataset")
    
        // Use the list of sample names to populate the select options
        let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
        d3.json(url).then((data) => { 
        // Do this by pulling the array associated with `names` 
        let idNames = data.names
    
        // Loop through the names and append to the dropdown menu
        for (let i=0;i < idNames.length; i++){
            selector.append("option").text(idNames[i]).property("value",idNames[i])
        };
    
        // Use the first sample from the list to build the initial plots
        let firstSample = idNames[0]
        
        buildCharts(firstSample)
        buildMetadata(firstSample)
        
        
    });
}  
  function optionChanged(newSample) {
    // Change your data and update your plots/metadata when newSample is selected from the dropdown
    buildCharts(newSample);
    buildMetadata(newSample);
    
  }
  
  // Initialize the dashboard
  init();