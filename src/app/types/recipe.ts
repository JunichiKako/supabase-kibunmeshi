export interface Recipe {
    id: string;
    title: string;
    category: {
        title: string;
    };
    recipes: Array<{
        img?: {
            url: string;
        };
        name?: string;
        fieldId: string;
        material?: string;
        quantity?: string;
        howTo?: string;
    }>;
}

export interface RecipeList {
    contents: Recipe[];
}

export interface Category {
    id: string;
    title: string;
}

export interface CategoryData {
    contents: Recipe[];
}

export interface searchRecipe {
    id: string;
    title: string;
    recipes: {
        img: {
            url: string;
        };
    }[];
}

export interface Material {
    name: string;
    quantity: string;
}

export interface HowTo {
    text: string;
}
