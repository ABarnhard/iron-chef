'use strict';

function Recipe(o){
  this.created = new Date();
  this.name = o.name;
  this.photo = o.photo;
  this.ingredients = o.ingredients.split(',').map(function(s){return s.trim();});
  this.directions = o.directions.split(';').map(function(s){return s.trim();});
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.find = function(cb){
  Recipe.collection.find({}, {sort:{created: -1}}).toArray(cb);
};

Recipe.create = function(obj, cb){
  var r = new Recipe(obj);
  Recipe.collection.save(r, cb);
};

module.exports = Recipe;
