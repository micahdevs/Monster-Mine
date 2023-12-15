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
localStorage.setItem("save_count",0);
localStorage.setItem("skill_count",0);
localStorage.setItem("damage_count",0);
localStorage.setItem("condition_count",0);
localStorage.setItem("sense_count",0);

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

        let id = 0;

        $(div).addClass("row")
        $(select).addClass(this.class_opt);
        div.id = this.container.id + "_container_" + this.id;
        select.id = this.container.id + "_type_" + this.id;

        this.options.forEach((opt) => {
            let speed_opt = document.createElement("option");
            speed_opt.id = opt+"_"+id;
            speed_opt.innerHTML = opt;
            select.appendChild(speed_opt);
            id ++;
        });

        fieldset.appendChild(select);
        div.appendChild(fieldset);
        this.container.appendChild(div);

    }
    newInput(){
        let div = document.getElementById(this.container.id + "_container_" + this.id);
        let input = document.createElement("input");
        input.type = "number";
        input.id = this.container.id +"_input_"+ this.id;
        div.appendChild(input);
    }

    newDeletebutton(){
        let div = document.getElementById(this.container.id + "_container_" + this.id);
        let deletebutton = document.createElement("button");
        $(deletebutton).addClass("btn btn-secondary");
        $(deletebutton).html("&#10060");
        deletebutton.addEventListener("click",function(){
            div.remove();
        })
        div.appendChild(deletebutton);
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

    if (container.id === "speed_box") {
        console.log("Speed");
        let current_speed = localStorage.getItem("speed_count");
        let next_speed = parseInt(current_speed) +1;
        let options = ["walking","swimming","flying","climbing","burrowing","jumping","teleporting"];
        localStorage.setItem("speed_count",next_speed);
        const new_speed = new Dropdown (current_speed,class_opt,container,options);
        new_speed.newField();
        new_speed.newInput();
        new_speed.newDeletebutton();
    } 
    
    if(container.id === "savingThrows_box"){
        console.log("Saving Throw");
        let current_save = localStorage.getItem("save_count");
        let next_save = parseInt(current_save) +1;
        let options = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
        localStorage.setItem("save_count",next_save);
        const new_save = new Dropdown (current_save,class_opt,container,options);
        new_save.newField();
        new_save.newDeletebutton();
    }

    if(container.id === "skills_box"){
        console.log("Skill");
        let current_skill = localStorage.getItem("skill_count");
        let next_skill = parseInt(current_skill) +1;
        let options = ["Athletics","Acrobatics","Sleight of Hand","Stealth","Arcana","History","Investigation","Nature","Religion","Animal Handling","Insight","Medicine","Perception","Survival","Deception","Intimidation","Performance","Persuasion"];
        localStorage.setItem("skill_count",next_skill);
        const new_save = new Dropdown (current_skill,class_opt,container,options);
        new_save.newField();
        new_save.newDeletebutton();
    }
    
    if(container.id === "damageResistances_box" || container.id === "damageImmunities_box"){
        console.log("Resistance/Immunity");
        let current_damage = localStorage.getItem("damage_count");
        let next_damage = parseInt(current_damage) +1;
        let options = ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder","Slashing", "Bludgeoning", "Piercing"];
        localStorage.setItem("damage_count",next_damage);
        const new_damage = new Dropdown (current_damage,class_opt,container,options);
        new_damage.newField();
        new_damage.newDeletebutton();
    }

    if(container.id === "conditionImmunities_box"){
        console.log("");
        let current_condition = localStorage.getItem("condition_count");
        let next_condition= parseInt(current_condition) +1;
        let options = ["Blinded","Charmed","Deafened","Frightened","Grappled","Incapacitated","Invisible","Paralyzed","Petrified","Poisoned","Prone","Restrained","Stunned","Unconscious","Exhaustion"];
        localStorage.setItem("condition_count",next_condition);
        const new_condition = new Dropdown (current_condition,class_opt,container,options);
        new_condition.newField();
        new_condition.newDeletebutton();
    }

    if(container.id === "senses_box"){
        console.log("");
        let current_sense = localStorage.getItem("senses_count");
        let next_sense= parseInt(current_sense) +1;
        let options = ["Darkvision", "Blindsight", "Thoughtsense", "Tremorsense", "Truesight"];
        localStorage.setItem("sense_count",next_sense);
        const new_sense = new Dropdown (current_sense,class_opt,container,options);
        new_sense.newField();
        new_sense.newInput();
        new_sense.newDeletebutton();
    }
    else {
    var input = document.createElement("input");
    input.type = "text";
    input.name = containerId + "[]"; // Use square brackets to indicate an array of values
    };
};

monster_submit_button.addEventListener("click",new_monster_submit);