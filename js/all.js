// 1. 可新增和刪除待辦事項。
// 2. 待辦事項會有狀態（完成與否），可透過 checkbox 來切換。
// 3. 待辦清單列表會有『全部』、『完成』、『未完成』Tab 來做篩選切換。
// 4. 可以清除全部已完成功能。
// 5. 會顯示出待完成的待辦有幾項。


let data = [
    {
        content: "把冰箱發霉的檸檬拿去丟000",
        checked: "",
    },
    {
        content: "把冰箱發霉的檸檬拿去丟111",
        checked: "",
    }
];



//資料初始化
function init(data) {
    let str = '';
    data.forEach(function (item, index) {
        str +=
            `<li data-id="${index}"><label class="checkbox" for=""><input type="checkbox" ${item.checked} ><span>${item.content}</span></label><a href="#" class="delete"" data-num="${index}"></a></li>`;
    })
    // console.log(str);

    //宣告變數，使其可渲染到網頁
    const list = document.querySelector(".list");
    list.innerHTML = str;
    //innerHTML = 有編譯，不會直接列出標籤，只渲染文字部分，如印出 完成項目
    //textContent = 無編譯，直接渲染文字跟標籤，如印出 <h2>完成項目</h2>


    //計算 N個待完成項目
    const list_footer = document.querySelector(".list_footer p");
    const newData = data.filter((item) => {
        return item.checked == ''; //回傳數個待完成項目
    })
    //console.log(newData.length)
    list_footer.textContent = `${newData.length} 個待完成項目`
    //不能直接使用data.length計算，因為待完成項目已完成後，仍然會顯示全部筆數的數量
}
init(data);



//加入新的待辦事項
const text = document.querySelector('.text');
const add = document.querySelector('.btn_add');

//綁定監聽事件
add.addEventListener('click', function (e) {
    e.preventDefault(); //取消a連結的預設行為，即停止點擊後會往上滑到底的效果
    //跳出警告視窗，提醒你輸入內容  //可加或不可加，不影響程式碼運作
    if (text.value == "") {
        alert("請輸入內容");
        return;
    }

    //加入新的待辦事項
    let obj = {};
    obj.content = text.value;
    obj.checked = "";
    data.push(obj);
    // init(data); 
    updateList() //因為有tab要切換，而增加另一個函式，切換後會有新的初始化，所以以新的初始化代替
    text.value = ""; //新增資料後，欄位自動空白
})



//刪除待辦事項 & checked狀態切換
const list = document.querySelector(".list");
//刪除待辦事項 //綁定監聽事件
list.addEventListener('click', function (e) {
    //一定要加，只有按到按鈕時才會刪除，否則按任何地方(空白處或文字)都會刪除
    if (e.target.getAttribute('class') !== 'delete') {
        return;
    }
    let num = e.target.getAttribute('data-num');
    console.log(num);
    data.splice(num, 1);
    // init(data);
    updateList();
})

//checked狀態切換 //綁定監聽事件
list.addEventListener('click', function (e) {

    let id = e.target.closest('li').getAttribute("data-id")
    //closest（selectors） 方法用於檢索該元素的父節點，或者元素的父級與選擇器匹配。如果未找到祖先，則該方法返回 null 。
    //通常設定為較底層元素用closest()查找，有被父層包住的底層元素，往上查找才找得到，若與該底層元素同一層的元素，則找不到返回null。

    if (e.target.nodeName == "INPUT") { //點擊時，其點擊位置為INPUT，將執行if
        // console.log(e.target.nodeName)
        data.forEach((item, index) => { //取出資料
            if (index == id) { //
                //console.log(index);

                //點擊時，是空值狀態下，將執行if，使其改為checked狀態
                if (data[index].checked == '') {
                    data[index].checked = 'checked'; //如果再點擊一次，將改回空值，若沒加此行code，將改不回空值           
                }

                //若已是checked狀態下，將執行else，使其改為回空值，若沒加此else，將無法改回空值
                else {
                    data[index].checked = '';
                }

                console.log(data)
                // init(data);
                updateList();
            }
        })
    }
})



//清除已完成項目
//綁定監聽事件
const clearCompeted = document.querySelector(".list_footer a");
clearCompeted.addEventListener('click', function (e) {
    data = data.filter(function (item) {
        return item.checked == ''; //回傳數個待完成項目，同時會篩選掉已完成項目 item.checked: 'checked'
    })
    console.log(data)
    // init(data);
    updateList();
})



//tab切換
const tabAll = document.querySelectorAll('.tab li');
const tab = document.querySelector('.tab');
let tabStatus = 'all';

tab.addEventListener('click', function (e) {
    tabStatus = e.target.dataset.tab; //取得data-tab的值，並傳到外層tabStatus
    // tabStatus =e.target.getAttribute('data-tab')
    tabAll.forEach(function (item) { //點擊tab時，清除所有的tab li的active
        item.setAttribute('class', '');
    })
    e.target.setAttribute('class', 'active'); //點擊到該tab li，幫它加上active，即黑底線，//ex 點擊到「待完成」，幫它加active(黑底線)
    //console.log(newData);
    updateList();
})
//setAttribute = 新增(編輯)HTML標籤屬性


let newData = [];
function updateList() {
    //篩選出已完成或未完成項目
    if (tabStatus == 'all') {
        newData = data;
    }
    else if (tabStatus == 'incomplete') {
        newData = data.filter(function (item) {
            return item.checked == '';
        })
    }
    else if (tabStatus == 'done') {
        newData = data.filter(function (item) {
            return item.checked == 'checked';
        })
    }
  
    console.log(newData);
    init(newData);
}