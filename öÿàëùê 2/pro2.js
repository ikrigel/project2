const selectedCoins = [];

function addSelectedCoin(event, coin){
    if(event.target.checked === true){  // if true then user wants to add a coin
        if(selectedCoins.length < 5){
            selectedCoins.push(coin)
        }else{
            alert("Cannot select more than 5 coins");
            event.target.checked = false;
        }
    }else { // false - user wants to remove a coin
        const coinIndex = selectedCoins.findIndex( function(coinFromArray){
            if(coinFromArray === coin){
                return true;
            }else{
                return false;
            }
        })
        selectedCoins.splice(coinIndex, 1);
    }

    console.log(event.target.checked, selectedCoins)
}
// -------- Show all the coins onload -------- //
$(document).ready(showAllCoins());

// --------------------------------- Show all fonts onload function --------------------------------- //
function showAllCoins() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            for (let i = 0; i < 20; i++) {
                $(".coins").append(`
<div class="card">
<div class="card-body">
<span>
<p id="coin-sym"><strong>symbol:</strong> ${data[i].symbol}<br>
<strong>name:</strong> ${data[i].name}
<label class="switch">
<input type="checkbox" onclick="addSelectedCoin(event, '${data[i].symbol}')">
<span class="slider round"></span>
</label>



</p>
<button class="btn btn-primary btn-sm" data-toggle="collapse" data-target="#${data[i].id}" onClick="moreInfo('${data[i].id}')">More Info</button>
<div class="collapse" id="a${data[i].id}">details added here</div>
</span>
</div>
</div>
</div>
`)
            }
        }
    })
}


// --------------------------------- Search Function --------------------------------- //
function searchCoins() {
    $.ajax(
        {
            type: 'GET',
            datatype: 'json',
            url: "https://api.coingecko.com/api/v3/coins/" + searchInput.value,
            success: function (data) {
                searchCoin[0] = data
                $(".searchResult").html($(`.${searchInput}`));
                console.log(data)
            },
            error: function (error) {
                console.log("error : ", error);
            }
        }
    );
}

// ---------------------------------More info function --------------------------------- //
function moreInfo(id) {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/" + id,
        dataType: "json",
        success: function (data) {
            $(".card").append(`
<div class="card-body">
<div><img src=${data.image.small}/>
<p>Price List:</p>
<ul>
<li>${data.market_data.current_price.usd} $</li>
<li>${data.market_data.current_price.eur} €</li>
<li>${data.market_data.current_price.ils} ₪</li>
</ul>
</div>
`)
        }
    })
}





