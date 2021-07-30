
$(function () {

    // print All coins on screen
    $("button").click(async function () {
        try {
            const cryptoCoinsList = await getDataAsync("https://api.coingecko.com/api/v3/coins/list");
            $("ul").empty();

            for (let i = 0; i < 20; i++) {
                createCoinCard(cryptoCoinsList[i]);
            }
            // for (const singleCoin of cryptoCoinsList) {
            //     createCoinCard(singleCoin);
            // }
        }
        catch (err) {
            alert("Error: " + err.status);
        }
    });



    // AJAX Call
    function getDataAsync(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                success: data => resolve(data),
                reject: err => reject(err)
            });
        });
    }




    // function to create and present single Coin
    const createCoinCard = function (singleCoin) {
        const $card = $(`<div class="col">
        <div class="card" style="width: 19rem;">
            <div class="card-body">
                    <h5 class="card-title"> ${singleCoin.symbol}</h5>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    </div>    
                    <p class="card-text"> ${singleCoin.name}</p>
                    <p> Class ID: ${singleCoin.id}</p>
                    <a class="moreInfo btn btn-primary">More Info</a>
            </div>    
        </div>    
    </div>`);

        $card.find("input[type=checkbox]").on("click", countChecked);

        $card.find('a.moreInfo').on('click', function () {
            console.log(singleCoin.id);
            moreCoinInfo(singleCoin.id);
        });


        $('ul').append($card);
    }



    //count checked chedboxes
    var countChecked = function () {
        var n = $("input:checked").length;
        (n < 6) ? console.log(n + (n === 1 ? " is" : " are") + " checked!") : console.log("no more checks");
        if (n === 6) {
            console.log("max 5");
            $(this).prop("checked", false);
            let allCheckedOotions = Object.entries($("input:checked").parent().prev());
            allCheckedOotions.splice(-2);
            console.log(allCheckedOotions);
            console.log(Array.isArray(allCheckedOotions));

            console.log(allCheckedOotions.reduce((accumulator, currentValue, currentIndex, array) => {
                return accumulator + allCheckedOotions[currentIndex][1].outerText + ',';
            }, ""));

            // outerText

            // for (const element of allCheckedOotions) {
            //     console.log(element.outerText);
            // }
            //select all uncheckd and toggle
            console.log("All uncheced options:");
            $(":checkbox:not(:checked)").parent().parent().parent().hide();

            setTimeout(function () { $("div:hidden").show(); }, 3000);






        }
    };
    countChecked();




    //count checked chedboxes
    var moreCoinInfo = async function (id) {
        try {
            const singleCoinData = await getDataAsync(`https://api.coingecko.com/api/v3/coins/${id}`);
            console.log(singleCoinData);
            prestenMoreInfo(id, singleCoinData);
        }
        catch (err) {
            alert("Error: " + err.status);
        }
    };


    //present info on card info
    const prestenMoreInfo = function (id, coinJson) {
        console.log(id)
        console.log(coinJson)

    }





});







