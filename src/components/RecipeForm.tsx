import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface Recipe {
  id?: string;
  title: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: 'italian' | 'mexican' | 'asian' | 'american' | 'french' | 'indian' | 'mediterranean' | 'other';
  prep_time?: number;
  cook_time?: number;
  servings?: number;
}

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (recipe: Omit<Recipe, 'id'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const cuisineOptions: Array<'italian' | 'mexican' | 'asian' | 'american' | 'french' | 'indian' | 'mediterranean' | 'other'> = [
  'italian', 'mexican', 'asian', 'american', 'french', 'indian', 'mediterranean', 'other'
];

export const RecipeForm = ({ recipe, onSubmit, onCancel, loading }: RecipeFormProps) => {
  const [formData, setFormData] = useState<Omit<Recipe, 'id'>>({
    title: '',
    ingredients: [''],
    instructions: '',
    difficulty: 'medium',
    cuisine: 'other',
    prep_time: undefined,
    cook_time: undefined,
    servings: 4
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [''],
        instructions: recipe.instructions,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings
      });
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredIngredients = formData.ingredients.filter(ingredient => ingredient.trim() !== '');
    onSubmit({
      ...formData,
      ingredients: filteredIngredients
    });
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => 
        i === index ? value : ingredient
      )
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{recipe ? 'Edit Recipe' : 'Add New Recipe'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Recipe Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter recipe title"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Ingredients *</Label>
              <Button type="button" onClick={addIngredient} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.ingredients.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      size="sm"
                      variant="outline"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Enter cooking instructions"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                  setFormData(prev => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cuisine</Label>
              <Select
                value={formData.cuisine}
                onValueChange={(value: 'italian' | 'mexican' | 'asian' | 'american' | 'french' | 'indian' | 'mediterranean' | 'other') => setFormData(prev => ({ ...prev, cuisine: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine} className="capitalize">
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                min="1"
                value={formData.servings || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  servings: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prep_time">Prep Time (minutes)</Label>
              <Input
                id="prep_time"
                type="number"
                min="0"
                value={formData.prep_time || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  prep_time: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cook_time">Cook Time (minutes)</Label>
              <Input
                id="cook_time"
                type="number"
                min="0"
                value={formData.cook_time || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  cook_time: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="30"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : recipe ? 'Update Recipe' : 'Save Recipe'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};