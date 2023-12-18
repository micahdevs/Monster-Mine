// const monster_submit_button = $('#monsterCreateSubmit');
const monster_submit_button = document.getElementById("monsterCreateSubmit");
const monster_name = $('#name-form');
const size = $('#size');
const category = $('#category-form');
const armor_type = $("#armor-type-form");
const armor_value = $("#armor-class-form")
const hitPoints = $('hitPoints-form');
const walk_speed =$('walk-speed-form');
const fly_speed = $('fly-speed-form');
const swim_speed =$('swim-speed-form');
const climb_speed = $('climb-speed-form');

const armor = {
    "type":armor_type.val(),
    "value":armor_value.val()
}


const monster = {
    "name":monster_name.val(),
    "user_id":session.user_id,
    "size":size.val(),
    "category":category.val(),
    "armor_class":armor

}



function new_monster_submit () {
    console.log("Hey There")
    console.log(monster_name.val()); 
    console.log(size.val());
    console.log(category.val()); 
};





monster_submit_button.addEventListener("click",new_monster_submit);