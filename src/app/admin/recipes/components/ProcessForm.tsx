
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
        <div className="howto-container">
            {howTos.map((howTo, index) => (
                <div key={index} className="howto-item">
                    <label>{`手順 ${
                        index + 1
                    }`}</label>
                    <textarea
                        value={howTo.text}
                        onChange={(e) =>
                            handleHowToChange(index, e.target.value)
                        }
                        className="textarea"
                        placeholder="手順をここに入力"
                    />
                    <div className="button-container">
                            <button
                                type="button"
                                onClick={() => removeHowTo(index)}
                                className="remove-button"
                            >
                                削除
                            </button>
                        {index === howTos.length - 1 && (
                            <button
                                type="button"
                                onClick={addHowTo}
                                className="add-button"
                            >
                                手順を追加
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProcessForm;
