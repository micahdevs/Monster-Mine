// const monster_submit_button = $('#monsterCreateSubmit');
const monster_submit_button = document.getElementById("monsterCreateSubmit");
const monster_name = $('#name-form');
const size = $('#size');
const category = $('#category-form');
const armor_type = $("#armor-type-form");
const armor_class = $("#armor-class-form");
const hitPoints = $('hitPoints-form');
const walk_speed =$('walk-speed-form');
const fly_speed = $('fly-speed-form');
const swim_speed =$('swim-speed-form');
const climb_speed = $('climb-speed-form');

localStorage.setItem("speed_count",0);

class Dropdown {
    constructor (id,class_opt,container,options) {
        this.id = id;
        this.class_opt = class_opt
        this.container = container
        this.options = options
    }
    newField(){
        let div = document.createElement("div");
        let fieldset = document.createElement("fieldset");
        let select = document.createElement("select");
        let input = document.createElement("input");
        let id = 0;

        $(div).addClass("row")
        $(select).addClass(this.class_opt);
        select.id = this.container.id + "_type_" + this.id;
        input.type = "number";
        input.id = this.container.id +"_input_"+ this.id;

        this.options.forEach((opt) => {
            let speed_opt = document.createElement("option");
            speed_opt.id = opt+"_"+id;
            speed_opt.innerHTML = opt;
            select.appendChild(speed_opt);
            id ++;
        });

        fieldset.appendChild(select);
        div.appendChild(fieldset);
        div.appendChild(input);
        div.appendChild(document.createElement("br"));
        this.container.appendChild(div);

    }
    newInput(){

    }
};

function new_monster_submit () {
   console.log("Hey There")
   console.log(monster_name.val()); 
   console.log(size.val()); 
}


function addTextField(containerId, formId) {
    var container = document.getElementById(containerId);
    const class_opt = "btn btn-secondary dropdown-toggle"; //The CSS style of the new button via Bootstrap

    if (container.id = "speed_box") {
        let current_speed = localStorage.getItem("speed_count");
        let next_speed = parseInt(current_speed) +1;
        let options = ["walking","swimming","flying","climbing","burrowing","jumping","teleporting"];
        localStorage.setItem("speed_count",next_speed);
        const new_speed = new Dropdown (current_speed,class_opt,container,options);
        new_speed.newField();
        new_speed.newInput();

        
        console.log(new_speed);

        
        


    } else {
    var input = document.createElement("input");
    input.type = "text";
    input.name = containerId + "[]"; // Use square brackets to indicate an array of values
    };
};

monster_submit_button.addEventListener("click",new_monster_submit);