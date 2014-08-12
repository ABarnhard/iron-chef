'use strict';

function Recipe(o){
  this.name = o.name;
  this.photo = o.photo;
  this.ingredients = o.ingredients;
  this.directions = o.directions;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.find = function(cb){
  Recipe.collection.find().toArray(cb);
};

module.exports = Recipe;
