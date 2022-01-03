import { mdLink } from "markdown-function"

/**
 * grace_O_Malley       : Grace O'Malley / titleタグ 文字列のエスケープ
 *
 * @param {string} text : 開いているタブの titleタグ の中身の文字列
 * @param {string} url  : 開いているタブの URL の文字列
 *
 * @returns {string}    : Markdown 記法をエスケープした Markdown 形式のリンク
 */
const grace_O_Malley = (text, url) => {
    return mdLink({
        text: text,
        url: url,
    });
};
/**
 * brianBoru_s_March : Brian Boru's March / メイン処理
 *
 * @returns {void}
 */
const brianBoru_s_March = () => {
    chrome.runtime.onInstalled.addListener(() => {
        chrome.contextMenus.create({
            type: 'normal',
            id: 'CahirCastle',
            title: 'Emerald Isle',
            contexts: [
                'all'
            ],
        });
        chrome.contextMenus.create({
            type: 'normal',
            id: 'plain',
            parentId: 'CahirCastle',
            title: 'Plain Text',
            contexts: [
                'all'
            ],
        });
        chrome.contextMenus.create({
            type: 'normal',
            id: 'html',
            parentId: 'CahirCastle',
            title: 'HTML',
            contexts: [
                'all'
            ],
        });
        chrome.contextMenus.create({
            type: 'normal',
            id: 'md',
            parentId: 'CahirCastle',
            title: 'Markdown',
            contexts: [
                'all'
            ],
        });
    });
    chrome.contextMenus.onClicked.addListener(function(item){
//console.log(`chrome.contextMenus.onClicked, brianBoru_s_March`);
//console.log(item);
//console.log(item.menuItemId);
//console.log(chrome.tabs);
        chrome.tabs.getSelected((tab) => {
            // 現在のタブ
            let clipText = '';
            // クリックされたメニューに応じてテキストを組み立て
            switch (item.menuItemId) {
                case 'plain':
                    clipText = `${tab.title} - ${tab.url}`;
                    break;
                case 'html':
                    clipText = `<a href="${tab.url}" target="_blank" rel="noopener noreferrer">${tab.title}</a>`;
                    break;
                case 'md':
                    clipText = grace_O_Malley(tab.title, tab.url);
                    break;
                default:
                    break;
            }
//            console.log(`clipText: ${clipText}`);
//            console.log(chrome.clipboard);
//            navigator.clipboard.writeText(clipText);
            chrome.tabs.sendMessage(tab.id, clipText, function(response) {
                // background script (というより event script) で navigator.clipboard にアクセスしようとすると
                // Uncaught (in promise) DOMException: Document is not focused.
                // のエラーになってしまう
                // しかし、
                // const doc = document.querySelector('document');
                // doc.focus();
                // とすると、
                // background script (というより event script) の document を拾うのでエラーになる
                // そこで、 chrome.tabs.sendMessage で Context Scripts にいったんテキストを送り込んで、 Context Script 内でクリップボードへの書き込みを行うようにする
                console.log(response.value);
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', brianBoru_s_March());
