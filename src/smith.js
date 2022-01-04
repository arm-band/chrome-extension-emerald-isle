chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // メッセージとして送信されたクリップボードに貼り付けたいテキストをそのままレスポンスに設定して返却
    if(request.url.toLowerCase().startsWith('https://')) {
        navigator.clipboard.writeText(request.text);
    }
    else {
        const inputID = 'chromeExtension-emeraldIsle-clipText';
        console.log(document.querySelector(`#${inputID}`))
        if(document.querySelector(`#${inputID}`) === null) {
            const $input = document.createElement('input');
            $input.setAttribute('type', 'text');
            $input.setAttribute('id', inputID);
            $input.setAttribute('style', 'position: absolute; left: -100vw; top: 0');
            document.body.appendChild($input);
        }
        const $inputDom = document.querySelector(`#${inputID}`);
        $inputDom.value = request.text;
        $inputDom.select();
        document.execCommand('copy');
    }
    sendResponse({
        value: request.text,
    });
    return true;
});
