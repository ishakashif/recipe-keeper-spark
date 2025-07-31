import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Edit, Trash2 } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: 'italian' | 'mexican' | 'asian' | 'american' | 'french' | 'indian' | 'mediterranean' | 'other';
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  created_at: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

export const RecipeCard = ({ recipe, onEdit, onDelete }: RecipeCardProps) => {
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
          <div className="flex gap-2 ml-2">
            <Badge variant="outline" className="capitalize">
              {recipe.cuisine}
            </Badge>
            <Badge className={difficultyColors[recipe.difficulty]}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Ingredients:</h4>
            <p className="text-sm line-clamp-3">
              {recipe.ingredients.slice(0, 3).join(', ')}
              {recipe.ingredients.length > 3 && '...'}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Instructions:</h4>
            <p className="text-sm line-clamp-3">{recipe.instructions}</p>
          </div>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            {totalTime > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{totalTime} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(recipe)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(recipe.id)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};