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
function init(inputData) {
    let str = '';
    inputData.forEach(function (item, index) {
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
    // const list_footer = document.querySelector(".list_footer p");
    const list_footer = document.querySelector(".list_footer p");
    const incompleteItem = data.filter((item) => {
        return item.checked == ''; //回傳數個待完成項目
    })
    //console.log(newData.length)
    list_footer.textContent = `${incompleteItem.length} 個待完成項目`
    //不能直接使用data.length計算，因為待完成項目已完成後，仍然會顯示全部筆數的數量

    // console.log(data, 4)
}
init(data);
// console.log(data, 3)

//在函式的範疇底下，若有和全域變數相同的參數命名，會優先以參數作為被指定的對象，因此建議可以將命名做調整，以避免混用導致對象取用錯誤的狀況產生
//data.filter的 data 並非原始的 data，而是 function init(data) 中的 data 參數，而在後續的 updateList() 邏輯中呼叫了 init(newData)，即newData導入init()函式中，故函式裡所有的data都會變成newData了，因此在已完成的分類底下所放入的是經篩選過後的資料newData，造成永遠顯示0個待完成項目
//所以 data.filter的 data需要與function init(data)的data不同，故參數名稱需改成其他名稱-inputData



//搜尋欄輸入新的待辦事項
const text = document.querySelector('.text');
const add = document.querySelector('.btn_add');

//綁定監聽事件 //點擊事件
add.addEventListener('click', function (e) {
    e.preventDefault(); //取消a連結的預設行為，即停止點擊後會往上滑到底的效果
    //跳出警告視窗，提醒你輸入內容  //可加或不可加，不影響程式碼運作
    if (text.value.trim() == "") { //trim()可避免只輸入空白字元還是可以新增資料
        alert("請輸入內容");
        return;
    }
    addlist()
})

//綁定監聽事件 //鍵盤事件
text.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        if (text.value.trim() == "") { //trim()可避免只輸入空白字元還是可以新增資料
            alert("請輸入內容");
            return;
        }
        addlist()
    }
})

////加入待辦事項的函式
function addlist() {
    let obj = {};
    obj.content = text.value;
    obj.checked = "";
    data.push(obj);
    text.value = ""; //新增資料後，欄位自動空白

    //加入代辦事項後，將頁籤切換回「全部」，讓使用者知道確實有新增成功
    //先將所有的active移除
    document.querySelectorAll(".tab li").forEach(function (item, index) {
        item.classList.remove("active");
    });
    //再把「全部」按鈕加上active（加底線）
    document.querySelectorAll(".allBtn").forEach(function (item, index) {
        newData = data;
        item.classList.add("active");

        init(newData);
    });

}





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
            if (index == id && item.checked == "") { //空值狀態下點擊，將其改為checked狀態
                item.checked = "checked"; 
                console.log(index)
            }

            //若已是checked狀態下點擊，將其改為回空值
            else if (index == id && item.checked == "checked") {
                item.checked = "";
                console.log(index)

            }

           
            // init(newData);
            updateList();
        })
        console.log(data, 5)
        console.log(newData, 6)
            
    }
})



//清除已完成項目
//綁定監聽事件
const clearCompleted = document.querySelector(".list_footer a");
clearCompleted.addEventListener('click', function (e) {
    data = data.filter(function (item) {
        return item.checked == ''; //回傳數個待完成項目，同時會篩選掉已完成項目 item.checked: 'checked'
    })
    // console.log(data, 2)
    // init(newData);
    updateList();
})



//tab切換
const tabAll = document.querySelectorAll('.tab li');
const tab = document.querySelector('.tab');
let tabStatus = 'all';

tab.addEventListener('click', function (e) {
    tabStatus = e.target.dataset.tab; //取得data-tab的值，並傳到外層tabStatus
    // tabStatus =e.target.getAttribute('data-tab')
    tabAll.forEach(function (item) {
        // item.setAttribute('class', '');
        item.classList.remove("active") //點擊tab時，清除所有的tab li的active
    })
    // e.target.setAttribute('class', 'active'); 
    e.target.classList.add("active"); //點擊到該tab li，幫它加上active，即黑底線，//ex 點擊到「待完成」，幫它加active(黑底線)
    //console.log(newData);
    updateList();
    console.log(e.target.dataset.tab)
})
// setAttribute = 新增(編輯)HTML標籤屬性，新增或編輯後會把其他屬性蓋過去，所以不適合用在有多個屬性值的屬性
// classList.add = 新增屬性
// classList.remove = 可只移除其中一個屬性值，適用於有多個屬性值的屬性，如class="active allBtn"


let newData = [];
function updateList() {
    //篩選已完成或未完成項目
    if (tabStatus === 'all') { //點擊「全部」狀態的頁籤，渲染全部項目
        newData = data;
    }
    else if (tabStatus === 'incomplete') { //點擊「待完成」狀態的頁籤，篩選未完成項目
        newData = data.filter(function (item) {
            return item.checked == '';
        })
    }
    else if (tabStatus === 'done') { //點擊「已完成」狀態的頁籤，篩選已完成項目
        newData = data.filter(function (item) {
            return item.checked == 'checked';

        })
    }
    // console.log(newData, 1);
    init(newData);
}