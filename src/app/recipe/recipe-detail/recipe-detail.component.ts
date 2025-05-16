import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;

  ingredienteMayor: { name: string; quantity: number } | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.recipeService.getRecipeDetail(id).subscribe(data => {
        this.recipe = data;
        this.calcularIngredienteMayor();
      });
    }
  }

  calcularIngredienteMayor(): void {
    if (this.recipe && this.recipe.ingredientes?.length) {
      let max = 0;
      let mayor = this.recipe.ingredientes[0];

      for (let ing of this.recipe.ingredientes) {
        const cantidadNum = Number(ing.cantidad);
        if (!isNaN(cantidadNum) && cantidadNum > max) {
          max = cantidadNum;
          mayor = ing;
        }
      }

      this.ingredienteMayor = {
        name: mayor.nombre,
        quantity: max
      };
    }
  }
}
