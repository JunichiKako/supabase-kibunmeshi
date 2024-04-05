
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
                <div key={index} className="howToItem">
                    <label className="stepLabel">{`手順 ${
                        index + 1
                    }`}</label>
                    <textarea
                        value={howTo.text}
                        onChange={(e) =>
                            handleHowToChange(index, e.target.value)
                        }
                        className="textArea"
                        placeholder="手順をここに入力"
                    />
                    <div className="buttonContainer">
                            <button
                                type="button"
                                onClick={() => removeHowTo(index)}
                            >
                                削除
                            </button>
                        {index === howTos.length - 1 && (
                            <button
                                type="button"
                                onClick={addHowTo}
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
