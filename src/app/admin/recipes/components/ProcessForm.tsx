// ProcessForm.tsx
import React from "react";
import styles from "../new/CreateRecipeForm.module.css";

type HowTo = {
    text: string;
};

type ProcessFormProps = {
    howTos: HowTo[];
    addHowTo: () => void;
    removeHowTo: (index: number) => void;
    handleHowToChange: (index: number, newText: string) => void;
};

const ProcessForm: React.FC<ProcessFormProps> = ({
    howTos,
    addHowTo,
    removeHowTo,
    handleHowToChange,
}) => {
    return (
        <>
            {howTos.map((howTo, index) => (
                <div key={index} className={styles.howToItem}>
                    <label className={styles.stepLabel}>{`手順 ${
                        index + 1
                    }`}</label>
                    <textarea
                        value={howTo.text}
                        onChange={(e) =>
                            handleHowToChange(index, e.target.value)
                        }
                        className={styles.textArea}
                        placeholder="手順をここに入力"
                    />
                    <div className={styles.buttonContainer}>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeHowTo(index)}
                                className={`${styles.button} ${styles.removeButton}`}
                            >
                                削除
                            </button>
                        )}
                        {index === howTos.length - 1 && (
                            <button
                                type="button"
                                onClick={addHowTo}
                                className={`${styles.button} ${styles.addButton}`}
                            >
                                手順を追加
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProcessForm;
