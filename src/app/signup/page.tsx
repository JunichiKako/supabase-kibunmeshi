import React from "react";
import "../login/form.css";

const singUp = () => {
    return (
        <div className="form-container">
            <div className="form-header">#新規登録</div>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">メールアドレス</label>
                    <input id="email" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">パスワード</label>
                    <input id="password" type="password" />
                </div>
                <div className="form-group form-group-button">
                    <button type="submit" className="form-button new">
                        新規登録
                    </button>
                </div>
            </form>
        </div>
    );
};

export default singUp;
