

window.addEventListener("load", () => {
    
//$("menu").css({"text-align":"left"});
    
    $( "body" ).delegate( "p", "click", function() {
        $(this ).after( "<p>Yoav - Please click me for another paragraph.</p>" );
      });
      $( "body" ).delegate( "p", "mouseover", function() {
        $(this ).after( "<p>Yoav - You are the best in mouseover.</p>" );

      });

//       let header = `<h1><u>Mission 2</u></h1><br/>
//     <div class="menuContainer">
//     <div class="menu">
//     <div class="row">
                   
//         <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"><button type="button" class="btn btn-light home">Home</button></div>
//         <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"><button type="button" class="btn btn-light Live Reports">Live Reports</button></div>
//         <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"><button type="button" class="btn btn-light About">About</button></div>
//         <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"><div class="input-group mb-3"><input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2"><button class="btn btn-outline-secondary Search" type="button" id="button-addon2">Search</button></div>
//           </div>
//     </div>
//     </div>    
// `;

let header = `<h1><u>Mission 2</u></h1><br/>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Mission 2</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active" ><a href="#" style="color: #00FFFF">Home</a></li>
      <li><a href="#" style="color: #00FFFF">Live Report</a></li>
      <li><a href="#" style="color: #00FFFF">About</a></li>
    </ul>
    <form class="navbar-form navbar-left" action="">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search" name="search" style="text-align: left">
      </div>
      <button type="submit" class="btn btn-default">Search</button>
    </form>
  </div>
 
</nav>

<div class="container">
  <h3>Navbar Forms</h3>
  
  <div id="divContent">helloDIV</div>
</div>
`;

// <input type="text" class="form-control" placeholder="Search" style="margin-right:0px" ></input></div>
//<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"> <button type="button" class="btn btn-outline-success">Search</button></div>
      
     $(header).appendTo("body");

     $(".btn-default").on('click',async function () {
        debugger;
        
        let searchCoin="";
        searchCoin =$("input").val();
        
        alert(`searching for ${searchCoin}`);
        $('input.form-control').val(searchCoin);
       
     });
     $(".btn-default").on('mouseenter',async function () {
      $(this).css({"background-color": "blue", "color": "white"});
     });
     $(".btn-default").on('mouseleave',async function () {
      $(this).css({"background-color": "white", "color": "green", "border":"2px solid #4CAF50"});
     });
    
     $(".active:contains('Home')").on('click',async function () {
      //debugger;
      
      // let searchCoin="";
      // searchCoin =$("input").val();
      // $("input").value=searchCoin;
      //alert(`searching for Home`); 
      //coinsList();  

        });
        $(".active").on('mouseover',async function () {
          $(this).css({"background-color": "white", "color": "white", "border":"2px solid #4CAF50"});
          
            });
            $(".active").on('mouseleave',async function () {
              $(this).css({"background-color": "white", "color": "green", "border":"0px solid #4CAF50"});
              
             });
      
        $(".active:contains('Live Report')").on('click',async function () {
         
          alert(`searching for Live Report`);     
            });
            $(".active:contains('Live Report')").on('mouseenter',async function () {
              $(this).css({"background-color": "blue", "color": "white"});
              alert(`searching for Live Report`); 
                });
                $(".active:contains('Live Report')").on('mouseleave',async function () {
                  $(this).css({"background-color": "white", "color": "green", "border":"2px solid #4CAF50"});
                  alert(`searching for Live Report`); 
                 });

        $("a:contains('About')").on('click',async function () {
              //debugger;
              
              // let searchCoin="";
              // searchCoin =$("input").val();
              // $("input").value=searchCoin;
              alert(`searching for About`);     
             });

         $("a:contains('Live Report')").on('click',async function () {
              //debugger;
              
              // let searchCoin="";
              // searchCoin =$("input").val();
              // $("input").value=searchCoin;
              alert(`searching for Live Report`);     
            });
          
          $(".navbar-brand:contains('Mission 2')").on('click',async function () {
              //debugger;
              
              // let searchCoin="";
              // searchCoin =$("input").val();
              // $("input").value=searchCoin;
              alert(`searching for Mission 2`);     
           });
          
          

           $(function coinsList() {

            $(".active:contains('Home')").on('mouseover click',async function () {
              // debugger;
               //alert(`click`);
                try {
                   let  url= "https://api.coingecko.com/api/v3/coins/";
                   
                    const allCoins = await getDataAsync(url);
        
                    let contentHTML1 =`
              <tr>
                  <th>select</th>
                  <th>id</th>
                  <th>symbol</th>
                  <th>more info</th>
                  <th>coin picture</th>
                  <th>coin prices</th>
                  
        
              </tr>
          `;
          let id=1;
          let toggleSwitch=`
                 <label class='switch'>
                    <input type="checkbox">
                   <span class="slider round"></span>
                 </label>
          `
           let moreInfoButton=""//`<button type="button" class="btn btn-primary" id="btc">More Info</button>`     
          
          for (let i=0;i<allCoins.length;i++) {
            // let curr = $(allCountries[i].currencies).map(function(){
            //     return this.name;
            //   }).get().join(", ");
            let coinSymbol=allCoins[i].symbol;
            let coinId=allCoins[i].id;
            moreInfoButton=`<button id="${coinSymbol}" type="button" class="btn btn-primary" onCLick="coinsListMoreInfo(getElementById('${coinSymbol}'))">More Info</button>`
              contentHTML1 += `<div class="${coinId} "
              <tr>
              <td>${toggleSwitch}</td>
              <td>${allCoins[i].id}</td>
              <td>${allCoins[i].symbol}</td>
              <td>${moreInfoButton}</td>
              <td>${allCoins[i].id}</td>
              <td>${allCoins[i].id}</td>
              </tr></div>`
            
          }
                       $("#divContent").html("");
                       //$(`<table id='newCountry'>${contentHTML1}</table><br/>`).appendTo("#countriesList");
                       $("#divContent").html(`<table id='coinsList'>${contentHTML1}</table><br/>`);
                  }
                
                catch (err) {
                    alert("Error: " + err.status);
                }
            });
          
            function getDataAsync(url) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: url,
                        success: data => resolve(data),
                        reject: err => reject(err)
                    });
                });
            }
          
          });
          function coinsListMoreInfo(obj){
            alert(`more info`);
          }
          $(".active:contains('More')").on('mouseover click',async function () {
alert(`More Info`);
          });

          $(function coinsListMoreInfo(obj) {
              let coinId=obj.id;
              alert(`more info`);
            $(".btn:contains('More Info')").on('mouseover click',async function () {
              alert(`more info`);
              // debugger;
               //alert(`click`);
               let coinID=this.id;
                try {
                   let  url= `https://api.coingecko.com/api/v3/coins/${coinID}`;
                   
                    const allCoins = await getDataAsync(url);
        
                   ;
          let moreInfoButton="";
          let imageThumb = "";
          for (let i=0;i<allCoins.length;i++) {
            if(allCoins[i].id===coinID){imageThumb=allCoins[i].thumb;}
            // let curr = $(allCountries[i].currencies).map(function(){
            //     return this.name;
            //   }).get().join(", ");
            let coinSymbol=allCoins[i].symbol;
            let coinId=allCoins[i].id;
            moreInfoButton=`<button id="${coinSymbol} type="button" class="btn btn-primary" ">More Info</button>`
              contentHTML1 += `<div class="${coinSymbol} "
              <tr>
              <td>${toggleSwitch}</td>
              <td>${allCoins[i].id}</td>
              <td>${allCoins[i].symbol}</td>
              <td>${moreInfoButton}</td>
              <td><img src="${imageThumb}" width="30%" height="auto"/></td>
              <td>${allCoins[i].id}</td>
              </tr></div>`
            
          }
                       $("#divContent").html("");
                       //$(`<table id='newCountry'>${contentHTML1}</table><br/>`).appendTo("#countriesList");
                       $("#divContent").html(`<table id='coinsList'>${contentHTML1}</table><br/>`);
                  }
                
                catch (err) {
                    alert("Error: " + err.status);
                }
            });
          
            function getDataAsync(url) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: url,
                        success: data => resolve(data),
                        reject: err => reject(err)
                    });
                });
            }
          
          });



     });

     

const creatCoinCard=function(singleCoin){
  const $card=$(`<div class="col"
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
  $card.find("input[type=checkbox]").on("click",countChecked);

  $card.find('a.moreInfo').on("click",function(){
    console.log(singleCoin.id);
    moreCoinInfo(singleCoin.id);
  });
  $('ul').append($card);

}
  



//   $(function allCountriesFilter() {

//     $("#buttontt10").on('click',async function () {
//        debugger;
//        let countryName=$("#inputCountry1").val();
//         try {
//            let  url= `https://restcountries.eu/rest/v2/name/${countryName}`;
           
//             const allCountries = await getDataAsync(url);
//             let contentHTML1 =`
//       <tr>
//           <th>Name</th>
//           <th>Top level domain</th>
//           <th>Capital</th>
//           <th>Currencies</th>
//           <th>Flag</th>
//           <th>Borders</th>

//       </tr>
//   `;
  
//   for (let i=0;i<allCountries.length;i++) {
//     let curr = $(allCountries[i].currencies).map(function(){
//         return this.name;
//       }).get().join(", ");
//       contentHTML1 += `
//       <tr><td>${allCountries[i].name}</td>
//       <td>${allCountries[i].topLevelDomain}</td>
//       <td>${allCountries[i].capital.length!==0?allCountries[i].capital:'No capital'}</td>
//       <td>${curr}</td>
//       <td><img src="${allCountries[i].flag}" width="50" height="50"/>
//       <td>${allCountries[i].borders.length!==0?allCountries[i].borders:'No borders'}</td>
//       </td></tr>`
//   }
//                $("#countriesList").html("");
//                $(`<table id='newCountry'>${contentHTML1}</table><br/>`).appendTo("#countriesList");
//                $("#ajaxResultsDiv").html(`<table id='newCountry'>${contentHTML1}</table><br/>`);
//           }
        
//         catch (err) {
//             alert("Error: " + err.status);
//         }
//     });
  
//     function getDataAsync(url) {
//         return new Promise((resolve, reject) => {
//             $.ajax({
//                 url: url,
//                 success: data => resolve(data),
//                 reject: err => reject(err)
//             });
//         });
//     }
  
//   });




// function allOfMyLove() {
//     let lyrics=`<h1>All My Love<h1><br/>
//     <h3>Led Zeppelin</h3><br/>
//     <iframe width="790" height="444" src="https://www.youtube.com/embed/cdERUjC0rYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>
//     <g-expandable-content jsname="WbKHeb" jscontroller="Ah7cLd" jsaction=";rcuQ6b:npT2md" jsshadow="" aria-hidden="false" data-eb="0" data-mt="0" data-quie="" style="transition: none 0s ease 0s;"><span jsname="zXitYb" jsslot=""><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Should I fall out of love, my fire in the light</span><br><span jsname="YS01Ge">To chase a feather in the wind</span><br><span jsname="YS01Ge">Within the glow that weaves a cloak of delight</span><br><span jsname="YS01Ge">There moves a thread that has no end</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">For many hours and days that pass ever soon</span><br><span jsname="YS01Ge">The tides have caused the flame to dim</span><br><span jsname="YS01Ge">At last the arm is straight, the hand to the loom</span><br><span jsname="YS01Ge">Is this to end or just begin?</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love</span><br><span jsname="YS01Ge">All of my love to you, oh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, oh</span><br><span jsname="YS01Ge">All of my love to you</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">The cup is raised, the toast is made yet again</span><br><span jsname="YS01Ge">One voice is clear above the din</span><br><span jsname="YS01Ge">Proud Arianne one word, my will to sustain</span><br><span jsname="YS01Ge">For me, the cloth once more to spin, oh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, oh</span><br><span jsname="YS01Ge">All of my love to you</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, yes</span><br><span jsname="YS01Ge">All of my love to you </span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Yours is the cloth, mine is the hand that sews time</span><br><span jsname="YS01Ge">His is the force that lies within</span><br><span jsname="YS01Ge">Ours is the fire, all the warmth we can find</span><br><span jsname="YS01Ge">He is a feather in the wind, oh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, oh</span><br><span jsname="YS01Ge">All of my love to you</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, ooh yes, all of my love to you now</span><br><span jsname="YS01Ge">All of my love, all of my love</span><br><span jsname="YS01Ge">All of my love, love, sometimes, sometimes</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Sometimes, sometimes, oh love</span><br><span jsname="YS01Ge">Hey, hey, hey</span><br><span jsname="YS01Ge">Hey, hey, hey</span><br><span jsname="YS01Ge">Ooh yeah, it's all my love</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, to you now</span></div><div jsname="U8S5sf" class="ujudUb WRZytc"><span jsname="YS01Ge">All of my love, all of my love</span><br><span jsname="YS01Ge">all of my love to, to you, you, you, yeah</span><br><span jsname="YS01Ge">I get a little bit lonely</span></div></span></g-expandable-content>
//     `
//  return lyrics;   
// }
// function blackDog() {
//     let lyrics=`
//     <iframe width="790" height="593" src="https://www.youtube.com/embed/jL2CVek1ZS0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>
//     <div><div class="kp-header" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ3z4oAHoECAkQAQ"><div><h2 class="Uo8X3b OhScic zsYMMe"></h2></div><div class="kp-hc"><div class="Hhmu2e wDYxhc NFQFxe viOShc LKPcQc" data-md="16" style="clear:none" data-hveid="CAoQAA" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQhygwAHoECAoQAA"><div class="Ftghae iirjIb"><div class="SPZz6b"><h2 class="qrShPb kno-ecr-pt PZPZlf mfMhoc" data-local-attribute="d3bn" data-attrid="title" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ3B0oADAAegQIChAB"><span>Black Dog</span></h2><div class="wwUB2c PZPZlf" data-attrid="subtitle"><span data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ2kooATAAegQIChAC"><a href="/search?rlz=1C1CHZN_enIL947IL947&amp;sxsrf=ALeKk02aeNURrfPwuR_bqRrEqiyksmrNxQ:1626442188366&amp;q=Led+Zeppelin&amp;stick=H4sIAAAAAAAAAONgVuLQz9U3MMk2MF3EyuOTmqIQlVpQkJqTmQcARJWgyxsAAAA&amp;sa=X&amp;ved=2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQMTAAegQIChAD" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQMTAAegQIChAD">Led Zeppelin</a></span></div></div></div></div><i class="GdltXd" jscontroller="yMbBpb" style="display:none" jsaction="rcuQ6b:npT2md"></i></div></div><div class="SALvLe farUxc mJ2Mod"><div class="i4J0ge"><div class="siXlze yp1CPe wDYxhc NFQFxe" data-attrid="kc:/music/recording_cluster:lyrics" data-md="113" style="clear:none"><div data-hveid="CAsQAA" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQsEwwAXoECAsQAA"><div class="uHNKed"><div class="Oh5wg"><div class="PZPZlf" data-lyricid="Musixmatch91937"><div jsname="Vinbg" class="bbVIQb"><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Hey hey mama said the way you move</span><br><span jsname="YS01Ge">Gonna make you sweat, gonna make you groove</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Ah, ah, child, way you shake that thing</span><br><span jsname="YS01Ge">Gonna make you burn, gonna make you sting.</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Hey hey baby when you walk that way</span><br><span jsname="YS01Ge">Watch your honey drip, can't keep away</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Oh yeah, oh yeah, oh, ah, ah</span><br><span jsname="YS01Ge">Oh yeah, oh yeah, oh, ah, ah.</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">I gotta roll, can't stand still</span><br><span jsname="YS01Ge">Got a flamin' heart, can't get my fill</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Eyes that shine, burnin' red</span><br><span jsname="YS01Ge">Dreams of you all through my head</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Ah ah, ah ah, ah ah, ah ah, ah ah, ah ah, ahhh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Hey, baby, whoa baby, pretty baby</span><br><span jsname="YS01Ge">Darlin' makes 'em do me now</span><br><span jsname="YS01Ge">Hey, baby, oh baby, pretty baby</span><br><span jsname="YS01Ge">Move me like you're doin' now</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Didn't take too long 'fore I found out</span><br><span jsname="YS01Ge">What people mean by down and out</span></div><div jsname="U8S5sf" class="ujudUb WRZytc OULBYb"><span jsname="YS01Ge">Spent my money, took my car</span><br><span jsname="YS01Ge">Started tellin' her friends she gonna be a</span><span>… </span></div></div><div jsname="WbKHeb" class="bbVIQb"><div jsname="U8S5sf" class="ujudUb u7wWjf" data-mh="-1"><span jsname="YS01Ge">Spent my money, took my car</span><br><span jsname="YS01Ge">Started tellin' her friends she gonna be a star</span></div><div jsname="U8S5sf" class="ujudUb WRZytc xpdxpnd" data-mh="220" data-mhc="1" style="max-height: 220px;"><span jsname="YS01Ge">I don't know, but I been told</span><br><span jsname="YS01Ge">A big-legged woman ain't got no soul</span><br><span jsname="YS01Ge">Oh yeah, oh yeah, ah, ah, ah</span><br><span jsname="YS01Ge">Oh yeah, oh yeah, ah, ah, ah</span><br><span jsname="YS01Ge">All I ask for when I pray</span><br><span jsname="YS01Ge">A steady rollin' woman won't come my way</span><br><span jsname="YS01Ge">Need a woman gonna hold my hand</span><br><span jsname="YS01Ge">Tell me no lies, make me a happy man</span><br><span jsname="YS01Ge">Ah ah, ah ah, ah ah, ah ah, ah ah, ah ah, ahhh.</span><br><span jsname="YS01Ge">Ah, yeah!</span></div></div></div><div class="j04ED">Source:&nbsp;<a href="https://www.musixmatch.com/" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ5s4FKAAwAXoECAsQAQ" ping="/url?sa=t&amp;source=web&amp;rct=j&amp;url=https://www.musixmatch.com/&amp;ved=2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ5s4FKAAwAXoECAsQAQ">Musixmatch</a></div><div class="xpdxpnd PZPZlf" data-lyricid="Musixmatch91937" data-mh="58" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQycMBKAEwAXoECAsQAg" data-mhc="1" style="max-height: 58px;"><div class="auw0zb">Songwriters: Plant R A / Page James Patrick / Baldwin John</div><div class="auw0zb">Black Dog lyrics © Mushroom Music Pty. Ltd., Flames Of Albion Music, Inc.</div></div></div></div></div></div></div></div></div>
//     `
//     return lyrics;
    
// }


$(function chuckJoke() {

    $("#button2").on('mouseover click',async function () {
        try {
           let  url= "https://api.chucknorris.io/jokes/random";
           
            const joke = await getDataAsync(url);
            $(`<div id='neWjoke'>${joke.value}</div><br/>`).appendTo("#joke");
            $("#ajaxResultsDiv").html(`<div id='neWjoke'>${joke.value}</div><br/>`);
        }
        catch (err) {
            alert("Error: " + err.status);
        }
    });
  
    function getDataAsync(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                success: data => resolve(data),
                reject: err => reject(err)
            });
        });
    }
  
  });

//   $(function usersList() {

//     $("#buttontt8").on('mouseover click',async function () {
//        debugger;
//         try {
//            let  url= "https://reqres.in/api/users";
           
//             const users5 = await getDataAsync(url);
//             let contentHTML1 =`
//       <tr>
//           <th>first name</th>
//           <th>last name</th>
//           <th>email</th>
//           <th>avatar </th>
//       </tr>
//   `;
  
//   for (let i=0;i<users5.data.length;i++) {
//       contentHTML1 += `
//       <tr><td>${users5.data[i].first_name}</td>
//       <td>${users5.data[i].last_name}</td>
//       <td>${users5.data[i].email}</td>
//       <td><img src="${users5.data[i].avatar}"/>
//       </td></tr>`
//   }
//                $("#usersList").html("");
//                $(`<table id='newUser'>${contentHTML1}</table><br/>`).appendTo("#usersList");
//                $("#ajaxResultsDiv").html(`<table id='newUser'>${contentHTML1}</table><br/>`);
//           }
        
//         catch (err) {
//             alert("Error: " + err.status);
//         }
//     });
  
//     function getDataAsync(url) {
//         return new Promise((resolve, reject) => {
//             $.ajax({
//                 url: url,
//                 success: data => resolve(data),
//                 reject: err => reject(err)
//             });
//         });
//     }
  
//   });

  