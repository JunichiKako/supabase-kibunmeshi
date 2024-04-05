
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
}

) => {
    return (
        <div className="materialsContainer">
            {materials.map((material, index) => (
                <div key={index} className="materialItem">
                    <div className="inputGroup">
                        {index === 0 && (
                            <label
                                htmlFor={`materialName-${index}`}
                                className="label"
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
                            className="inputField"
                            placeholder="材料名"
                        />
                    </div>
                    <div className="inputGroup">
                        {index === 0 && (
                            <label
                                htmlFor={`materialQuantity-${index}`}
                                className="label"
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
                            className="inputField"
                            placeholder="分量"
                        />
                    </div>
                    {materials.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeMaterial(index)}
                        >
                            削除
                        </button>
                    )}
                    {index === materials.length - 1 && (
                        <button
                            type="button"
                            onClick={addMaterial}
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
