var element = document.createElement('script');
element.src = `http://localhost:8080/bestmafia/${PAGE_goto.toString().split('/')[2]}/paid_menu.js`;
document.body.appendChild(element);