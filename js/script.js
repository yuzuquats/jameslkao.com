var btns = document.getElementsByClassName("btn");
var infos = document.getElementsByClassName("dropdown");
var illustration_overlay = document.getElementById("illustration_overlay");
var html = document.getElementsByTagName("html")[0];
var drag_info = document.getElementById("drag_info");
var header = document.getElementById("header");
var page_num = document.getElementById("page_num");


var feature_images = document.getElementsByClassName("feature_images")[0];
var navigation_images = document.getElementsByClassName("navigation_images")[0].children[0].children;
var art_info = document.getElementById("art_info").children[0];

console.log(navigation_images.length);

//var test_info = document.getElementById("test_info");

var illustration_category = new category();
var ill_set_1 = new image_set("img/illustration/", "set1/", 0);
ill_set_1.add_image("2013_vertigo", "vertigo 2013 spring issue, verity. 2013.");
ill_set_1.add_image("2014_butterfly", "illustration concepts - conceal. 2014.");
ill_set_1.add_image("2014_guide", "guide. 2014.");
ill_set_1.add_image("2014_wolf", "encounter. 2015.");
ill_set_1.add_image("2014_nausea", "nausea. 2015.");
ill_set_1.add_image("2012_cal", "t-shirt design. 2012.");

var ill_set_2 = new image_set("img/illustration/", "set2/", 0);
ill_set_2.add_image("2011_Untitled_Sketch1", "untitled sketch 1. 2011.");
ill_set_2.add_image("2011_Untitled_Sketch2", "untitled sketch 2. 2011.");
ill_set_2.add_image("2011_Untitled_Sketch3", "untitled sketch 3. 2011.");
ill_set_2.add_image("2014_Untitled_Sketch4", "untitled sketch 4. 2014.");
ill_set_2.add_image("2014_Untitled_Sketch5", "untitled sketch 5. 2014.");
ill_set_2.add_image("2014_Untitled_Sketch6", "untitled sketch 6. 2014.");
ill_set_2.add_image("2014_Untitled_Sketch7", "untitled sketch 7. 2014.");
ill_set_2.add_image("2014_Untitled_Sketch8", "untitled sketch 8. 2014.");

var ill_set_3 = new image_set("img/illustration/", "set3/", 0);
ill_set_3.add_image("2012_look", "untitled 1. 2012.");
ill_set_3.add_image("2012_lotus", "untitled 2. 2012.");
ill_set_3.add_image("2014_walk", "untitled 3. 2014.");

var ill_set_4 = new image_set("img/illustration/", "set4/", 0);
ill_set_4.add_image("2013_Untitled", "reach. 2013.");
ill_set_4.add_image("2013_Untitled2", "wolf. 2013.");


illustration_category.add_image_set(ill_set_1);
illustration_category.add_image_set(ill_set_2);
illustration_category.add_image_set(ill_set_3);
illustration_category.add_image_set(ill_set_4);

var HEIGHT,
    WIDTH;

var mouse_x, mouse_y, offset_x, offset_y, x, y;

var mouse_down,
    clicked,
    drag_start;

var mouse_jitter = 0;

var curr_btn;

var IL_INDEX = 1;
var GD_INDEX = 2;
var loaded = false;

//// Main

main();
var resize_timeout;
function main(){
    illustration_overlay.revealed = false;
    
    resize_page();
    btn_init();
    window.onresize = function(event) {
        clearTimeout(resize_timeout);
        resize_timeout = setTimeout(resize_page, 500);
    };
    illustration_overlay.addEventListener("mousewheel", mouse_scroll, false);
    illustration_overlay.addEventListener("DOMMouseScroll", mouse_scroll, false);
    console.log("complete");
}

function resize_page(){
    HEIGHT = Math.max(window.innerHeight, 50);
    WIDTH = Math.max(window.innerWidth, 50);
    console.log("page resized to x: " + HEIGHT + " y: " + WIDTH);
    
    for (var i = 0; i < btns.length; i++){
        if (btns[i].index == IL_INDEX) {
            if (illustration_overlay.revealed){
                btns[i].y = 17;
                btns[i].style.top = 17+"px";
                btns[i].info.style.top = 47+"px"; //30+17

                btns[i].x = WIDTH-340;
                btns[i].style.left = WIDTH-340+"px";
                btns[i].info.style.left = WIDTH-340+"px";
            }
        } else {
            btns[i].style.top = Math.random()*(HEIGHT - 100) + 50 + "px";
            btns[i].style.left = Math.random()*(WIDTH - 100) + 50 + "px";
        }
    }
}

function category(){
    this.image_sets = [];
    this.curr_set = 0;
    this.size = 0;
    
    this.add_image_set = function(image_set){
        this.image_sets.push(image_set);
        this.size++;
    }
}

function image_set(prefix, set_name, thumbnail){
    this.prefix = prefix;
    this.set_name = set_name;
    this.thumbnail = thumbnail;
    this.size = 0;
    
    this.image_comp_url = [];
    this.image_full_url = [];
    this.image_desc = [];
    
    this.add_image = function(image_url, image_desc){
        this.image_desc.push(image_desc);
        this.image_comp_url.push(prefix + set_name + image_url + ".jpg");
        this.image_full_url.push(prefix + set_name + "full/f_" +image_url + ".jpg");
        //console.log(this.image_comp_url[this.image_comp_url.length-1]);
        //console.log(this.image_full_url[this.image_full_url.length-1]);
        this.size++;
    }
    
}

function btn_init(){
    for (var i = 0; i < btns.length; i++){
        
        curr_btn = btns[i];
        
        curr_btn.index = i;
        curr_btn.info_opened = false;
        curr_btn.info = infos[i];
        
        curr_btn.style.top = Math.random()*(HEIGHT - 100) + 50 + "px";
        curr_btn.style.left = Math.random()*(WIDTH - 100) + 50 + "px";
        
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
        }
        
        curr_btn.onmouseup = function(){
            console.log("mouse up");
            mouse_down = false;
            if (clicked){
                console.log("btn: " + curr_btn.innerHTML + " clicked!");
                click_on = false;
                
                if (this.info_opened) {
                    console.log("hiding info");
                    this.info.style.display = "none";
                    if (curr_btn.index == IL_INDEX || curr_btn.index == GD_INDEX){
                        fadeout(drag_info);
                    }
                } else {
                    console.log("showing info");
                    this.info.style.display = "block";
                    if ((curr_btn.index == IL_INDEX || curr_btn.index == GD_INDEX) &&
                        !illustration_overlay.revealed){
                        fadein(drag_info);
                    }
                }
                this.info_opened = !this.info_opened;
            }
        }
    }

    document.onmouseup = function(){
        mouse_down = false;
        drag_start = false;
        //console.log("fading out");
        //fadeout(drag_info);
        
        // We check for whether or not to display the illustration panel here in case the user moves his/her
        // mouse outside of the button's boundaries when he/she lets go
        if (!clicked){
            if (curr_btn.y < 40){
                console.log("dragged to top half");
                if (curr_btn.index == IL_INDEX){
                    
                    if (!illustration_overlay.revealed){
                        feature_images.style.left = "40px";
                        fadeout(drag_info);
                        load_ill_set(0);
                    }
                    
                    curr_btn.y = 17;
                    curr_btn.style.top = 17+"px";
                    curr_btn.info.style.top = 47+"px"; //30+17

                    curr_btn.x = WIDTH-340;
                    curr_btn.style.left = WIDTH-340+"px";
                    curr_btn.info.style.left = WIDTH-340+"px";
                    
                    // Show the illustration page
                    illustration_overlay.style.display = "inline-block";
                    hide_other_buttons(curr_btn.index);
                    illustration_overlay.revealed = true;

                    header.style.display = "block";
                    // TODO -- does this actually make a difference?
                    // How can we load the page structure first (illustration_overlay) and then the images?
//                    if (!loaded){
//                        for (var i = 0; i < feature_images.children.length; i++){
//                            feature_images.children[i].style.display = "inline-block";
//                        }
//                    }
                }
                
            } else {
                if (curr_btn.index == IL_INDEX){
                    // Hide the illustration page
                    show_main();
                    
                }
            }
        }
        
    }
    
    document.onmousemove = function(event){
        mouse_x = event.pageX;
        mouse_y = event.pageY;
        // IMPORTANT -- jitter is not determined in terms of pixels -- could have problems with certain browsers that
        // dont sample enough points, maybe even hardware dependent?
        if (mouse_down == true){
            if (mouse_jitter >= 10){
                clicked = false;
            } else {
                if (mouse_jitter == 2){
                    if (curr_btn.index == IL_INDEX ||
                        curr_btn.index == GD_INDEX){
                        
                        //console.log("fading");
                        //fadein(drag_info);
                    }
                }
                mouse_jitter++;
            }

            x = mouse_x + offset_x;
            y = mouse_y + offset_y;

            if (mouse_x <= WIDTH - 10 &&
                mouse_x >= 10){
                curr_btn.x = x;
                curr_btn.style.left = x+"px";
                curr_btn.info.style.left = x+"px";
            }
            
            if (mouse_y <= HEIGHT - 10 &&
                mouse_y >= 18){
                curr_btn.y = y;
                curr_btn.style.top = y+"px";
                curr_btn.info.style.top = y+30+"px";
            }
            
        } else {
            if (drag_start){
                //console.log("dragging");
                feature_images.style.left = feature_images.offset_x + mouse_x - feature_images.mouse_x + "px";
            }
        }
    };
    
    illustration_overlay.onmousedown = function(){
        // the initial "left" value of the images
        feature_images.offset_x = px_to_int(feature_images.style.left);
        // the x position of the mouse when we begin dragging
        feature_images.mouse_x = mouse_x;
        
        drag_start = true;
        illustration_overlay.style.cursor = "default";
        //console.log("started dragging " + feature_images.offset_x + " " + feature_images.mouse_x);
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
    }
}

function show_main(){
    if (!curr_btn.info_opened){
        fadein(drag_info);
    }
                    
    illustration_overlay.style.display = "none";
    show_buttons();
    illustration_overlay.revealed = false;
    header.style.display = "none";
}

//// Load Sets

function load_ill_set(index){
    //console.log("loading set " + index);
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
    //illustration_overlay.style.opacity = 1;
    setTimeout(function(){
        feature_images.style.opacity = 1;
    }, 100);
    
}

function next_ill_set(){
    //console.log("loading next illustration set");
    console.log(navigation_images[illustration_category.curr_set].style.width);
    navigation_images[illustration_category.curr_set].removeAttribute("id");
    var next_set = (illustration_category.curr_set + 1) % illustration_category.size;
    //console.log(illustration_category.curr_index + " " + illustration_category.size);
    load_ill_set(next_set);
    feature_images.style.left = "40px";
    navigation_images[illustration_category.curr_set].setAttribute("id", "current_image_set");
}

//// Utility Functions

function mouse_scroll(event){
    var rolled = 0;
    if ('wheelDelta' in event) {
        rolled = event.wheelDelta;
    }
    else {  // Firefox
            // The measurement units of the detail and wheelDelta properties are different.
        rolled = -40 * event.detail;
    }
    
    
    feature_images.offset_x = px_to_int(feature_images.style.left);
    feature_images.style.left = feature_images.offset_x + rolled + "px";
    console.log(rolled);
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