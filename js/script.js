//參考JS資料
//https://ithelp.ithome.com.tw/articles/10213237
//https://codepen.io/myxgpxat/pen/zXwQwW

//地區選單
const areaList = document.querySelector(".areaList");
//熱門景點BTN
const hotBtn = document.querySelectorAll(".hotBtn button");
//地區標題
const areaTitle = document.querySelector(".areaTitle");
//地區景點內容
const areaContent = document.querySelector(".areaContent");

//宣告一個空物件，等下存放用 AJAX 抓下來的資料
let allData = [];
//從六角學院提供的高雄市旅遊資訊抓 JSON 物件下來，使用 ES6 的 fetch
//參考資料：https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch
fetch(
  "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
)
  //確保已經讀到資料後才繼續往下執行下面的 .then
  .then((res) => res.json())
  .then((data) => {
    //將資料存放在剛剛宣告的空物件中
    allData = data.result.records;
    //抓到資料後執行以下 function
    addAreaMenu();
    changeTitleFn();
    changeAreaFn();
    allArea();
    //成功抓到資料後在 console 內顯示訊息（非必要）
    return console.log("success");
  })
  //如果抓資料失敗則在 console 內顯示失敗訊息
  .catch((err) => console.log(err));

//抓出下拉選單Area
function addAreaMenu() {
  //建立一個空的物件，用來當作鄉鎮區的選單
  let allArea = [];
  //依照物件長度用迴圈來建立選單
  for (let i = 0; i < allData.length; i++) {
    //依照抓下來的物件的 Zone （高雄市境內的鄉鎮區）來建立選單選項
    allArea.push(allData[i].Zone);
  }
  //避免 Zone 物件的選項重複（一個鄉鎮區只會在選單內顯示一次）（ES6 語法）
  //參考資料：https://juejin.cn/post/6844903951909781517
  let noRepeatAllArea = Array.from(new Set(allArea));
  //預先建立一個選單選項放在選單上，提升使用者體驗
  let str = `<option selected> - 請選擇一個區域 - </option>`;
  //利用迴圈在重複的鄉鎮區內抓出一個
  for (let i = 0; i < noRepeatAllArea.length; i++) {
    //產生選單選項並賦予 areaListItem 類別
    str += `<option class="areaListItem" value="${noRepeatAllArea[i]}">${noRepeatAllArea[i]}</option>`;
  }
  //利用 DOM 將結果送給 HTML 鄉鎮區選單，以產生完整，選項不重複的選單
  document.querySelector(".areaList").innerHTML = str;
}

//Area標題變更
//因 areaListItem 使用 js 渲染後的 HTML 選取樣式，所以用一函式包在上方 AJAX 裡
function changeTitleFn() {
  //選擇所有選單內的選項並賦予在一個 const 變數上
  const areaListItem = document.querySelectorAll(".areaList option[value]");
  //當選單選項被改變時觸發 changeTitle 函數
  areaList.addEventListener("change", changeTitle);
  //監聽函數事件
  function changeTitle(e) {
    //宣告一個 let 函數 select，賦予它使用者選擇的選單選項
    let select = e.target.value;
    //宣告一個空字串，等下用來存放使用者選擇的選單選項
    let str = "";
    //用迴圈來抓出所有選項的數量
    for (let i = 0; i < areaListItem.length; i++) {
      if (select == areaListItem[i].value) {
        //當抓出來的選單選項與使用者選擇的選項數值相同時，也將其數值賦予給 str
        str = areaListItem[i].value;
      }
    }
    //將 areaTitle 上顯示的字變成使用者選擇的選單選項名稱
    areaTitle.textContent = str;
  }
}

//點擊熱區 Area 標題變更
//取出熱門景點按鈕的數量
for (let i = 0; i < hotBtn.length; i++) {
  //宣告一個變數 select 並賦予它按鈕上的 value
  //this 參考資料：
  //https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/this
  let select = this.value;
  //宣告一個空字串，等下用來存放使用者選擇的按鈕 value
  let str = "";
  //當熱門景點按鈕被按下時，觸發函數，將按鈕上的 value 賦予在 str 上
  hotBtn[i].addEventListener("click", function () {
    if ((select = hotBtn[i].value)) {
      str = select;
    }
    //將 areaTitle 上顯示的字變成使用者選擇的按鈕 value
    areaTitle.textContent = str;
  });
}

//Area 景點變更
function changeAreaFn() {
  //在選單上綁事件監聽，當選單內容改變時，觸發 changeArea 函數
  areaList.addEventListener("change", changeArea);
  for (let i = 0; i < hotBtn.length; i++) {
    //在熱門景點按鈕上綁事件監聽，當使用者點擊熱門景點按鈕時，觸發 changeArea 函數
    hotBtn[i].addEventListener("click", changeArea);
  }
  //這是當選單內容被改變，或是使用者點擊熱門景點按鈕時會觸發的函數，抓此函數的相關事件
  function changeArea(e) {
    //宣告一個 let 函數 select，賦予它使用者選擇的選單選項
    let select = e.target.value;
    //宣告一個空字串，等下用來存放組好的 DOM 元素
    let str = "";
    //取出利用 AJAX 抓下來的所有資料
    for (let i = 0; i < allData.length; i++) {
      if (select == allData[i].Zone) {
        //將組好的 DOM 元素與抓出來的資料賦予在空字串變數 str 上
        //模板字符參考資料：
        //https://pjchender.blogspot.com/2017/01/javascript-es6-template-literalstagged.html
        str += `
<div class="col-12 col-sm-6 col-lg-4 mb-3">
  <div class="card-place rounded">
    <div class="p-3 pt-5 d-flex justify-content-between align-items-end bg-place" style="background-image:url(${
      allData[i].Picture1
    })">
      <p class="m-0 mt-4 text-light text-shadow">${allData[i].Name}</p>
      <span class="badge badge-pill badge-danger">${allData[i].Zone}</span>
    </div>
    <div class="text-small p-3 text-dark">
      <p class="m-0 pb-2"><i class="fas fa-clock"></i> ${
        allData[i].Opentime
      }</p>
      <p class="m-0 pb-2"><i class="fas fa-home"></i> ${allData[i].Add}</p>
      <p class="m-0"><i class="fas fa-phone-alt"></i> ${allData[i].Tel}</p>
    </div>
    ${allData
      //如果某個景點是免費參觀的話，那就賦予它一個免費參觀的 tag
      .map(() => {
        if (allData[i].Ticketinfo == "免費參觀") {
          return `<div class="bagde-free text-info text-center"><i class="fas fa-tags"></i>免費</div>`;
        }
      })
      .join("")}
  </div>
</div>
`;
      }
    }
    //將組裝好的景點卡片 DOM 到有 areaContent 的 Class 的元素上
    areaContent.innerHTML = str;
  }
}
//Area景點初始(列出全部景點)
function allArea() {
  //宣告一個空字串，等下用來存放組好的 DOM 元素
  let str = "";
  //取出利用 AJAX 抓下來的所有資料
  for (let i = 0; i < allData.length; i++) {
    //將組好的 DOM 元素與抓出來的資料賦予在空字串變數 str 上
    //模板字符參考資料：
    //https://pjchender.blogspot.com/2017/01/javascript-es6-template-literalstagged.html
    str += `
<div class="col-12 col-sm-6 col-lg-4 mb-3">
  <div class="card-place rounded">
    <div class="p-3 pt-5 d-flex justify-content-between align-items-end bg-place" style="background-image:url(${
      allData[i].Picture1
    })">
      <p class="m-0 mt-4 text-light text-shadow">${allData[i].Name}</p>
      <span class="badge badge-pill badge-danger">${allData[i].Zone}</span>
    </div>
    <div class="text-small p-3 text-dark">
      <p class="m-0 pb-2"><i class="fas fa-clock"></i> ${
        allData[i].Opentime
      }</p>
      <p class="m-0 pb-2"><i class="fas fa-home"></i> ${allData[i].Add}</p>
      <p class="m-0"><i class="fas fa-phone-alt"></i> ${allData[i].Tel}</p>
    </div>
    ${allData
      //如果某個景點是免費參觀的話，那就賦予它一個免費參觀的 tag
      .map(() => {
        if (allData[i].Ticketinfo == "免費參觀") {
          return `<div class="bagde-free text-info text-center"><i class="fas fa-tags"></i>免費</div>`;
        }
      })
      .join("")}
  </div>
</div>
`;
  }
  //將組裝好的所有景點卡片 DOM 到有 areaContent 的 Class 的元素上
  areaContent.innerHTML = str;
}
