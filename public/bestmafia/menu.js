var info = {};
fetch('https://asata.club/bestmafia/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            location.reload(alert(data.error), open('https://asata.club/shop'));
        } else {
            let element = document.createElement('script');
            element.src = data.url;
            document.body.appendChild(element);
            
            info = data.info;
        }
    });