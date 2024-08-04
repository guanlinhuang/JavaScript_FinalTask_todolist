// TodoList: 可新增和刪除待辦事項。
// TodoList: 待辦事項會有狀態（完成與否），可透過 checkbox 來切換。
// TodoList: 待辦清單列表會有『全部』、『完成』、『未完成』Tab 來做篩選切換。
// TodoList: 可以清除全部已完成功能。
// TodoList: 會顯示出待完成的待辦有幾項。

//列表的位置
const list = document.querySelector("ul.list");

//待完成項目
const list_footer = document.querySelector(".list_footer p");

//清除已完成項目按鈕
const listClear = document.querySelector(".list_footer a");

//新增按鈕
const btn_add = document.querySelector(".card.input .btn_add");

//輸入新增代辦事項的input
const save_input = document.querySelector('.card.input input[type="text"]');

//頁籤區塊
const tab = document.querySelector("ul.tab");
//頁籤按鈕
const tabli = document.querySelectorAll("ul.tab li");
//頁籤初始當前模式
let tabsVal = "全部";

//初始資料
var data = [
    {
        idNum: "",
        content: "把冰箱發霉的檸檬拿去丟",
        checked: ""
    },
    {
        idNum: "",
        content: "明天買牛奶",
        checked: ""
    }
    // {
    //   "idNum":"",
    //   "content":"檢查蔬菜有沒有過期",
    //   "checked":"",
    // },
    // {
    //   "content":"明天去超市買果汁",
    //   "checked":"",
    // },
    // {
    //   "idNum":"",
    //   "content":"確認冷凍肉類日期",
    //   "checked":"",
    // },
    // {
    //   "idNum":"",
    //   "content":"改週末洗冰箱內部",
    //   "checked":"",
    // },
    // {
    //   "idNum":"",
    //   "content":"今晚煮熱狗",
    //   "checked":"",
    // },
];

//資料初始化
function renderData(data) {
    let str = "";
    let listNum = 0;

    data.forEach((item, index) => {
        //console.log(item.content);
        str += `<li data-idNum="${index}">
          <label class="checkbox" for="">
            <input type="checkbox" ${item.checked}/>
            <span>${item.content}</span>
          </label>
          <a href="#" class="delete"  data-id="${index}"></a>
        </li>`;

        //listNum++;
    });
    list.innerHTML = str;

    //計算有幾個待完成項目
    listNum = data.filter((item) => {
        return item.checked == "";
    });
    //console.log(listNum.length)
    list_footer.textContent = `${listNum.length} 個待完成項目`;
}
renderData(data);

//console.log(card_add);
//console.log(btn_add);
//console.log(save_input);
//console.log(btn_delete);
//console.log(checkbox);

//新增功能
btn_add.addEventListener("click", function (e) {
    //if(e.target.getAttribute("class") == "btn_add"){
    //console.log("有點到新增按鈕");
    //console.log(e.target.textContent);
    //}
    //console.log(e.target.nodeName);
    if (save_input.value == "") {
        alert("不可為空");
        return;
    }
    let obj = {};
    obj.content = save_input.value;
    obj.checked = "";
    //console.log(obj);

    data.push(obj);
    renderData(data);
    save_input.value = ""; //送出即清空
});

list.addEventListener("click", function (e) {
    let id = e.target.closest("li").getAttribute("data-idNum");
    //console.log(id);

    //刪除功能
    if (e.target.getAttribute("class") == "delete") {
        let num = e.target.getAttribute("data-id");
        //console.log(num);
        data.splice(num, 1); //後面的數字代表刪幾筆
        update();
        //renderData(data);  //不需要
    }

    //狀態功能
    if (e.target.nodeName == "INPUT") {
        //data.forEach((item, index)=>{
        data.forEach((item, index) => {
            if (index == id) {
                //console.log(index);
                if (data[index].checked == "checked") {
                    data[index].checked = "";
                } else {
                    data[index].checked = "checked";
                }
                update();
                //renderData(data);   //不需要
            }
        });
    }
});

//頁籤切換的當前模式按鈕樣式
tabli.forEach((tabItem, tabIndex) => {
    tabItem.addEventListener("click", function (e) {
        // 預設清除所有元素的class
        tabli.forEach((tabItem) => {
            tabItem.classList.remove("active");
        });
        // class附加到被點擊的元素上
        //item.classList.add('active');
        this.classList.add("active");
        tabsVal = this.textContent; //取得被點擊的頁嵌的內容文字
        //console.log(tabsVal)
        update();
    });
});

// 監聽已完成項目_點擊刪除
listClear.addEventListener("click", function (e) {
    newdata = data.filter((item, index) => {
        return item.checked == "";
    });
    data = newdata;
    //renderData(newdata);
    update();
});

function update() {
    let newdata = [];

    //tabItem.textContent
    if (tabsVal == "全部") {
        newdata = data;
    } else if (tabsVal == "待完成") {
        newdata = data.filter((item) => item.checked == "");
    } else if (tabsVal == "已完成") {
        newdata = data.filter((item, index) => {
            return item.checked == "checked";
        });
    }

    renderData(newdata);
}
