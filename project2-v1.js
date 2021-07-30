
$(function () {


 loadCoins();
  $(".btn-outline-success").on('click', async function () {

    let searchCoin = "";
    searchCoin = $("input").val();

    alert(`searching for ${searchCoin}`);
    $('input.form-control').val(searchCoin);

  });
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

  $(".active:contains('Live Report')").on('click', async function () {

    alert(`searching for Live Report`);
  });
  $(".active:contains('Live Report')").on('mouseenter', async function () {
    $(this).css({ "background-color": "blue", "color": "white" });
    alert(`searching for Live Report`);
  });
  $(".active:contains('Live Report')").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "2px solid #4CAF50" });
    alert(`searching for Live Report`);
  });

  $("a:contains('About')").on('click', async function () {
    alert(`searching for About`);
  });

  $("a:contains('Live Report')").on('click', async function () {
    alert(`searching for Live Report`);
  });

  $(".navbar-brand:contains('Mission 2')").on('click', async function () {
    alert(`searching for Mission 2`);
  });




  function coinsListMoreInfo(obj) {
  }
  $(".moreInfo").on('click', async function () {
    alert(`More Info`);
  });

  $(function coinsListMoreInfo(obj) {
    let coinId = obj.id;
    $(".btn:contains('More Info')").on('mouseover click', async function () {
      alert(`more info`);
      let coinID = this.id;
      try {
        let url = `https://api.coingecko.com/api/v3/coins/${coinID}`;

        const allCoins = await getDataAsync(url);

        ;
        let moreInfoButton = "";
        let imageThumb = "";
        for (let i = 0; i < allCoins.length; i++) {
          if (allCoins[i].id === coinID) { imageThumb = allCoins[i].thumb; }
          let curr = $(allCoins[i].market_data.current_price).map(function () {
            return this.name;
          }).get().join(", ");
          let coinSymbol = allCoins[i].symbol;
          let coinId = allCoins[i].id;
          moreInfoButton = `<button id="${coinSymbol} type="button" class="btn btn-primary" ">More Info</button>`
          contentHTML1 += `<div class="${coinSymbol} "
                <img src="${imageThumb}" width="30%" height="auto"/>
                 <br/> ${curr}
                  </div>`
        }
        alert(`${contentHTML1}`);
      }

      catch (err) {
        alert("Error: " + err.status);
      }
    });


  });



});



const creatCoinCard = function (singleCoin) {
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

async function loadCoins() {


  try {
    let url = "https://api.coingecko.com/api/v3/coins/";
    const allCoins = await getDataAsync(url);

    let id = 1;
    let toggleSwitch = `
       <label class='switch'>
          <input type="checkbox">
         <span class="slider round"></span>
       </label>
`
    $('#coin-list').empty();
    allCoins.forEach(coin => {
      $('#coin-list').append(createCoinCard(coin));
    })

  }

  catch (err) {
    alert("Error: " + err.message);
  }
}

function getDataAsync(url) {
  return $.get(url);
}


function createCoinCard(singleCoin) {
  const $coin = $(`<div class="col">
  <div class="card" style="width: 19rem; height:19rem;margin:15px; border: 1px solid black; text-align:center">
    <div class="card-body" style="justify-content:center">
      <h5 class="card-title">${singleCoin.symbol}</h5>
        <div class ="form-check form-switch"> 
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
         </div>
         <p class="card-text">${singleCoin.name}</p>
         <button class="toggle-more-info btn btn-primary majorpoints">More Info</button>
         <div class="more-info" style="display: none; width: 17rem; height:8rem;margin:2px; border: 1px solid black; overflow:auto" >hey</div>
    </div>
  </div>
</div>`);

  $coin.find("input[type=checkbox]").on("click", console.log);
  let isMoreInfoOpen = false;
  $coin.find('.toggle-more-info').on("click", async function () {
    if (!isMoreInfoOpen) {
      let url = `https://api.coingecko.com/api/v3/coins/${singleCoin.id}`;
      const coinMoreInfo=await getDataAsync(url);
      
      //const moreInfo = await getDataAsync(url);
      const moreInfo={id: coinMoreInfo.id,
                      img: coinMoreInfo.image.thumb,
                      eur:coinMoreInfo.market_data.current_price.eur,
                      usd:coinMoreInfo.market_data.current_price.usd,
                      ils:coinMoreInfo.market_data.current_price.ils
                      }
      const coinToStorage=JSON.stringify(moreInfo);
      sessionStorage.setItem(`${coinMoreInfo.name}`,coinToStorage);
      console.log(`saved ${coinMoreInfo.name} to session storage`);
      console.log(`coin id: ${coinMoreInfo.id}`);
      const moreInfoHtml = $(`<img src="${coinMoreInfo.image.thumb}"/></br>
                             Current market data prices:     `);
      // $coin.find('.more-info').text(JSON.stringify(moreInfo));
      $coin.find('.more-info').html(moreInfoHtml);
    }
    isMoreInfoOpen = !isMoreInfoOpen;
    $coin.find('.more-info').slideToggle();
  });

  return $coin;

}

