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

// supabase
export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface RecipeData {
    id: number; // 数値型に変更
    title: string;
    thumbnailUrl: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
    materials: Material[];
    howTos: HowTo[];
}
