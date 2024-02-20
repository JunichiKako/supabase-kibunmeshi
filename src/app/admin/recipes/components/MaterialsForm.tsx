// MaterialsForm.tsx
import React from "react";
import styles from "../new/CreateRecipeForm.module.css";

type Material = {
    name: string;
    quantity: string;
};

type MaterialsFormProps = {
    materials: Material[];
    handleMaterialChange: (
        index: number,
        field: keyof Material,
        value: string
    ) => void;
    addMaterial: () => void;
    removeMaterial: (index: number) => void;
};


const MaterialsForm: React.FC<MaterialsFormProps> = ({
    materials,
    handleMaterialChange,
    addMaterial,
    removeMaterial,
}

) => {
    return (
        <div className={styles.materialsContainer}>
            {materials.map((material, index) => (
                <div key={index} className={styles.materialItem}>
                    <div className={styles.inputGroup}>
                        {index === 0 && (
                            <label
                                htmlFor={`materialName-${index}`}
                                className={styles.label}
                            >
                                材料
                            </label>
                        )}
                        <input
                            id={`materialName-${index}`}
                            type="text"
                            value={material.name}
                            onChange={(e) =>
                                handleMaterialChange(
                                    index,
                                    "name",
                                    e.target.value
                                )
                            }
                            className={styles.inputField}
                            placeholder="材料名"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        {index === 0 && (
                            <label
                                htmlFor={`materialQuantity-${index}`}
                                className={styles.label}
                            >
                                分量
                            </label>
                        )}
                        <input
                            id={`materialQuantity-${index}`}
                            type="text"
                            value={material.quantity}
                            onChange={(e) =>
                                handleMaterialChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                )
                            }
                            className={styles.inputField}
                            placeholder="分量"
                        />
                    </div>
                    {materials.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeMaterial(index)}
                            className={`${styles.button} ${styles.removeButton}`}
                        >
                            削除
                        </button>
                    )}
                    {index === materials.length - 1 && (
                        <button
                            type="button"
                            onClick={addMaterial}
                            className={`${styles.button} ${styles.addButton}`}
                        >
                            追加
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MaterialsForm;
