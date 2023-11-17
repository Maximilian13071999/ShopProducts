let tg = window.Telegram.WebApp
tg.expand()

let btnCarrot = document.querySelector("#btnCarrot")
let btnPotato = document.querySelector("#btnPotato")
let btnOnion = document.querySelector("#btnOnion")

let username = document.querySelector("#username")
let phone_element = document.querySelector("#phone")

let name = ""
let phone = ""

username.onchange = () => {name = username.value}

let items = {
    carrot: 0,
    potato: 0,
    onion: 0
}

let list = document.querySelector("#card")

function changeItem(itemName, changeItemName, dictName) {
    items[dictName] += 1

    list.innerHTML = ""
    if (name != "") {
        let li = document.createElement("li")
        li.innerHTML = "Ваше имя - " + name
        list.appendChild(li)
    }
    for (let item in items) {
        let li = document.createElement("li")
        li.innerHTML = item + ":" + items[item]
        list.appendChild(li)
    }

    if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
    } else {
        tg.MainButton.setText("Сделать заказ")
        tg.MainButton.show()
    }
}

let btnBuy = document.querySelector("#buy")

btnBuy.onclick = () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
    } else {
        tg.MainButton.setText("Купить!")
        tg.MainButton.show()
    }
}

btnCarrot.onclick = () => {
    changeItem("морковь", "морковку", "carrot")
}

btnPotato.onclick = () => {
    changeItem("картофель", "картошку", "potato")
}

btnOnion.onclick = () => {
    changeItem("лук", "лук", "onion")
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    result = ""
    if (name != "") {
        result += "Ваше имя: " + name + "\n"
    }
    if (phone != "") {
        result += "Ваш телефон: " + phone + "\n"
    }
    result += "Ваш заказ: \n"
    for (let item in items) {
        if (items[item] > 0) {
            result += item + ": " + items[item] + "\n"
        }
    }
    tg.sendData(result)
})