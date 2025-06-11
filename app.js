  // this is the base url ;
  const BASE_URL =
    " https://api.exchangerate.host/convert?access_key=2975257d51448f38a6401d80a0805869&from=USD&to=GBP&amount=10;"
    let access_key = "2975257d51448f38a6401d80a0805869";
  let dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");


  // let image = document.querySelector(".select-container img");  // here we cannot use this because it will change the img tag only of one side from side but we have to dynamically change the flag in the from side or to side ;


  for(let select of dropdowns){
    for(currcode in  countryList){
      let newOption = document.createElement("option");
      newOption.innerText = currcode;
      newOption.value = currcode;
      if(select.name==="from"&&currcode==="USD"){
        newOption.selected = "selected";
      }
      else if(select.name==="to"&&currcode==="INR"){
        newOption.selected = "selected";
      }
      select.append(newOption);
    }


    // this is event listner for the event change  any change in the select option will trigger this we are creating flag option10 for this  evt,target passes the the element on which event is triggered 
    // so here element passed will be select option ;

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);                         
    });
  
  }

  // here element is select tag which is passed as event.target while calling  and country will be the value of the tag which is selected ;
  const updateFlag = (element)=>{ 
      let img = element.parentElement.querySelector("img"); 
    let currCode  = element.value;
    let countryName = countryList[currCode];
    let flagurl = `https://flagsapi.com/${countryName}/flat/64.png`;
    img.src = flagurl;
    
    
  };

  const updateExchangeRate = async ()=>{
  let amount = document.querySelector(".amount input");
  let amountval = amount.value;
  if(amountval===""||amountval<0){
    amount.value="1";
  }
   const fromVal = fromCurr.value;
  const toVal = toCurr.value;
  const url = 
  `https://api.exchangerate.host/convert?access_key=2975257d51448f38a6401d80a0805869&from=${fromVal}&to=${toVal}&amount=${amountval}`;
    
    try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== undefined && typeof data.result === "number") {
      let convertedAmount = data.result.toFixed(2);
      msg.innerText = `${amountval} ${fromVal} = ${convertedAmount} ${toVal}`;
      console.log("The amount of currency from",fromVal,"to ",toVal , " for the amount ",amountval," is ",convertedAmount);
    } else {
      msg.innerText = "Failed to fetch conversion.";
      console.error("API error or invalid result:", data);
    }
  } catch (error) {
    msg.innerText = "Something went wrong. Please try again.";
    console.error("Fetch failed:", error);
  }
  };

  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();     // prevent the default thing like reloading the page while submitting on the button 
    updateExchangeRate();
  });

  // after loading the window it will automatically call the function upadate exchange rate ;
  // 
  window.addEventListener("load",()=>{
    updateExchangeRate();                  
  })




