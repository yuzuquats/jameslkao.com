var btns = document.getElementsByClassName("btn");
var infos = document.getElementsByClassName("dropdown");

var illustration_overlay = document.getElementById("illustration_overlay");
var gd_overlay = document.getElementById("gd_overlay");

var html = document.getElementsByTagName("html")[0];
var drag_info = document.getElementById("drag_info");
var header = document.getElementById("header");
var page_num = document.getElementById("page_num");

var feature_images = document.getElementsByClassName("feature_images")[0];
var navigation_images = document.getElementsByClassName("navigation_images")[0].children[0].children;
var art_info = document.getElementById("art_info").children[0];

var gd_projects = document.getElementsByClassName("gd_projects");

var header_name = document.getElementById("name");

var HEIGHT,
    WIDTH;

var mouse_x, mouse_y, offset_x, offset_y, x, y;

var mouse_down,
    clicked,
    drag_start;

var mouse_jitter = 0;

var curr_btn;

var BIO_INDEX = 0;
var IL_INDEX = 1;
var GD_INDEX = 2;
var loaded = false;

//// Main

main();
var resize_timeout;
function main(){
    illustration_overlay.revealed = false;
    gd_overlay.revealed = false;
    
    gd_overlay.loaded = false;
    
    btn_init();
    resize_page();
    
    window.onresize = function(event) {
        clearTimeout(resize_timeout);
        resize_timeout = setTimeout(resize_page, 500);
    };
    
    illustration_overlay.addEventListener("mousewheel", mouse_scroll, false);
    illustration_overlay.addEventListener("DOMMouseScroll", mouse_scroll, false);
    
    document.addEventListener("mousewheel", mouse_scroll, false);
    document.addEventListener("DOMMouseScroll", mouse_scroll, false);
    
    console.log("complete");
    
    //hide_other_buttons(GD_INDEX);
}

function resize_page(){
    HEIGHT = Math.max(window.innerHeight, 50);
    WIDTH = Math.max(window.innerWidth, 50);
    
    gd_overlay.style.width = WIDTH - 360 - 200 + "px";
    gd_overlay.style.height = HEIGHT - 100 + "px";
    
    console.log("page resized to x: " + HEIGHT + " y: " + WIDTH);
    
    for (var i = 0; i < btns.length; i++){
        if ((i == IL_INDEX && illustration_overlay.revealed) ||
            (i == GD_INDEX && gd_overlay.revealed)) {
            
            btns[i].y = 17;
            btns[i].style.top = 17+"px";
            btns[i].info.style.top = 47+"px"; //30+17

            btns[i].x = WIDTH-340;
            btns[i].style.left = WIDTH-340+"px";
            btns[i].info.style.left = WIDTH-340+"px";
            
        } else if (i == BIO_INDEX) {
            btns[i].style.top = "50px";
            btns[i].style.left = "40px";
            btns[i].info_opened = true;
            btns[i].info.style.display = "block";
            
        } else {
            btns[i].style.top = Math.random()*(HEIGHT - 300) + 150 + "px";
            btns[i].style.left = Math.random()*(WIDTH - 500) + 350 + "px";
        }
        
        btns[i].info.style.top = px_to_int(btns[i].style.top)+30 + "px";
        btns[i].info.style.left = btns[i].style.left;
    }
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
        if (btns[i].info_opened){
            btns[i].info.style.display = "block";
        }
    }
}

function show_main(){
//    if (!curr_btn.info_opened){
//        fadein(drag_info);
//    }
    
    overlays[curr_btn.index].style.display = "none";
    show_buttons();
    overlays[curr_btn.index].revealed = false;
    header.style.display = "none";
    header_name.style.display = "block";
    
    if (curr_btn.index == IL_INDEX){
        navigation_images[illustration_category.curr_set].removeAttribute("id");
        navigation_images[0].setAttribute("id", "current_image_set");
        
        if (curr_btn.info_opened){
            fadein(drag_info);
        }
        
    } else if (curr_btn.index == GD_INDEX){
        
        if (curr_btn.info_opened){
            fadein(drag_info);
        }
    }
}

function gd_nav_jump(index){
    console.log("gd_overlay.jump_values " + gd_overlay.jump_values);
    
    curr_btn = btns[GD_INDEX];
    
    if (!gd_overlay.revealed){
        console.log("not revealed");
        curr_btn.y = 17;
        curr_btn.style.top = 17+"px";
        curr_btn.info.style.top = 47+"px"; //30+17

        curr_btn.x = WIDTH-340;
        curr_btn.style.left = WIDTH-340+"px";
        curr_btn.info.style.left = WIDTH-340+"px";

        // show the overlay
        overlays[curr_btn.index].style.display = "inline-block";
        hide_other_buttons(curr_btn.index);
        header.style.display = "block";
                        
        gd_overlay.style.top = "0px";
        fadeout(drag_info);
                        
        if (!gd_overlay.loaded){
                            
            gd_overlay.jump_values = [0];
                            
            var curr_count = 0;
            for (var i = 0; i < gd_projects.length-1; i++){
                curr_count += gd_projects[i].clientHeight;
                gd_overlay.jump_values.push(curr_count + 40);
                //console.log("height: " + curr_count);
            }
            gd_overlay.loaded = true;
        }
        
        gd_overlay.revealed = true;
    }
    
    
    if (index == 0){
        header_name.style.display = "block";
    } else {
        header_name.style.display = "none";
    }
    gd_overlay.style.top = -gd_overlay.jump_values[index] + "px";
}

//// Load Sets

function load_set(type, index){
    //console.log("loading set " + index);
    
    if (type == IL_INDEX){
        feature_images.style.opacity = 0;
        var cat = illustration_category.image_sets[index];
        var i;
        for (i = 0; i < art_info.children.length; i++){
            if (i < cat.image_comp_url.length){
                feature_images.children[i].src = cat.image_comp_url[i];
                art_info.children[i].innerHTML = cat.image_desc[i];
            } else {
                feature_images.children[i].style.display = "none";
                art_info.children[i].style.display = "none";
            }
        }

        for (i = 0; i < cat.image_comp_url.length; i++){
            feature_images.children[i].style.display = "inline-block";
            art_info.children[i].style.display = "block";
        }

        feature_images.children[feature_images.children.length-1].style.display = "inline-block";

        // TODO - change full res links too

        page_num.innerHTML = index + 1 + "/" + illustration_category.size;
        illustration_category.curr_set = index;
        
        setTimeout(function(){
            feature_images.style.opacity = 1;
        }, 100);
    }
    
}

function next_ill_set(){
    //console.log("loading next illustration set");
    
    navigation_images[illustration_category.curr_set].removeAttribute("id");
    var next_set = (illustration_category.curr_set + 1) % illustration_category.size;
    
    load_set(IL_INDEX, next_set);
    feature_images.style.left = "40px";
    navigation_images[illustration_category.curr_set].setAttribute("id", "current_image_set");
}

//// Utility Functions

function mouse_scroll(event){
    var rolled = 0;
    if ('wheelDelta' in event) {
        rolled = event.wheelDelta;
    } else {  // Firefox
            // The measurement units of the detail and wheelDelta properties are different.
        rolled = -40 * event.detail;
    }
    
    if (curr_btn.index == IL_INDEX){
        feature_images.offset_x = px_to_int(feature_images.style.left);
        feature_images.style.left = feature_images.offset_x + rolled + "px";
    } 
    
    if (gd_overlay.revealed){
        var new_y = px_to_int(gd_overlay.style.top) + rolled;
        if (new_y > 0){
            gd_overlay.style.top = "0px";
        } else {
            gd_overlay.style.top = new_y + "px";
        }
        
        //console.log(new_y);
        
        if (new_y > -120){
            header_name.style.display = "block";
        } else {
            header_name.style.display = "none";
        }
        
    }
    
    //console.log(rolled);
}

function px_to_int(px){
    // converts a pixel string (eg. "500px") to an int (500)
    return parseInt(px.substring(0, px.length-2));
}

function fadein(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 2){
            clearInterval(timer);
        }
        element.style.display = 'block';
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function fadeout(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 30);
}

//// Touch

//document.addEventListener("touchstart", test, false);
//document.addEventListener("touchmove", update_move, false);
//function test(event){
//    //alert("started");
//}
//
//function update_move(event){
//    test_info.innerHTML = "x: " + event.touches[0].pageX + " y: " + event.touches[0].pageY;
//}