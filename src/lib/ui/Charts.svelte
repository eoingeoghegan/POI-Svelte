<script lang="ts">

/* 
Imported required modules and installed echarts to packageJson.
*/
    import {currentCategories, currentPlacemarkers, subTitle} from "$lib/runes.svelte";  
    import { onMount } from "svelte"; 
    import * as echarts from 'echarts';

    subTitle.text = "Charts";
  
    // These are the structures for the charts
    const placemarkersByCategory = {
      labels: [],
      datasets: [
          {values: [0,0]}
      ]
  };
  
    const placemarkersByDifficulty = {
      labels: ["Easy", "Moderate", "Hard", "Expert"],
      datasets: [
          {values: [0,0, 0, 0]}
      ]
  };
  
  /*
    Mounts component to the DOM for rendering, 
    
    Chart1
    First chart creates an empty array for the titles, then iterates
    through categories. For each category the title will push into the array.

    It then initialises the array with 0, iterrates through the placemarkers,
    and for each placemarker checks the id. If the placemarker matches the category,
    then datasets value increases by 1.


    Chart 2
    Iterates through each placemarker in currentPlacemarkers, 
    Checks the difficulty and increases by one for each difficulty.
    Each difficulty is set to a certain index in the array.


  */
  onMount(async () => {
      
    //Chart 1
    placemarkersByCategory.labels = [];
      currentCategories.categories.forEach((categoryid,i) => {
        // @ts-ignore
        placemarkersByCategory.labels.push(`${categoryid.title}`);
        placemarkersByCategory.datasets[0].values.push(0);
  
        currentPlacemarkers.placemarkers.forEach((placemarker) => {
           if(placemarker.categoryid._id == categoryid._id) {
             placemarkersByCategory.datasets[0].values[i] += 1;
           }
         })
      });
    
  // Chart 2
    currentPlacemarkers.placemarkers.forEach((placemarker) => {
      
      if (placemarker.difficulty === "Easy") {
        placemarkersByDifficulty.datasets[0].values[0] += 1;
      } else if (placemarker.difficulty === "Moderate") {
        placemarkersByDifficulty.datasets[0].values[1] += 1;
      } else if (placemarker.difficulty === "Hard") {
        placemarkersByDifficulty.datasets[0].values[2] += 1;
      } else if (placemarker.difficulty === "Expert") {
        placemarkersByDifficulty.datasets[0].values[3] += 1;
      } 
    });
  
    
  /* 
  Found code on https://echarts.apache.org/examples/en/editor.html?c=pie-simple&lang=ts 

  This code renders two charts 1 and 2 as Echarts. pieChart and barChart.
  It works by id'ing the charts and adding an Echart to it.

  Tooltip: Shows the info when hovering over the chart,
  Legend places the chart legend in the center above each chart.
  Series: Sets the type of chart, name, radius and where the data comes from (datasets).
  Grid: sets the layout, so they are beside each other.

  .setoption; applies the config anf renders the charts.
  */    
  let pieChartDom = document.getElementById("pieChart");
      let pieChart = echarts.init(pieChartDom);
  
      let pieOption = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Placemarkers By Category",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: placemarkersByCategory.labels.map((label, index) => ({
              name: label,
              value: placemarkersByCategory.datasets[0].values[index],
            })),
          },
        ],
      };
  
      pieChart.setOption(pieOption);
  
      
      let barChartDom = document.getElementById("barChart");
      let barChart = echarts.init(barChartDom);
  
      let barOption = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        grid: {
          top: "50%", 
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: placemarkersByDifficulty.labels,
            axisLabel: {
              interval: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Placemarkers By Difficulty",
            type: "bar",
            data: placemarkersByDifficulty.datasets[0].values,
            itemStyle: {
              color: "#87CEEB", 
            },
          },
        ],
      };
  
      barChart.setOption(barOption);
  
      
      window.addEventListener("resize", () => {
        pieChart.resize();
        barChart.resize();
      });
    });

    /* Basic Charts
  <div class="columns">
      <div class="column box has-text-centered">
          <h1 class="title is-4">Placemarkers By Category</h1>
          <Chart data={placemarkersByCategory} type="pie" />
      </div>
      <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarkers By Difficulty</h1>
        <Chart data={placemarkersByDifficulty} type="bar" />
    </div>
    
  </div>
    */
  </script>
  
  <div class="columns card ">
    <div class="column  has-text-centered">
      <h1 class="title is-7">Placemarkers By Category (Pie Chart)</h1>
      <div id="pieChart" style="width: 100%; height: 400px;"></div>
    </div>
    <div class="column  has-text-centered">
      <h1 class="title is-7">Placemarkers By Difficulty (Bar Chart)</h1>
      <div id="barChart" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
  
  