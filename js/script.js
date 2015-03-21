var btns = document.getElementsByClassName("btn");
var infos = document.getElementsByClassName("dropdown");
var illustration_overlay = document.getElementById("illustration_overlay");
var feature_images = document.getElementsByClassName("feature_images")[0];
var html = document.getElementsByTagName("html")[0];
var drag_info = document.getElementById("drag_info");

var HEIGHT,
    WIDTH;

var mouse_x, mouse_y, offset_x, offset_y, x, y;

var mouse_down,
    clicked,
    drag_start;

var mouse_jitter = 0;

var curr_btn;

var illustration_index = 1;
var illustration_revealed = false;
var loaded = false;

main();

function main(){
    resize_page();
    btn_init();
}

function resize_page(){
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    console.log("page resized to x: " + HEIGHT + " y: " + WIDTH);
}

function btn_init(){
    for (var i = 0; i < btns.length; i++){
        
        curr_btn = btns[i];
        
        curr_btn.index = i;
        curr_btn.info_opened = false;
        curr_btn.info = infos[i];
        
        curr_btn.style.top = Math.random()*(HEIGHT - 60) + 30 + "px";
        curr_btn.style.left = Math.random()*(WIDTH - 60) + 30 + "px";
        
        curr_btn.info.style.top = px_to_int(curr_btn.style.top)+30 + "px";
        curr_btn.info.style.left = curr_btn.style.left;
        
        curr_btn.onmousedown = function(){
            x = px_to_int(this.style.left);
            y = px_to_int(this.style.top);

            offset_x = x - mouse_x;
            offset_y = y - mouse_y;

            mouse_down = true;
            clicked = true;
            curr_btn = this;
            
            mouse_jitter = 0;
            
            fadeout(drag_info);
            //drag_info.style.display = "block";
        }
        
        curr_btn.onmouseup = function(){
            mouse_down = false;
            if (clicked){
                console.log("btn: " + curr_btn.innerHTML + " clicked!");
                click_on = false;
                
                if (this.info_opened) {
                    this.info.style.display = "none";
                } else {
                    this.info.style.display = "block";
                }
                this.info_opened = !this.info_opened;
            } else {
                if (mouse_y < 100){
                    console.log("dragged to top half");
                    if (curr_btn.index == illustration_index){
                        if (!illustration_revealed){
                            // Show the illustration page
                            illustration_overlay.style.display = "inline-block";
                            hide_other_buttons(curr_btn.index);
                            illustration_revealed = true;
                            
                            // TODO -- does this actually make a difference?
                            // How can we load the page structure first (illustration_overlay) and then the images?
                            if (!loaded){
                                for (var i = 0; i < feature_images.children.length; i++){
                                    feature_images.children[i].style.display = "inline-block";
                                }
                            }
                            // TODO
                            feature_images.style.left = "0px";
                        }
                    }
                } else {
                    if (illustration_revealed){
                        // Hide the illustration page
                        illustration_overlay.style.display = "none";
                        show_buttons();
                        illustration_revealed = false;
                    }
                }
            }
        }
    }

    document.onmouseup = function(){
        mouse_down = false;
        drag_start = false;
        //drag_info.style.display = "none";
        fadein(drag_info);
    }
    
    document.onmousemove = function(event){
        mouse_x = event.pageX;
        mouse_y = event.pageY;
        if (mouse_down == true){
            if (mouse_jitter > 30){
                clicked = false;
            } else {
                mouse_jitter++;
            }

            x = mouse_x + offset_x;
            y = mouse_y + offset_y;

            curr_btn.style.top = y+"px";
            curr_btn.style.left = x+"px";

            curr_btn.info.style.top = y+30+"px";
            curr_btn.info.style.left = x+"px";
        } else {
            if (drag_start){
                console.log("dragging");
                feature_images.style.left = feature_images.offset_x + mouse_x - feature_images.mouse_x + "px";
            }
        }
    };
    
    feature_images.onmousedown = function(){
        // the initial "left" value of the images
        feature_images.offset_x = px_to_int(feature_images.style.left);
        // the x position of the mouse when we begin dragging
        feature_images.mouse_x = mouse_x;
        
        drag_start = true;
        //html.style.cursor = "auto";
        console.log("started dragging " + feature_images.offset_x + " " + feature_images.mouse_x);
    }
}

function px_to_int(px){
    // converts a pixel string (eg. "500px") to an int (500)
    return parseInt(px.substring(0, px.length-2));
}

function hide_other_buttons(button_index){
    for (var i = 0; i < btns.length; i++){
        if (i != button_index){
            btns[i].style.display = "none";
            btns[i].info.style.display = "none";
        }
    }
}

function show_buttons(){
    for (var i = 0; i < btns.length; i++){
        btns[i].style.display = "block";
    }
}

function fadeout(element) {
    var op = 0.2;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 2){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.2;
    }, 10);
}

function fadein(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.2){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.2;
    }, 50);
}