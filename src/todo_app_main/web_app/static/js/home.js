// Make resizable div by Hung Nguyen and edit by DeveloPingPong

function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 20;
    let max_size = (35 * window.innerWidth) / 100;
    console.log(max_size);
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function(e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            if (clickDrop===false) {
                console.log(clickDrop)
                if (parseInt(element.style.width, 10) > max_size) {
                    element.style.width = max_size + "px";
                } else if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                } else if (currentResizer.classList.contains('bottom-left')) {
                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                } else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                } else if (currentResizer.classList.contains('right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                } else if (currentResizer.classList.contains('left')) {
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                } else {
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }
}

// Hidde navbar-drop
function hideNavBarDrop(){
    const element = document.getElementById('navbar-drop');
    let icon_right = document.getElementById("drop_icons_right");
    let icon_left = document.getElementById("drop_icons_left")
    let icons = [icon_left, icon_right]
    if(clickDrop===false){
        clickDrop = true;
        element.style.minWidth = "0px";
        element.style.width = "0px";
        element.style['z-index'] = "-1";
        icons[0].style.visibility = "hidden";
        icons[1].style.visibility = "visible";

    }
    else {
        element.style = '';
        icons[0].style.visibility = "visible";
        icons[1].style.visibility = "hidden";
        clickDrop = false;
    }
}


// Button change drop navbar
let clickDrop = false;
const element = document.getElementById("button");
console.log(element)
element.addEventListener("click",hideNavBarDrop);
console.log(element)
// Div resizable
makeResizableDiv('.resizable')

