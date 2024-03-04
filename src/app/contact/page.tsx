"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Contact.module.css";

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
            // APIキーのチェックは不要になるため削除します

            // 環境変数の値をチェックする部分を削除し、
            // Next.jsのAPIルートにリクエストを送信するように変更します。
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                alert("お問い合わせが正常に送信されました。");
                clearForm(); // フォームの内容をクリア
            } else {
                const errorData = await response.json(); // エラーレスポンスの内容を取得
                alert(
                    `送信に失敗しました。${
                        errorData.message || "再度お試しください。"
                    }`
                );
            }
        } catch (error) {
            console.error(error); // エラー内容をコンソールに出力
            alert("エラーが発生しました。再度お試しください。");
        }
        setShowConfirmModal(false); // モーダルを閉じる
    };

    return (
        <div>
            <div className={styles.contact_title}>#Contact</div>
            <div className={styles.contact_container}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className={styles.label}>
                        名前<span className={styles.required}>*</span>
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
                        className={styles.input}
                    />

                    <label htmlFor="email" className={styles.label}>
                        メールアドレス<span className={styles.required}>*</span>
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
                        className={styles.input}
                    />

                    <label htmlFor="message" className={styles.label}>
                        お問い合わせ内容
                        <span className={styles.required}>*</span>
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
                        className={styles.textarea}
                    />
                    <button type="submit" className={styles.submit_btn}>
                        送信
                    </button>
                </form>
                {/* モーダル */}
                {showConfirmModal && (
                    <div className={styles.modal_overlay}>
                        {" "}
                        {/* オーバーレイの追加 */}
                        <div className={styles.confirm_modal}>
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
