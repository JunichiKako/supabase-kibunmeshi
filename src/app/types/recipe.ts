export interface Material {
    id?: number;
    name: string;
    quantity: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface HowTo {
    id: number;
    index: number;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Recipe {
    id: number;
    title: string;
    thumbnailUrl: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
    materials: Material[];
    howTos: HowTo[];
}

// MicroCMSのAPIのレスポンスの型を定義

export interface MicoroCmsRecipe {
    id: string;
    title: string;
    thumbnail: {
        url: string;
    };
    category: {
        id: string;
        name: string;
    };
    materials: {
        id: string;
        name: string;
        quantity: string;
    }[];
    howTo: {
        id: string;
        index: number;
        text: string;
    }[];
    createdAt: string;
    updatedAt: string;
}
