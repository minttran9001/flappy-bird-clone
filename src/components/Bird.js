import React from 'react'
import BirdImg from '../images/Asset 3.png'
import { useSelector } from "react-redux";
export default function Bird()
{
    const { y,r } = useSelector((state) => state.bird);
    return(
        <div style={{
            position:'absolute',
            top:y,
            left:100,
            width:38,
            height:26,
            transition:'transform 200ms ,top 200ms',
            transform:`rotate(${r}deg)`,
            background:`url(${BirdImg})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'38px',
        }}>
          
        </div>
    )
}