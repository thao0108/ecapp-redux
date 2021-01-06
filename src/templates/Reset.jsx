import React, {useState, useCallback} from "react";
import { PrimaryButton, TextInput } from '../components/UIkit';
import { resetPassword } from "../reducks/users/oprations";
import { useDispatch } from "react-redux";

const Reset = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");

          const inputEmail = useCallback((event) => {
            setEmail(event.target.value)
          }, [setEmail]);    

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
            <div className="module-spacer--medium" />

            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton 
                    label={"パスワードをリセット"}
                    // operateを呼び出す
                    onClick={() => dispatch(resetPassword(email))}
                /> 
            </div>

        </div>
    )
}
export default Reset;