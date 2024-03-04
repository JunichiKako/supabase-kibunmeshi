import React from "react";
import styles from "./Singup.module.css";

const singUp = () => {
    return (
        <div className={styles.form_container}>
            <div className={styles.form_header}>#新規登録</div>
            <form className={styles.login_form}>
                <div className={styles.form_group}>
                    <label htmlFor="email" className={styles.form_label}>
                        メールアドレス
                    </label>
                    <input
                        id="email"
                        type="text"
                        className={styles.form_input}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="password" className={styles.form_label}>
                        パスワード
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.form_input}
                    />
                </div>
                <div className={styles.form_group_button}>
                    <button type="submit" className={styles.new_button}>
                        新規登録
                    </button>
                </div>
            </form>
        </div>
    );
};

export default singUp;
