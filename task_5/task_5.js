const wsUrl = 'wss://ws.ifelse.io';

function pageLoaded() {
    const btnCoord = document.querySelector('.btn-coord');
    const btnSend = document.querySelector('.btn-send');
    const inputTextField = document.querySelector('input');
    const outputMesage = document.querySelector('.msg-block');

    let websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
        writeMessage("Соединение установлено. Привет!", true);
    }

    let i = 0; // не выводим ответ
    websocket.onmessage = (event) => {
        if (i) writeMessage(event.data, true); 
        i++; 
    }

    websocket.onerror = () => {
        writeMessage("При передаче данных произошла ошибка!", true);
    }

    btnSend.addEventListener('click', () => {
        if (!inputTextField.value) return;
        websocket.send(inputTextField.value);
        writeMessage(inputTextField.value, false);
        inputTextField.value = "";
    })

    function writeMessage(message, flag) {
        let messageText = `<p class="${flag ? "outputMessage" : "inputMessage"}"> ${message} </p>`;
        outputMesage.innerHTML += messageText;
    }

    btnCoord.addEventListener('click', () => {
        const error = () => {
            writeMessage('Информация о местоположении недоступна', false);
        }
        const success = (position) => {
            const {coords} = position;
            const link = `<a href="https://www.openstreetmap.org/#map=12/${coords.latitude}/${coords.longitude}" target="_blank">Вы находитесь здесь</a>`;
            writeMessage(link, false);
            i=0;// не выводим ответ
            websocket.send(link);
        }

        if (!navigator.geolocation) {
            writeMessage('Браузер не поддерживает геолокацию', false);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })
}

document.addEventListener("DOMContentLoaded", pageLoaded);
