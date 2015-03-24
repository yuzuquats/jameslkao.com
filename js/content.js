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