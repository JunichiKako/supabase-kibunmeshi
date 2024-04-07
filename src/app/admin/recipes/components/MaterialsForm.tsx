import { Material } from "../../../types/recipe";

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
}) => {
    return (
        <div className="materials-container">
            <h2 className="materials-container__title">材料：</h2>
            {materials.map((material, index) => (
                <div key={index} className="material-item">
                    <div className="material-group">
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
                            className="input-field"
                            placeholder="材料名"
                        />
                    </div>
                    <div className="quantity-group">
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
                            className="input-field"
                            placeholder="分量"
                        />
                    </div>
                    <div className="button-group">
                        {materials.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeMaterial(index)}
                                className="remove-button"
                            >
                                削除
                            </button>
                        )}
                        {index === materials.length - 1 && (
                            <button
                                type="button"
                                onClick={addMaterial}
                                className="add-button"
                            >
                                追加
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaterialsForm;
