const commentButton = document.querySelector('#add-comment-button');

function openInstallPrompt(event) {
    if (defferedPrompt){
        defferedPrompt.prompt();

        defferedPrompt.userChoice.then(choiceResult => {
            console.log(choiceResult.outcome);

            if (choiceResult.outcome === 'dismissed') {
                console.log('user cancelled installation');
            } else {
                console.log('Added to home screen');
            }
        });

        defferedPrompt = null;
    }
}
commentButton.addEventListener('click', openInstallPrompt);