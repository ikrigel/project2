window.onload = function () {
    var dataPoints = [];
    var chart;
    $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=zcn&tsyms=USD", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({
                x: Date.now(),
                y: (value["USD"])
            });
            console.log("hello chen");
            console.log(dataPoints);
        });
        chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Live Chart with dataPoints from External JSON"
            },
            data: [{
                type: "line",
                xValueType: "dateTime",
                dataPoints: dataPoints,
            }]
        });
        chart.render();
        updateChart();
    });

    function updateChart() {
        $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=zcn&tsyms=USD", function (data) {
            $.each(data, function (key, value) {
                dataPoints.push({
                    x: Date.now(),
                    y: (value["USD"])
                });
            });
            chart.render();
            setTimeout(function () {
                updateChart()
            }, 1000);
        });
    }
}










// console.log("hello chen");
// var dataPoints2 = [];
// $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=zcn&tsyms=USD", function (data) {

//     for (const property in data) {
//         console.log(`${property}: ${data[property]["USD"]}`);
//         console.log(Date.now());

//     }

//     $.each(data, function (key, value) {
//         dataPoints2.push({
//             x: Date.now(),
//             y: (value["USD"])
//         });
//         console.log(dataPoints2);
//     });
// });
