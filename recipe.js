// Grocery list - POST https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/map
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
             console.log((data));
             parseRecipes(data);
        // getRecipeIDJson(data.results[0].id);
        
        },

        error: function(err) { 
            alert(err); 
        },

        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
    }

    })

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

            console.log((data.extendedIngredients));
            parseIngredients(data.extendedIngredients);
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

function parseIngredients(data){
   var array = data;

   for(var i = 0; i < array.length; i++){
        var obj = array[i];
        
        console.log("[Result "+(i+1) + "]  The Aisle: " + obj.aisle + ", \n The Name of Ingredient: "+ obj.name + 
        ", \n The Amount of Materials Needed: " + obj.originalString);
   }
}

function parseRecipes(data){
    var json = data;

    for(var i = 0; i < json.length; i++){
        var obj = json[i];
        console.log("[Result "+(i+1) + "] Recipe ID Number: "+ obj.id+", Recipe Name: " + obj.title + ", with Image:"+ obj.image);
        getRecipeIDJson(obj.id);
       
   }


}
