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
                text: "Your Slected Crypto Currncy"
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

createOngoingGraph("zcn,BTC,defihalf,atomhalf,ETH");

