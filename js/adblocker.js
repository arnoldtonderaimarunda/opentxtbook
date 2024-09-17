
fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js').then(() => {
  document.getElementsByClassName('message')[0].innerHTML = '';
}) .catch(() => {
  document.getElementsByClassName('message')[0].innerHTML = 'Note: Your Adblocker is removing items from the list.';
});
