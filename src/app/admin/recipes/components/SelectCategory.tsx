

import { useEffect, useState } from "react";
import { Category } from "../../../types/recipe";

type SelectCategoryProps = {
    categoryId: number; // 選択されたカテゴリーID
    setCategoryId: (categoryId: number) => void;
};

const SelectCategory: React.FC<SelectCategoryProps> = ({
    categoryId,
    setCategoryId,
}) => {
    const [categories, setCategories] = useState<Category[]>([]); 

    useEffect(() => {
        const fetcher = async () => {
            const res = await fetch("/api/categories");
            const { categories } = await res.json();
            setCategories(categories);
        };

        fetcher();
    }, []);

    return (
        <div className="categoryContainer">
            <div className="categoryContainer">
                <label>カテゴリ:</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="selectField"
                >
                    <option value="0">カテゴリを選択</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectCategory;
