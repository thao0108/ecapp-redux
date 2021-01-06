import React from 'react';
import { getUserId, getUsername } from "../reducks/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../reducks/users/oprations'

const Home = () => {
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    const uid = getUserId(selector)
    const username = getUsername(selector)
    console.log(selector)
    console.log(uid)

    return(
        <>
            <h2>Home</h2>
            <p>{uid}</p>
            <p>{username}</p>
            <button onClick={() => dispatch(signOut())}>SignOut</button>
        </>
    )
}
export default Home;