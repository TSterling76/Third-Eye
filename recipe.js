// Grocery list - POST https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/map

var dataSet;
var dataEX;

function getRecipesJson(titleKeyword, amount) {

    var apiKey = "hl4Qem5ONzmshsBh8TTKYwDTPDlGp1TeFb1jsnltTh4MAJoIhQ";
    if (amount == null || amount==''){
        amount = 5;
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number="+amount+"&query=" 
    + titleKeyword;
    }
    else
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number="+amount+"&query=" 
    + titleKeyword;
    
    $.ajax({
        type: "GET",
        data: {},
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            dataSet = data;
            console.log((dataSet));
            parseRecipes();
        },

        error: function(err) { 
            alert(err); 
        },

        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
    }

    });

}

function getRecipeIDJson(recipeID) {
    // GET /recipe/{recipeID}
    var apiKey = "hl4Qem5ONzmshsBh8TTKYwDTPDlGp1TeFb1jsnltTh4MAJoIhQ";
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
            recipeID +
            "/information";
            
    $.ajax({
        type: "GET",
        data: {},
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            dataEX = data.extendedIngredients;
            console.log("The Ingredients for your recipes Include..");
            console.log((dataEX));
            parseRecipesInfo();
            // getRecipeJson(data.results[0].id);
        },

        error: function(err) { 
            alert(err); 
        },

        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
        }

    });     
}

function parseRecipes(){
    var json = dataSet;

    var i;
    for(i = 0; i < json.length; i++){
        var obj = json[i];
        console.log("[Result "+(i+1) + "] Recipe ID Number: "+ obj.id+", Recipe Name: " + obj.title);
        getRecipeIDJson(obj.id);

    }
    
    console.log("We found " + i + " results");
}

function parseRecipesInfo(){
    var array = dataEX;

    for(var i = 0; i < array.length; i++){
        var obj = array[i];
       
        console.log("[Result "+(i+1) + "]  The Aisle: " + obj.aisle + ", \n The Name of Ingredient: "+ obj.name + 
        ", \n The Amount of Materials Needed: " + obj.originalString);
   }
}


