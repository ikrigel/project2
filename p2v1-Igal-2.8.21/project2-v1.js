
$(function () {

  var i = 0;
  function move() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }

 loadCoins();
 const createOngoingGraph = function (listOfCoins) {

  console.log("hello chen from multicharts");
  var coinDataPoints1 = [];
  var coinDataPoints2 = [];
  var coinDataPoints3 = [];
  var coinDataPoints4 = [];
  var coinDataPoints5 = [];
  var arr5 = [coinDataPoints1, coinDataPoints2, coinDataPoints3, coinDataPoints4, coinDataPoints5];

  $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${listOfCoins}&tsyms=USD`, function (data) {

      // Object.entries takes the date and pharse it into an array, and there for i can run on it with an index!!!!
      let arrrrr = Object.entries(data);
      let beginDate = Date.now();
      arrrrr.reduce(function (accumulator, currentValue, currentIndex, array) {
          arr5[currentIndex].push({
              x: beginDate,
              y: (currentValue[1]["USD"])
          });
      }, 0)

      // Creating the graphData array
      const graphData = [];
      arrrrr.reduce(function (accumulator, currentValue, currentIndex, array) {
          graphData.push({
              type: "line",
              xValueType: "dateTime",
              yValueFormatString: "###.00 USD",
              xValueFormatString: "hh:mm:ss TT",
              showInLegend: true,
              name: `${currentValue[0]}`,
              dataPoints: arr5[currentIndex]
          });
      }, 0)

      console.log(graphData);


      var options = {
          title: {
              text: "Your Slected Cryptocurrencies"
          },
          axisX: {
              title: "chart updates every 2 secs"
          },
          axisY: {
              suffix: "USD"
          },
          toolTip: {
              shared: true
          },
          legend: {
              cursor: "pointer",
              verticalAlign: "top",
              fontSize: 22,
              fontColor: "dimGrey",
              itemclick: toggleDataSeries
          },
          data: graphData
      };


      console.log(options);

      var chart2 = $("#chartContainer3").CanvasJSChart(options);

      function toggleDataSeries(e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
          }
          else {
              e.dataSeries.visible = true;
          }
          e.chart.render();
      }

      // update function
      function updateChart() {

          $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${listOfCoins}&tsyms=USD`, function (data2) {

              // Object.entries takes the date and pharse it into an array, and there for i can run on it with an index!!!!
              let arrrrr2 = Object.entries(data2);
              let beginDate2 = Date.now();
              arrrrr2.reduce(function (accumulator, currentValue, currentIndex, array) {
                  arr5[currentIndex].push({
                      x: beginDate2,
                      y: (currentValue[1]["USD"])
                  });

                  // // updating legend text with  updated with y Value 
                  options.data[currentIndex].legendText = `${currentValue[0]}: ${currentValue[1]["USD"]}USD`;


              }, 0)
          });

          $("#chartContainer3").CanvasJSChart().render();
      }


      var updateInterval2 = 2000;
      setInterval(function () { updateChart() }, updateInterval2);

      // end of getJSOn - do not delete
  });
  // end of getJSOn - do not delete
}

// createOngoingGraph("zcn,BTC,defihalf,atomhalf,ETH");
createOngoingGraph("althalf,balhalf,bchhalf,bsvhalf,half,");





  $(".btn-default").on('mouseenter', async function () {
    $(this).css({ "background-color": "blue", "color": "white" });
  });
  $(".btn-default").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "2px solid #4CAF50" });
  });

  $(".active:contains('Home')").on('click', async function () {
    loadCoins();
  });
  $(".active").on('mouseover', async function () {
    $(this).css({ "background-color": "white", "color": "white", "border": "2px solid #4CAF50" });

  });
  $(".active").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "0px solid #4CAF50" });

  });

  
  $(".active:contains('Live Report')").on('mouseenter', async function () {
    $(this).css({ "background-color": "blue", "color": "white" });
    //alert(`searching for Live Report`);
  });
  $(".active:contains('Live Report')").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "2px solid #4CAF50" });
    //alert(`searching for Live Report`);
  });

  $("a:contains('About')").on('click', async function () {
    alert(`searching for About`);
  });

  $("a:contains('Live Report')").on('click', async function () {
    //alert(`searching for Live Report`);
    loadReport() ;
    //createReport();
  });

  $(".navbar-brand:contains('Mission 2')").on('click', async function () {
    alert(`searching for Mission 2`);
  });








});



const creatCoinCard = function (singleCoin) {
  NProgress.start();
  const $card = $(`<div class="col"
  <div class="card" style="width: 19rem;">
    <div class="card-body">
      <h5 class="card=title">${singleCoin.symbol}</h5>
        <div class ="form-check form-switch"> 
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
         </div>
         <p class="card-text">${singleCoin.name}</p>
         <a class="moreInfo btn btn-primary">More Info</a>
    </div>
  </div>
</div>`);
  $card.find("input[type=checkbox]").on("click", console.log);

  $card.find('a.moreInfo').on("click", function () {
    console.log(singleCoin.id);
    moreCoinInfo(singleCoin.id);
  });
  $('ul').append($card);

}

function update() {
  var element = document.getElementById("myprogressBar");  
  var width = 1;
  var identity = setInterval(scene, 10);
  function scene() {
    if (width >= 100) {
      clearInterval(identity);
    } else {
      width++;
      element.style.width = width + '%';
    }
  }
}

async function loadCoins() {
  
  
  move();
  try {
    let url = "https://api.coingecko.com/api/v3/coins/";
    const allCoins = await getDataAsync(url);

    let id = 1;
    let toggleSwitch = `
       <label class='switch'>
          <input type="checkbox">
         <span class="slider round"></span>
       </label>
` ; 
    $('#chartContainer').empty();
    $('#coin-list').empty();
      allCoins.forEach(coin => {
      $('#coin-list').append(createCoinCard(coin));
    })

  }

  catch (err) {
    //.text(JSON.stringify(moreInfo))
    alert("Error: " + JSON.stringify(err.message));
  }
}

function getDataAsync(url) {
  return $.get(url);
}


function createCoinCard(singleCoin) {
  
  const $coin = $(`<div class="col">
  <div class="card" style="width: 19rem; height:19rem;margin:15px; border: 1px solid black; text-align:center">
    <div class="card-body" style="justify-content:center">
      <h5 class="card-title">${singleCoin.symbol.toUpperCase()}</h5>
        <div class ="form-check form-switch"> 
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" >
         </div>
         <p class="card-text">${singleCoin.name}</p>
         <button class="toggle-more-info btn btn-primary majorpoints">More Info</button>
         <div class="more-info" style="display: none; width: 17rem; height:8rem;margin:2px; border: 1px solid black; overflow:auto" >hey</div>
    </div>
  </div>
</div>`);

 $coin.find("input[type=checkbox]").on("click", console.log);
    $coin.find("input[type=checkbox]").on("click", function() {favoriteCoinsToStore(this)} );
     // $coin.find(".btn-outline-success").on("click", function() {favoriteCoinsToSearch(this)} );
  let isMoreInfoOpen = false;let moreInfo="";
  $coin.find('.toggle-more-info').on("click", async function () {
    document.onreadystatechange=move();
    if (!isMoreInfoOpen) {
      
      let url = `https://api.coingecko.com/api/v3/coins/${singleCoin.id}`;
      const coinFromSessionStorage=sessionStorage.getItem(`${singleCoin.name}`)
      if (coinFromSessionStorage===null){
        console.log(`${singleCoin.name} isn't stored in session storage`);
        const coinMoreInfo=await getDataAsync(url);
        setTimeout(()=>{
          sessionStorage.removeItem(coinMoreInfo.name)
        },120000);
         moreInfo={id: coinMoreInfo.id,
          img: coinMoreInfo.image.thumb,
          eur:coinMoreInfo.market_data.current_price.eur,
          usd:coinMoreInfo.market_data.current_price.usd,
          ils:coinMoreInfo.market_data.current_price.ils
          }
          const coinToStorage=JSON.stringify(moreInfo);
          sessionStorage.setItem(`${coinMoreInfo.name}`,coinToStorage);
          console.log(`saved ${coinMoreInfo.name} to session storage`);
          console.log(`coin id: ${coinMoreInfo.id}`);
      }
      else{ 
        
        coinMoreInfo=JSON.parse(coinFromSessionStorage);
         moreInfo={id: coinMoreInfo.id,
          img: coinMoreInfo.img,
          eur:coinMoreInfo.eur,
          usd:coinMoreInfo.usd,
          ils:coinMoreInfo.ils
          }
      }
      
      
      //const moreInfo = await getDataAsync(url);
      
      
      const moreInfoHtml = $(`<div><img src="${moreInfo.img}"/></br>
                             Current market data prices:</br> 
                             EUR: ${moreInfo.eur}&#8364;</br>
                             USD: ${moreInfo.usd}&#36;</br>
                             ILS: ${moreInfo.ils}&#8362;</br>
                             </div>    `);
      // $coin.find('.more-info').text(JSON.stringify(moreInfo));
      $coin.find('.more-info').html(moreInfoHtml);
    }
    isMoreInfoOpen = !isMoreInfoOpen;
    $coin.find('.more-info').slideToggle();
  });
  //$coin.find("input[type=checkbox]").on("click", console.log);
  return $coin;

}
let allCheckedCoions=[];
var countChecked = function () {
  var n = $("input:checked").length;
  (n < 6) ? console.log(n + (n === 1 ? " is" : " are") + " checked!") : console.log("no more checks");
  if (n === 6) {
      console.log("max 5");
      $(this).prop("checked", false);
      allCheckedCoions = Object.entries($("input:checked").parent().prev());
      allCheckedCoions.splice(-2);
      console.log(allCheckedCoions);
      console.log(Array.isArray(allCheckedCoions));

      console.log(allCheckedCoions.reduce((accumulator, currentValue, currentIndex, array) => {
          return accumulator + allCheckedCoions[currentIndex][1].outerText + ',';
      }, ""));
    }
    console.log(allCheckedCoions.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + allCheckedCoions[currentIndex][1].outerText + ',';}, ""));
  };
  
let CurrentSelectedCoinSymbolsForReport=[];
let selectedCoins = [];
let coinsNames=[];
function favoriteCoinsToStore(top) {
let currentCoin=$(top);
countChecked();


  if (top.checked === true) {

     if(selectedCoins.length < 5){
              selectedCoins.push(currentCoin);
              coinsNames.push( $(".card-title")
          .filter(function () {
              return $(this).text;
          }));
              console.log(currentCoin);
              console.log(coinsNames);
              console.log(coinsNames.reduce((accumulator, currentValue, currentIndex, array) => {
                return accumulator + coinsNames[currentIndex][1].outerText + ',';}, ""));
            }else{
               //alert("Cannot select more than 5 coins");
               top.checked=false;
               console.log(top.checked,selectedCoins);
          //console.log(selectedCoins[i])
          for (const iterator of selectedCoins) {
            console.log(iterator);
          }
         let innerHTMLCoin="";
         let innerTextCoinName="";
         for (const iterator of selectedCoins) {
          innerHTMLCoin+=$(iterator).parent().parent().parent().html();
          //innerHTMLCoin+=iterator.parent().parent().parent().parent().html();
          //innerTextCoinName+=iterator.parent().text();
          //innerHTMLCoin+=iterator.parent().html();
        }

           // $(".modal-body").html(innerTextCoinName);
            $(".modal-body").html(innerHTMLCoin);
             $("#myModal").modal("show");
             //$("input[type=checkbox]").modal("show");
             //$("input:checked").dialog().parent().parent().parent().parent();
            // $("input:checked").dialog();
            }
          }else{//false -user wants to remove a coin from selected coins
            let coinIndex = selectedCoins.findIndex(function(coinInArray){
              if(coinInArray===currentCoin){
                return true;
              }else{
                return false;
              }
              })
              selectedCoins.splice(coinIndex,1);

          }
          console.log(top.checked,selectedCoins);
          //console.log(selectedCoins[i])
          for (const iterator of selectedCoins) {
            console.log(iterator);
          }
          selectedCoins = Object.entries($("input:checked").parent().prev());
          selectedCoins.splice(-2);
      console.log(selectedCoins);
      console.log(Array.isArray(selectedCoins));
      CurrentSelectedCoinSymbolsForReport=[];
          console.log(selectedCoins.reduce((accumulator, currentValue, currentIndex, array) => {
            // for (const iterator of object) {
              
            // }
            CurrentSelectedCoinSymbolsForReport[currentIndex]=accumulator + selectedCoins[currentIndex][1].outerText + ',';
            
            return accumulator + selectedCoins[currentIndex][1].outerText + ',';}, ""));
            for (const iterator of CurrentSelectedCoinSymbolsForReport) {
              console.log(`current selected coins: ${iterator}`);  
            }
            
         
  }

  for (const iterator of CurrentSelectedCoinSymbolsForReport) {
    console.log(`current selected coins test: |${iterator}`);  
  }

$(".modal-close").on('click', async function () {
    let innerHTMLCoin="";
    $("#myModal").modal("hide");

  });
  
  $(".modal-X-close").on('click', async function () {

    $("#myModal").modal("hide");

  });
////////////////////////////////////live report start///////////////////////////
 
  async function loadReport() {
    CurrentSelectedCoinSymbolsForReport;
    let coinString="";
    createOngoingGraph="";
    coinString=CurrentSelectedCoinSymbolsForReport[CurrentSelectedCoinSymbolsForReport.length-1];
    coinString = coinString.slice(0, -1); 
    console.log(coinString);
     move();
     createOngoingGraph("althalf,balhalf,bchhalf,bsvhalf,half,");
  
  //   try {
  //     let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinString}&tsyms=USD`;
  //     const allCoins = await getDataAsync(url);
  
  //     let id = 1;
  //     let toggleSwitch = `
  //        <label class='switch'>
  //           <input type="checkbox">
  //          <span class="slider round"></span>
  //        </label>
  // `
  //     $('#coin-list').empty();//Hide it instead of clear it
  //     $('#chartContainer').empty();
  //     createReport(allCoins);
  //    // return allCoins;
  //   }
  
  //   catch (err) {
  //     //.text(JSON.stringify(moreInfo))
  //     alert("Error: " + JSON.stringify(err.message));
  //   }
  // }
///////////////////////////////////////first report test///////////////////////////////////
 
/* 
function createReport(reportCoin){
    // var allDataPoints= loadReport();
    var allDataPoints= reportCoin;
    console.log(allDataPoints);
    window.onload = function () {
      $(function () {
        //Better to construct options first and then pass it as a parameter
          var options = { 
            data: [
              {
                type: "splineArea", //change it to column, spline, line, pie, etc
                dataPoints: [
                  { x: 10, y: 10 },
                  { x: 20, y: 14 },
                  { x: 30, y: 18 },
                  { x: 40, y: 22 },
                  { x: 50, y: 18 },
                  { x: 60, y: 28 }
                ]
              }
            ]
          };
        
          $("#chartContainer").CanvasJSChart(options);
        
        
          $("#addDataPoint").on('click',function () {
            var chart = $("#chartContainer").CanvasJSChart();
            var length = chart.options.data[0].dataPoints.length;
            chart.options.data[0].dataPoints.push({ x: (length + 1) * 10, y: Math.round((30 - Math.random() * 10)) });
            chart.render();
          });
        }); 
    
var dataPoints1 = [data];
var dataPoints2 = [];
var dataPoints3 = [];

var options = {
	title: {
		text: "Electricity Generation in Turbine"
	},
	axisX: {
		title: "chart updates every 2 secs"
	},
	axisY: {
		suffix: "Wh"
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		verticalAlign: "top",
		fontSize: 22,
		fontColor: "dimGrey",
		itemclick: toggleDataSeries
	},
	data: [{
		type: "line",
		xValueType: "dateTime",
		yValueFormatString: "###.00Wh",
		xValueFormatString: "hh:mm:ss TT",
		showInLegend: true,
		name: "Turbine 1",
		dataPoints: dataPoints1
	},
	{
		type: "line",
		xValueType: "dateTime",
		yValueFormatString: "###.00Wh",
		showInLegend: true,
		name: "Turbine 2",
		dataPoints: dataPoints2
	}, {
		type: "line",
		xValueType: "dateTime",
		yValueFormatString: "###.00Wh",
		showInLegend: true,
		name: "Turbine 2",
		dataPoints: dataPoints3
	}]
};

var chart = $("#chartContainer").CanvasJSChart(options);

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}

var updateInterval = 2000;
// initial value
var yValue1 = 800;
var yValue2 = 810;
var yValue3 = 780;

var time = new Date;
// starting at 10.00 am
time.setHours(10);
time.setMinutes(00);
time.setSeconds(00);
time.setMilliseconds(00);

function updateChart(count) {
	count = count || 1;
	var deltaY1, deltaY2, deltaY3;
	for (var i = 0; i < count; i++) {
		time.setTime(time.getTime() + updateInterval);
		deltaY1 = -1 + Math.random() * (1 + 1);
		deltaY2 = -1 + Math.random() * (1 + 1);
		deltaY3 = -1 + Math.random() * (1 + 1);

		// adding random value and rounding it to two digits. 
		yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
		yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;
		yValue3 = Math.round((yValue3 + deltaY3) * 100) / 100;

		// pushing the new values
		dataPoints1.push({
			x: time.getTime(),
			y: yValue1
		});
		dataPoints2.push({
			x: time.getTime(),
			y: yValue2
		});
		dataPoints3.push({
			x: time.getTime(),
			y: yValue3
		});
	}

	// updating legend text with  updated with y Value 
	options.data[0].legendText = "Turbine 1 : " + yValue1 + "Wh";
	options.data[1].legendText = "Turbine 2 : " + yValue2 + "Wh";
	options.data[2].legendText = "Turbine 3 : " + yValue3 + "Wh";
	$("#chartContainer").CanvasJSChart().render();
}
// generates first set of dataPoints 
updateChart(100);
setInterval(function () { updateChart() }, updateInterval);

}
  }
*/
//////////////////////////////////////////end of report function//////////////////////  
///////////////////////////////////////////seconed chart//////////////////////////////

const createOngoingGraph = function (listOfCoins) {

  console.log("hello chen from multicharts");
  var coinDataPoints1 = [];
  var coinDataPoints2 = [];
  var coinDataPoints3 = [];
  var coinDataPoints4 = [];
  var coinDataPoints5 = [];
  var arr5 = [coinDataPoints1, coinDataPoints2, coinDataPoints3, coinDataPoints4, coinDataPoints5];

  $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${listOfCoins}&tsyms=USD`, function (data) {

      // Object.entries takes the date and pharse it into an array, and there for i can run on it with an index!!!!
      let arrrrr = Object.entries(data);
      let beginDate = Date.now();
      arrrrr.reduce(function (accumulator, currentValue, currentIndex, array) {
          arr5[currentIndex].push({
              x: beginDate,
              y: (currentValue[1]["USD"])
          });
      }, 0)

      // Creating the graphData array
      const graphData = [];
      arrrrr.reduce(function (accumulator, currentValue, currentIndex, array) {
          graphData.push({
              type: "line",
              xValueType: "dateTime",
              yValueFormatString: "###.00 USD",
              xValueFormatString: "hh:mm:ss TT",
              showInLegend: true,
              name: `${currentValue[0]}`,
              dataPoints: arr5[currentIndex]
          });
      }, 0)

      console.log(graphData);


      var options = {
          title: {
              text: "Your Slected Cryptocurrencies"
          },
          axisX: {
              title: "chart updates every 2 secs"
          },
          axisY: {
              suffix: "USD"
          },
          toolTip: {
              shared: true
          },
          legend: {
              cursor: "pointer",
              verticalAlign: "top",
              fontSize: 22,
              fontColor: "dimGrey",
              itemclick: toggleDataSeries
          },
          data: graphData
      };


      console.log(options);

      var chart2 = $("#chartContainer3").CanvasJSChart(options);

      function toggleDataSeries(e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
          }
          else {
              e.dataSeries.visible = true;
          }
          e.chart.render();
      }

      // update function
      function updateChart() {

          $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${listOfCoins}&tsyms=USD`, function (data2) {

              // Object.entries takes the date and pharse it into an array, and there for i can run on it with an index!!!!
              let arrrrr2 = Object.entries(data2);
              let beginDate2 = Date.now();
              arrrrr2.reduce(function (accumulator, currentValue, currentIndex, array) {
                  arr5[currentIndex].push({
                      x: beginDate2,
                      y: (currentValue[1]["USD"])
                  });

                  // // updating legend text with  updated with y Value 
                  options.data[currentIndex].legendText = `${currentValue[0]}: ${currentValue[1]["USD"]}USD`;


              }, 0)
          });

          $("#chartContainer3").CanvasJSChart().render();
      }


      var updateInterval2 = 2000;
      setInterval(function () { updateChart() }, updateInterval2);

      // end of getJSOn - do not delete
  });
  // end of getJSOn - do not delete
}

// createOngoingGraph("zcn,BTC,defihalf,atomhalf,ETH");







////////////////////////////////////////seconed chart test////////////////////////////////
  $(".btn-outline-success").on('click', async function () {

    let searchCoin = "";
    searchCoin = $("input").val();
    let searchResult="";
    
    let str = $("input").val().toUpperCase();
        console.log(str);
        console.log($(".card-title").filter(function () {
            console.log($(this).text() === str);
        }));
        let cardsShown=true;
if(str!=="" && cardsShown===true){
  // $scope.data = {};
  // $(".modal-body").html( 
    $(".card-title")
            .filter(function () {
                return $(this).text() !== str;
            })
            .parent()
            .parent()
            .hide();
             
      
            cardsShown=false;
            
          }
          else if (str!=="" && cardsShown===false){
            
            $(".card-title").parent()
            .parent()
            .show();
            $(".card-title")
            .filter(function () {
                return $(this).text() !== str;
            })
            .parent()
            .parent()
            .show();
            cardsShown===true;
          }
          else{
            $(".card-title")
            .filter(function () {
                return $(this).text() !== str;
            })
            .parent()
            .parent()
            .show();
            
          }
          
          
          

  });


  }

