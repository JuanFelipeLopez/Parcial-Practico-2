import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl: string = 'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas';

  constructor(private http: HttpClient) {}

  // tener recetas
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipe.json`);
  }

  // tener receta por ID
  getRecipeDetail(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}/recipe.json`);
  }
}
