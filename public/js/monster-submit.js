const monster_submit_button = document.getElementById("monsterCreateSubmit");
const monster_name = $('#name-form');
const size = $('#size');
const category = $('#category-form');
const armor_type = $("#armor-type-form");
const armor_value = $("#armor-class-form")
const hit_dice_num = $("#hit_dice_form");
const HP = $("#hp_calculation");
const hit_dice_type = $("#hit_dice_type");
const str_num = $("#STR");
const dex_num = $("#DEX");
const con_num =$("#CON");
const int_num = $("#INT");
const wis_num = $("#WIS");
const cha_num = $("#CHA");
const proficiency_num =$("#proficiencyBonus-form");
const challenge_num = $("#challenge-form");
const imageUrl = $("#monsterImageUrl");


async function new_monster_submit (event) {

    event.preventDefault()

    class json_dropdown_array {
        constructor (container) {
            this.types = [];
            this.container = container;
        }
    
        compile_array () {
            const list = document.getElementById(this.container);
            //console.log(list);
            Array.from(list.children).forEach((child) => {
            if (child.id.includes("container")) {
                //console.log(child.id) 
                const type_box = document.getElementById(child.id).children[0];
                this.types.push(type_box.children[0].value);
                }
            });
            //console.log(this.types)
        }
    }

    class array_text extends json_dropdown_array {
        constructor (types,container) {
            super(types,container);
        }
    
        compile_array () {
            const list = document.getElementById(this.container);
            //console.log(list);
            Array.from(list.children).forEach((child) => {
            if (child.id.includes("container")) {
                //console.log(child.id) 
                const type_box = document.getElementById(child.id).children[0];
                //console.log(type_box)
                this.types.push(type_box.value);
                }
            });
            //console.log(this.types)
        }
    }

    class title_with_description extends array_text {
        constructor (types,container) {
            super(types,container);
            this.descriptions = [];
        }
        compile_array () {
            const list = document.getElementById(this.container);
            //console.log(list);
            Array.from(list.children).forEach((child) => {
            if (child.id.includes("container")) {
                //console.log(child.id) 
                const title_box = document.getElementById(child.id).children[0];
                const description_box = document.getElementById(child.id).children[1];
                //console.log(title_box)
                //console.log(description_box)
                this.types.push(title_box.value);
                this.descriptions.push(description_box.value);
                }
            });
            //console.log(this.types)
        }
    }

    class dropdown_with_manuals extends json_dropdown_array {
        constructor (types,container) {
            super(types,container);
            this.values = [];
            this.strings = [];
        }
        compile_array () {
            const list = document.getElementById(this.container);
            //console.log(list);
            Array.from(list.children).forEach((child) => {
                if (child.id.includes("container")) {
                    //console.log(child.id) 
                    const type_box = document.getElementById(child.id).children[0];
                    const value_box = document.getElementById(child.id);
                    this.types.push(type_box.children[0].value);
                    this.values.push(value_box.children[1].value)
                }
            })
            //console.log(this.types,this.values);
        }
        compile_string () {
            for (let index = 0; index < this.types.length; index++) {
                if (this.container === "speed_box" || this.container === "senses_box") {
                    this.strings.push(`${this.types[index]} ${this.values[index]} ft.`);
                } else { 
                    this.strings.push(`${this.types[index]} (${this.values[index]})`);
                }
            }
            console.log(this.strings)
        }
    };

    class dropdown_with_auto_maths extends dropdown_with_manuals {
        constructor (types,container) {
            super(types,container);
            this.values = [];
        }
        compile_array () {
            const list = document.getElementById(this.container);
            //console.log(list);
            Array.from(list.children).forEach((child) => {
                if (child.id.includes("container")) {
                    //console.log(child.id) 
                    const type_box = document.getElementById(child.id).children[0];
                    const current_type = type_box.children[0].value;
                    console.log(current_type);
                    const profficency_bonus = proficiency_num.val();
                    let adjusted_value = "";
                    const attribute = () => {
                        const stats = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
                        
                        if (stats.includes(current_type)) {
                            return current_type.toUpperCase().substring(0, 3);
                        } else if (current_type === "Athletics") {
                            return "STR";
                        } else if (["Acrobatics", "Sleight of Hand", "Stealth"].includes(current_type)) {
                            return "DEX";
                        } else if (["Arcana", "History", "Investigation", "Nature", "Religion"].includes(current_type)) {
                            return "INT";
                        } else if (["Animal Handling", "Insight", "Medicine", "Perception", "Survival"].includes(current_type)) {
                            return "WIS";
                        } else if (["Deception", "Intimidation", "Performance", "Persuasion"].includes(current_type)) {
                            return "CHA";
                        } else {
                            console.log("NO SKILL SELECTED");
                        }
                    };
                    console.log(attribute());
                    const ability_score = parseInt(document.getElementById(attribute()).value);
                    console.log(ability_score);
                    const ability_modifier = GETMOD(ability_score);
                    const bonus = () => {
                        if (parseInt(profficency_bonus)){
                            return parseInt(profficency_bonus)
                        } else {
                            return 0
                        }
                    };
                    const total = ability_modifier+ bonus();
                    if (total > 0 ) {
                        adjusted_value = `+${total}`;
                    } else {
                        adjusted_value = `${total}`;
                    }
                    
                    this.values.push(adjusted_value);
                    this.types.push(type_box.children[0].value);
                }
            })
            //console.log(this.types,this.values);
        }
    }

    class action_array {
        constructor (container) {
            this.container = container;
            this.actions = [];
        }
        compile_array (){
            const list = document.getElementById(this.container);
            //console.log(list.children);
            Array.from(list.children).forEach((child) => {
                if (child.id.includes("container")){
                    const action_type = child.children[0].children[0].value
                    if (action_type === "Ability"){
                        const action_object = new ability (child)
                        this.actions.push(action_object) 
                    } else if (action_type === "Attack") {
                        const action_object = new attack (child)
                        this.actions.push(action_object)
                    } else {
                        return console.log("An error occured in the actions")
                    }
                }
            });
        }
    }

    class attack {
        constructor (container) {
            this.container = container
            this.action_category = container.children[0].children[0].value
            this.title = container.children[1].children[0].value
            this.attack_type = container.children[2].children[0].children[0].children[0].value
            this.attribute_type = container.children[3].children[0].children[0].children[0].value
            this.to_hit =container.children[4].children[0].value
            this.range = container.children[5].children[0].value
            this.target =  container.children[6].children[0].value
            this.damage_roll = container.children[7].children[0].value
            this.damage_type = container.children[8].children[0].children[0].children[0].value
            this.description = container.children[9].children[0].value
        }
    }

    class ability {
        constructor (container) {
            this.container = container
            this.action_category = container.children[0].children[0].value
            this.title = container.children[1].children[0].value
            this.description = container.children[1].children[1].value
        }
    }

    class stat {
        constructor (score) {
            this.score = score;
            this.mod = GETMOD(score);
        }
    }

    function XP () {
        if (challenge_num.val() < "1") return "0-100"
        if (challenge_num.val() === "1") return "200"
        if (challenge_num.val() === "2") return "450"
        if (challenge_num.val() === "3") return "700"
        if (challenge_num.val() === "4") return "1100"
        if (challenge_num.val() === "5") return "1800"
        if (challenge_num.val() === "6") return "2300"
        if (challenge_num.val() === "7") return "2900"
        if (challenge_num.val() === "8") return "3900"
        if (challenge_num.val() === "9") return "5000"
        if (challenge_num.val() === "10") return "5900"
        if (challenge_num.val() === "11") return "7200"
        if (challenge_num.val() === "12") return "8400"
        if (challenge_num.val() === "13") return "10000"
        if (challenge_num.val() === "14") return "11500"
        if (challenge_num.val() === "15") return "13000"
        if (challenge_num.val() === "16") return "15000"
        if (challenge_num.val() === "17") return "18000"
        if (challenge_num.val() === "18") return "20000"
        if (challenge_num.val() === "19") return "22000"
        if (challenge_num.val() === "20") return "25000"
        if (challenge_num.val() === "21") return "33000"
        if (challenge_num.val() === "22") return "41000"
        if (challenge_num.val() === "23") return "50000"
        if (challenge_num.val() === "24") return "62000"
        if (challenge_num.val() === "25") return "75000"
        if (challenge_num.val() === "26") return "90000"
        if (challenge_num.val() === "27") return "105000"
        if (challenge_num.val() === "28") return "120000"
        if (challenge_num.val() === "29") return "135000"
        if (challenge_num.val() === "30") return "155000"
        if (challenge_num.val() > "30") {
            const difference = challenge_num.val() - 30;
            const total_xp = 155000 +(difference*20000);
            return total_xp.toString();
        }
        return "0" 
    };

    function GETMOD(score){
        return Math.floor((score-10)/2)
    }

    const final_speed = new dropdown_with_manuals("speed_box");
    final_speed.compile_array();
    final_speed.compile_string();
    const final_saves = new dropdown_with_auto_maths("savingThrows_box");
    final_saves.compile_array();
    final_saves.compile_string();
    const final_skills = new dropdown_with_auto_maths("skills_box");
    final_skills.compile_array();
    final_skills.compile_string();
    const final_resist = new json_dropdown_array("damageResistances_box");
    final_resist.compile_array();
    const final_immune = new json_dropdown_array("damageImmunities_box");
    final_immune.compile_array();
    const final_conditions = new json_dropdown_array("conditionImmunities_box");
    final_conditions.compile_array();
    const final_senses = new dropdown_with_manuals("senses_box");
    final_senses.compile_array();
    final_senses.compile_string();
    const final_languages = new array_text("languagesContainer");
    final_languages.compile_array();
    const final_traits = new title_with_description("traitsContainer");
    final_traits.compile_array();
    const final_actions = new action_array("actionBlock");
    final_actions.compile_array();

    const strength = new stat(str_num.val());
    const dexterity = new stat(dex_num.val());
    const constitution = new stat(con_num.val());
    const intelligence = new stat(int_num.val());
    const wisdom = new stat(wis_num.val());
    const charisma = new stat(cha_num.val());

    const armor = {
        "type":armor_type.val(),
        "value":armor_value.val()
    };
    
    const hitPoints = {
        "hit_dice_num":hit_dice_num.val(),
        "hit_dice_type":hit_dice_type.val(),
        "HP":HP.val(),
        "fromCON":hit_dice_num.val()*GETMOD(con_num.val())
    }

    const monster = {
        "name":monster_name.val(),
        "size":size.val(),
        "category":category.val(),
        "armor_class":armor,
        "hit_points":hitPoints,
        "speed":final_speed,
        "strength":strength,
        "dexterity":dexterity,
        "constitution":constitution,
        "intelligence":intelligence,
        "wisdom":wisdom,
        "charisma":charisma,
        "saves":final_saves,
        "skills":final_skills,
        "resistances":final_resist,
        "immunities":final_immune,
        "conditions":final_conditions,
        "senses":final_senses,
        "languages":final_languages,
        "challenge":`CR ${challenge_num.val()} (${XP()} XP)`,
        "proficiency":`+${proficiency_num.val()}`,
        "traits":final_traits,
        "actions":final_actions,
        "image": imageUrl.val(),
    }

    console.log(monster);
    console.log(JSON.stringify(monster))
    console.log('Request Payload:', JSON.stringify(monster));

    try {
        const response = await fetch('/api/monster/create', {
            method: 'POST',
            body: JSON.stringify(monster),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/chamber');
        } else {
            const errorResponse = await response.json();
            console.error('Monster create failed:', errorResponse);
            alert('Monster create failed');
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        alert('An error occurred during the request');
    }
};

// ensures js is run after HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
    const monster_submit_button = document.getElementById("monsterCreateSubmit");

    // previously getting an error that monsterCreateSubmit returns null, this checks for null before adding the event listener
    if (monster_submit_button) {
        monster_submit_button.addEventListener("click", new_monster_submit);
    }
});