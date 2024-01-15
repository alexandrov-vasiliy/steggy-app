const form = document.getElementById('form')


const stateHide = new StateHide()
const stateReveal = new StateReveal()

const stateMachine = new StateMachine(stateHide);


const imageDropper = new ImageDrop('imageDropArea', 'preview')
const fileDropper = new FileDrop('fileDropArea')

const tabs = document.querySelectorAll('.tab')

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {

        const index = tab.dataset.index
        switchTab(index)
        console.log('tab-click', index);
    })
})
function switchTab(tabIndex) {
    tabs.forEach((tab) => {
        if (tab.dataset.index === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // You can customize the content based on the selected tab
    console.log(stateMachine);
    if (parseInt(tabIndex) === 0) {
        stateMachine.transitionTo(stateHide)
    } else if (parseInt(tabIndex)  === 1) {
        stateMachine.transitionTo(stateReveal)
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    try {

        stateMachine.handle()
    } catch (e) {
        console.error(e);
    } finally {
        imageDropper.clear()
        fileDropper.clear()
    }


})


window.electronAPI.onErrorCaptured((error) => {
    document.getElementById('error').innerText = error
})
