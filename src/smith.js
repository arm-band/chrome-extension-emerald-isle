chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // メッセージとして送信されたクリップボードに貼り付けたいテキストをそのままレスポンスに設定して返却
    navigator.clipboard.writeText(request);
    sendResponse({
        value: request,
    });
});
