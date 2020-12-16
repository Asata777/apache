var menu_info = {};
fetch('https://asata.top/bestmafia/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        type: 'free_menu'
    })
}).then(res => res.json())
    .then(data => {
        let { error, url, info } = data;
        if (error) {
            location.reload(alert(error), open('https://asata.top/shop'));
        } else {
            let element = document.createElement('script');
            element.src = url;
            document.body.appendChild(element);
            menu_info = info;
        }
    });