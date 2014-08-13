'use strict';

var Recipe = require('../models/recipe');

exports.index = function(req, res){
  Recipe.find(function(err, recipes){
    res.render('recipes/index', {recipes:recipes});
  });
};

exports.create = function(req, res){
  Recipe.create(req.body, function(err, recipe){
    res.render('recipes/recipe', {recipe:recipe});
  });
};

exports.destroy = function(req, res){
  Recipe.remove(req.params.id, function(data){
    res.send(data);
  });
};

