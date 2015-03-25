var illustration_work = [];
var curr_ill_cat = 0;

var personal_work, entertainment_design, sketches;
var ill_set_1, ill_set_2, ill_set_3, ill_set_4;
var ed_set_1;
var sk_set_1, sk_set_2, sk_set_3;

{
    personal_work = new category("personal work");
    
    ill_set_1 = new image_set("img/ill/personal_work/", "set1/", 0);
    ill_set_1.add_image("2013_vertigo", "vertigo 2013 spring issue, verity. 2013.");
    ill_set_1.add_image("2014_butterfly", "illustration concepts - conceal. 2014.");
    ill_set_1.add_image("2014_guide", "guide. 2014.");
    ill_set_1.add_image("2014_wolf", "encounter. 2015.");
    ill_set_1.add_image("2014_nausea", "nausea. 2015.");
    ill_set_1.add_image("2012_cal", "t-shirt design. 2012.");

    ill_set_2 = new image_set("img/ill/personal_work/", "set2/", 0);
    ill_set_2.add_image("2012_look", "untitled 1. 2012.");
    ill_set_2.add_image("2012_lotus", "untitled 2. 2012.");
    ill_set_2.add_image("2014_walk", "untitled 3. 2014.");

    ill_set_3 = new image_set("img/ill/personal_work/", "set3/", 0);
    ill_set_3.add_image("2013_Untitled", "reach. 2013.");
    ill_set_3.add_image("2013_Untitled2", "wolf. 2013.");

    personal_work.add_image_set(ill_set_1);
    personal_work.add_image_set(ill_set_2);
    personal_work.add_image_set(ill_set_3);
}

{
    entertainment_design = new category("entertainment design");
    
    ed_set_1 = new image_set("img/ill/entertainment_design/", "set1/", 0);
    ed_set_1.add_image("feb_18", "Feb 18. 2015.");
    ed_set_1.add_image("feb_19", "Feb 19. 2015.");
    ed_set_1.add_image("feb_21", "Feb 21. 2015.");
    ed_set_1.add_image("feb_26", "Feb 26. 2015.");

    entertainment_design.add_image_set(ed_set_1);
}

{
    sketches = new category("sketches");
    
    sk_set_1 = new image_set("img/ill/sketches/", "set1/", 0);
    sk_set_1.add_image("2011_Untitled_Sketch1", "untitled sketch 1. 2011.");
    sk_set_1.add_image("2011_Untitled_Sketch2", "untitled sketch 2. 2011.");
    sk_set_1.add_image("2011_Untitled_Sketch3", "untitled sketch 3. 2011.");
    sk_set_1.add_image("2014_Untitled_Sketch4", "untitled sketch 4. 2014.");
    sk_set_1.add_image("2014_Untitled_Sketch5", "untitled sketch 5. 2014.");
    sk_set_1.add_image("2014_Untitled_Sketch6", "untitled sketch 6. 2014.");
    sk_set_1.add_image("2014_Untitled_Sketch7", "untitled sketch 7. 2014.");
    sk_set_1.add_image("2014_Untitled_Sketch8", "untitled sketch 8. 2014.");
    
    sk_set_2 = new image_set("img/ill/sketches/", "set2/", 0);
    sk_set_2.add_image("2011_sketchbook_1", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_2", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_3", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_4", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_5", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_6", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_7", "sketchbook 1. 2011.");
    sk_set_2.add_image("2011_sketchbook_8", "sketchbook 1. 2011.");
    
    sk_set_3 = new image_set("img/ill/sketches/", "set3/", 0);
    sk_set_3.add_image("2015_architecture_1", "architecture sketch 1. 2015.");
    sk_set_3.add_image("2015_architecture_2", "architecture sketch 2. 2015.");
    sk_set_3.add_image("2015_architecture_3", "architecture sketch 3. 2015.");
    
    sketches.add_image_set(sk_set_1);
    sketches.add_image_set(sk_set_2);
    sketches.add_image_set(sk_set_3);
}

{
    illustration_work.push(personal_work);
    illustration_work.push(entertainment_design);
    illustration_work.push(sketches);
}

function category(name){
    this.name = name +  '<span class="arrow">&#149</span>';
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