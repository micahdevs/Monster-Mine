
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
localStorage.setItem("language_count",0);
localStorage.setItem("trait_count",0);
localStorage.setItem("action_count",0);

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
            let option = document.createElement("option");
            option.id = opt+"_"+id;
            option.innerHTML = opt;
            select.appendChild(option);
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

class Textfield {
    constructor (id,class_opt,container) {
        this.id = id;
        this.class_opt = class_opt;
        this.container = container;
    }
    newTitle() {
        let div = document.createElement("div");
        let input = document.createElement("input");
        div.id = this.container.id + "_container_" + this.id;
        if (this.container.id === "languagesContainer"){
            $(div).addClass("row");
        } else {
            $(div).css({"display":"flex","flex-direction":"column"});
        }
        input.type = "text";
        input.id = this.container.id +"_input_"+ this.id;
        div.appendChild(input);
        this.container.appendChild(div);
    };
    newText(){
        let div = document.getElementById(this.container.id + "_container_" + this.id);
        let textarea = document.createElement("textarea");
        textarea.id = this.container.id +"_textarea_"+ this.id;
        div.appendChild(textarea);
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
    };
};

class Ability extends Textfield{ 
    constructor (id,class_opt,container) {
        super (id,class_opt,container);
    }

    remove_previous(container) {
        while (container.childNodes.length > 1) {
            container.removeChild(container.lastChild); //This will remove ALL the elements from the action block EXCEPT the toggle Switch, which is the first child
        }
    }

    newTitle(container) {
        let div = document.createElement("div");
        let input = document.createElement("input");
        div.id = this.container.id + "_ability_" + this.id;
        console.log(div, "next is parent")
        console.log(container)
        $(div).css({"display":"flex","flex-direction":"column"});
        container.setAttribute("class","column"); //the big change on the parent div.
        input.type = "text";
        input.id = this.container.id +"_input_"+ this.id;
        div.appendChild(input);
        this.container.appendChild(div);
    };

    newText(){
        let div = document.getElementById(this.container.id + "_ability_" + this.id);
        let textarea = document.createElement("textarea");
        textarea.id = this.container.id +"_textarea_"+ this.id;
        div.appendChild(textarea);
    };

    newDeletebutton(container){
        let div = document.getElementById(this.container.id + "_ability_" + this.id);
        let deletebutton = document.createElement("button");
        $(deletebutton).addClass("btn btn-secondary");
        $(deletebutton).html("&#10060");
        deletebutton.addEventListener("click",function(){
            container.remove();
        })
        div.appendChild(deletebutton);
    };
};

class Attack {
    constructor(id,class_opt,container){
        this.id = id;
        this.class_opt = class_opt;
        this.container = container;
    }
    remove_previous(container) {
        while (container.childNodes.length > 1) {
            container.removeChild(container.lastChild); //This will remove ALL the elements from the action block EXCEPT the toggle Switch, which is the first child
        }
    };
    little_drop_down(order,container_id,options) {
        const container = document.getElementById(container_id);
        container.setAttribute("class","row");
        const drop_opt = "btn btn-secondary dropdown-toggle";
        const attack_type = new Dropdown (order,drop_opt,container,options)
        attack_type.newField();
         // We assign a new button ability to the attribute button ONLY. We need this in orde to toggle the _to_hit
    };
    new_Input (order,container_id,type) {
        let element = "";
        if (order < 7){
            element = ("input");
        } else {
            element = ("textarea");
        };
        const new_box = document.createElement(element);
        new_box.id = container_id+"_"+type+"_"+order;
        const container = document.getElementById(container_id);
        container.append(new_box);
        if (order === 2) { //We have to create the button function for the ability modifiers AFTER we make the button and the new input field. Otherwise there is nothing to update.
            const button_id = container_id + "_type_"+1;
            console.log(button_id)
            const recent_button = $(`#${button_id}`);
            recent_button.attr("onChange","to_hit(this.id, this.value)");
            recent_button.change();
        }
    };
    newDeletebutton(container){
        console.log(container);
        let div = document.getElementById(container.id);
        let deletebutton = document.createElement("button");
        $(deletebutton).addClass("btn btn-secondary");
        $(deletebutton).html("&#10060");
        deletebutton.addEventListener("click",function(){
            container.remove();
        })
        div.appendChild(deletebutton);
    };
    
};

const new_monster_submit= async (event) => {
    event.preventDefault();
    console.log('Monster Post Button Hit');
    console.log("Monster Name:" + monster_name.val()); 
    const nope= null
    const name= monster_name.val();
    const user_id = userId;
    const sizeInput=document.querySelector('#size');
    const categoryInput=document.querySelector('#category-form');
    const armorClassInput=document.querySelector('#armor-class-form');
    const armorTypeInput=document.querySelector('#armor-type-form');
    const hitDiceInput=document.querySelector('#hitDice-form');
    const hitDiceTypeInput=document.querySelector('#hit_dice_type');
    const speedBoxInput=document.querySelector('#speed_box select');
    const strInput=document.querySelector('#STR');
    const dexInput=document.querySelector('#DEX');
    const conInput=document.querySelector('#CON');
    const intInput=document.querySelector('#INT');
    const wisInput=document.querySelector('#WIS');
    const chaInput=document.querySelector('#CHA');
    const savingThrowsBoxInput=document.querySelector('#savingThrows_box select');
    const skillsBoxInput=document.querySelector('#skills_box select');
    const damageResistancesBoxInput=document.querySelector('#damageResistances_box select');
    const damageImmunitiesBoxInput=document.querySelector('#damageImmunities_box select');
    const conditionImmunitiesBoxInput=document.querySelector('#conditionImmunities_box select');
    const sensesBoxInput=document.querySelector('#senses_box select');
    const languagesContainerInput=document.querySelector('#languagesContainer input');
    const challengeInput=document.querySelector('#challenge-form');
    const proficiencyBonusInput=document.querySelector('#proficiencyBonus-form');
    const traitsContainerInput=document.querySelector('#traitsContainer input');
    const actionBlockInput=document.querySelector('#actionBlock select');


 console.log(req.session.user_id);//


    
      const response = await fetch('/api/monster/create', {
        method: 'POST',
        body: JSON.stringify({ 
            name,
            user_id,
            sizeInput,
            categoryInput,
            armorTypeInput, armorClassInput,
            nope,
            nope,
            nope,
            speedBoxInput,
            strInput,
            dexInput,
            conInput,
            intInput,
            wisInput,
            chaInput,
            savingThrowsBoxInput,
            skillsBoxInput,
            damageResistancesBoxInput,
            damageImmunitiesBoxInput,
            conditionImmunitiesBoxInput,
            sensesBoxInput,
            languagesContainerInput,
            challengeInput,
            proficiencyBonusInput,
            nope,
            nope,
            actionBlockInput,
            nope,
            nope,
            nope
     }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/chamber');
       
    } else {
        alert('Monster create failed');
        console.log(response.body);
      }
    }


function addTextField(containerId, formId) {
    const container = document.getElementById(containerId);
    const class_opt = "";
    if (container.id === "languagesContainer") {
        console.log("Language");
        let current_language= localStorage.getItem("language_count");
        let next_language = parseInt(current_language) +1;
        localStorage.setItem("language_count",next_language);
        const new_language = new Textfield (current_language,class_opt,container);
        new_language.newTitle();
        new_language.newDeletebutton();

    }
    if (container.id === "traitsContainer"){
        console.log("Trait");
        let current_trait= localStorage.getItem("trait_count");
        let next_trait = parseInt(current_trait) +1;
        localStorage.setItem("trait_count",next_trait);
        const new_trait = new Textfield (current_trait,class_opt,container);
        new_trait.newTitle();
        new_trait.newText();
        new_trait.newDeletebutton();
    }
};

function addDropDown(containerId, formId) {
    const container = document.getElementById(containerId);
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
    }; 
    
    if (container.id === "savingThrows_box"){
        console.log("Saving Throw");
        let current_save = localStorage.getItem("save_count");
        let next_save = parseInt(current_save) +1;
        let options = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
        localStorage.setItem("save_count",next_save);
        const new_save = new Dropdown (current_save,class_opt,container,options);
        new_save.newField();
        new_save.newDeletebutton();
    };

    if(container.id === "skills_box"){
        console.log("Skill");
        let current_skill = localStorage.getItem("skill_count");
        let next_skill = parseInt(current_skill) +1;
        let options = ["Athletics","Acrobatics","Sleight of Hand","Stealth","Arcana","History","Investigation","Nature","Religion","Animal Handling","Insight","Medicine","Perception","Survival","Deception","Intimidation","Performance","Persuasion"];
        localStorage.setItem("skill_count",next_skill);
        const new_save = new Dropdown (current_skill,class_opt,container,options);
        new_save.newField();
        new_save.newDeletebutton();
    };
    
    if(container.id === "damageResistances_box" || container.id === "damageImmunities_box"){
        console.log("Resistance/Immunity");
        let current_damage = localStorage.getItem("damage_count");
        let next_damage = parseInt(current_damage) +1;
        let options = ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder","Slashing", "Bludgeoning", "Piercing"];
        localStorage.setItem("damage_count",next_damage);
        const new_damage = new Dropdown (current_damage,class_opt,container,options);
        new_damage.newField();
        new_damage.newDeletebutton();
    };

    if(container.id === "conditionImmunities_box"){
        console.log("");
        let current_condition = localStorage.getItem("condition_count");
        let next_condition= parseInt(current_condition) +1;
        let options = ["Blinded","Charmed","Deafened","Frightened","Grappled","Incapacitated","Invisible","Paralyzed","Petrified","Poisoned","Prone","Restrained","Stunned","Unconscious","Exhaustion"];
        localStorage.setItem("condition_count",next_condition);
        const new_condition = new Dropdown (current_condition,class_opt,container,options);
        new_condition.newField();
        new_condition.newDeletebutton();
    };

    if(container.id === "senses_box"){
        console.log("Senses");
        let current_sense = localStorage.getItem("sense_count");
        let next_sense = parseInt(current_sense) +1;
        let options = ["Darkvision", "Blindsight", "Thoughtsense", "Tremorsense", "Truesight"];
        localStorage.setItem("sense_count",next_sense);
        const new_sense = new Dropdown (current_sense,class_opt,container,options);
        new_sense.newField();
        new_sense.newInput();
        new_sense.newDeletebutton();
    };

    if(container.id === "actionBlock"){  
        console.log("Action");
        let current_action = localStorage.getItem("action_count");
        let next_action= parseInt(current_action) +1;
        let options = ["Attack","Ability"];
        localStorage.setItem("action_count",next_action);
        const new_sense = new Dropdown (current_action,class_opt,container,options);
        new_sense.newField();
        recent_button = $("#actionBlock_type_"+current_action);
        recent_button.attr("onChange","choose_Action(this.id,this.value)");
        recent_button.change();
    } else {
    var input = document.createElement("input");
    input.type = "text";
    input.name = containerId + "[]"; // Use square brackets to indicate an array of values
    };
};

function choose_Action(choiceId,choiceText) {
    console.log("NewActionSelected");
    //console.log(choiceId,choiceText);
    const actionIdstring = choiceId.match(/(\d+)/); //This pulls numbers out of a string.
    const actionId = parseInt(actionIdstring[0]);
    const container = document.getElementById(choiceId).parentElement.parentElement
    const class_opt = "";
    console.log(actionId,container);
    if (choiceText === "Ability"){        
        const new_ability = new Ability (actionId,class_opt,container);
        new_ability.remove_previous(container);
        new_ability.newTitle(container);
        new_ability.newText();
        new_ability.newDeletebutton(container);
    } else {
        console.log(container.id);
        const new_attack = new Attack ((actionId,class_opt,container));
        new_attack.remove_previous(container);
        const attack_type_options = ["Melee Weapon Attack","Melee Spell Attack","Ranged Weapon Attack","Ranged Spell Attack"];
        const attack_attribute_options = ["STR","DEX","CON","INT","WIS","CHA"];
        const damage_options =["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder","Slashing", "Bludgeoning", "Piercing"];
        const box = [0,1,2,3,4,5,6,7,8,9,10] // Because there are so many little boxes in attack, we have to set the order manually.
        new_attack.little_drop_down(box[0],container.id,attack_type_options);
        new_attack.little_drop_down(box[1],container.id,attack_attribute_options,);
        new_attack.new_Input(box[2],container.id,"hit_box")
        new_attack.new_Input(box[3],container.id,"range")
        new_attack.new_Input(box[4],container.id,"target")
        new_attack.new_Input(box[5],container.id,"damage")
        new_attack.little_drop_down(box[6],container.id,damage_options,);
        new_attack.new_Input(box[7],container.id,"effect")
        new_attack.newDeletebutton(container);

    }
}

function to_hit(sibling,attribute){
    console.log(sibling,attribute);
    const sibling_element = document.getElementById(sibling)
    const attribute_value = document.getElementById(attribute).value;
    const profficency_bonus = document.getElementById("proficiencyBonus-form").value;
    const to_hit_bonus = Math.floor(((attribute_value-10)/2))+profficency_bonus;
    const container = sibling_element.parentElement.parentElement.parentElement
    const target_hitbox = document.getElementById(container.id+"_hit_box_2")
    target_hitbox.value = to_hit_bonus;

};

monster_submit_button.addEventListener("click",new_monster_submit);