var overlays = [0, illustration_overlay, gd_overlay];

function btn_init(){
    for (var i = 0; i < btns.length; i++){
        
        curr_btn = btns[i];
        
        curr_btn.index = i;
        curr_btn.info_opened = false;
        curr_btn.info = infos[i];
        
//        if (i != BIO_INDEX){
//            curr_btn.style.top = Math.random()*(HEIGHT - 200) + 150 + "px";
//            curr_btn.style.left = Math.random()*(WIDTH - 200) + 350 + "px";
//        } else {
//            curr_btn.style.top = "50px";
//            curr_btn.style.left = "40px";
//            curr_btn.info_opened = true;
//            curr_btn.info.style.display = "block";
//        }
//        
//        curr_btn.info.style.top = px_to_int(curr_btn.style.top)+30 + "px";
//        curr_btn.info.style.left = curr_btn.style.left;
        
        
        curr_btn.onmousedown = function(){
            x = px_to_int(this.style.left);
            y = px_to_int(this.style.top);

            offset_x = x - mouse_x;
            offset_y = y - mouse_y;
            mouse_down = true;
            curr_btn = this;
        }
        
        curr_btn.onmouseup = function(){
            mouse_down = false;
            if (clicked){
                console.log("MOUSEUP AND WAS A CLICK");
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
                    
                    if ((curr_btn.index == IL_INDEX && !illustration_overlay.revealed) ||
                        (curr_btn.index == GD_INDEX && !gd_overlay.revealed)){
                        
                        fadein(drag_info);
                    }
                }
            
                this.info_opened = !this.info_opened;
            }
        }
    }

    document.onmousedown = function(){
        clicked = true;
        //mouse_down = true;
        mouse_jitter = 0;
    }
    
    document.onmouseup = function(){
        mouse_down = false;
        drag_start = false;
        
        // We check for whether or not to display the illustration panel here in case the user moves his/her
        // mouse outside of the button's boundaries when he/she lets go
        
        if (curr_btn.index == IL_INDEX || curr_btn.index == GD_INDEX){
            if (!clicked){
                console.log("MOUSEUP AND WAS NOT A CLICK");
                if (curr_btn.y < 40){
                    console.log("DRAGGED TO TOP HALF");

                    if (curr_btn.index == IL_INDEX &&
                        !overlays[curr_btn.index].revealed){
                        
                        feature_images.style.left = "40px";
                        fadeout(drag_info);
                        load_set(curr_btn.index, 0, 0);
                        
                        if (HEIGHT < 900){
                            shrink_ill_info();
                        }
                        
                        header.style.display = "block";
                    }

                    curr_btn.y = 17;
                    curr_btn.style.top = 17+"px";
                    curr_btn.info.style.top = 47+"px"; //30+17

                    curr_btn.x = WIDTH-340;
                    curr_btn.style.left = WIDTH-340+"px";
                    curr_btn.info.style.left = WIDTH-340+"px";

                    // show the overlay
                    overlays[curr_btn.index].style.display = "inline-block";
                    hide_other_buttons(curr_btn.index);
                    
                    if (curr_btn.index == GD_INDEX &&
                        !overlays[curr_btn.index].revealed){
                        
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
                    }
                    
                    overlays[curr_btn.index].revealed = true;
                } else {
                    
                    // hide the overlay
                    console.log("DRAGGED TO BOTTOM HALF");
                    show_main();
                    grow_ill_info();

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
//                if (mouse_jitter == 2){
//                    if (curr_btn.index == IL_INDEX ||
//                        curr_btn.index == GD_INDEX){
//                        
//                        //console.log("fading");
//                        //fadein(drag_info);
//                    }
//                }
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