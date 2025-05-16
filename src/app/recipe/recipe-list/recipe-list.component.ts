import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  cantidadesIngredientes: number[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      console.log('Recetas cargadas:', data); 
      this.recipes = data;

      this.cantidadesIngredientes = this.recipes.map(recipe =>
        recipe.ingredientes?.length || 0
      );
    });
  }
}
