import  { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiSlice from "../app/apiSlice";
import { removeToken } from "./features/auths/authSlice";


export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(removeToken());
        dispatch(apiSlice.util.resetApiState());
        navigate("/user");
    }, []);

    return null;
}