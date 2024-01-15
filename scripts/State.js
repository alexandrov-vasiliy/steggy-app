// Интерфейс состояния
class State {
    btn = document.getElementById('submitButton')
    password = document.getElementById('passwordInput')
    tabContent = document.getElementById('tabContent');

    onTransition() {
    }

    handle() {
    }
}

// Конкретные классы для каждого состояния
class StateHide extends State {
    onTransition() {
        this.btn.innerText = 'Спрятать'
    }

    handle() {
        console.log("Hide", this.password.value);

        window.electronAPI.hideFiles({
            imagePath: imageDropper.imageFile.path,
            filesPath: fileDropper.file.path,
            password: this.password.value
        })

    }
}

class StateReveal extends State {
    onTransition() {
        this.btn.innerText = 'Открыть'
    }

    handle() {
        console.log("Reveal");

        window.electronAPI.revealFile({
            imagePath: imageDropper.imageFile.path, password: this.password
        })
    }
}

// Класс управления состоянием
class StateMachine {
    constructor(initialState) {
        this.currentState = initialState;
    }

    transitionTo(state) {
        console.log('transitionTo', state)
        this.currentState = state;
        this.currentState.onTransition()
    }

    handle() {
        this.currentState.handle();
    }
}
