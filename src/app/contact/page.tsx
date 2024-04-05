"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const Contact = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // 同じく、フォームの内容をクリアする関数
    const clearForm = () => {
        setName("");
        setEmail("");
        setMessage("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirmSubmit = async () => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                alert("お問い合わせが正常に送信されました。");
                clearForm();
            } else {
                const errorData = await response.json();
                alert(
                    `送信に失敗しました。${
                        errorData.message || "再度お試しください。"
                    }`
                );
            }
        } catch (error) {
            console.error(error);
            alert("エラーが発生しました。再度お試しください。");
        }
        setShowConfirmModal(false);
    };

    return (
        <div className="contact-block">
            <div className="contact-block__title">#Contact</div>
            <div className="contact-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="label">
                        名前<span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        className="input"
                    />

                    <label htmlFor="email" className="label">
                        メールアドレス<span className="required">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        className="input"
                    />

                    <label htmlFor="message" className="label">
                        お問い合わせ内容
                        <span className="required">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setMessage(e.target.value)
                        }
                        className="textarea"
                    />
                    <button type="submit" className="submit-btn">
                        送信
                    </button>
                </form>
                {/* モーダル */}
                {showConfirmModal && (
                    <div className="modal_overlay">
                        <div className="confirm_modal">
                            <h2>内容確認</h2>
                            <p>名前: {name}</p>
                            <p>メールアドレス: {email}</p>
                            <p>メッセージ: {message}</p>
                            <button onClick={handleConfirmSubmit}>
                                確認して送信
                            </button>
                            <button onClick={() => setShowConfirmModal(false)}>
                                キャンセル
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;
