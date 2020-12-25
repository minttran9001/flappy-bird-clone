import React from 'react'
import ForegroundImg from '../images/fg.png'
export default function Foreground()
{
    return(
        <div style={{
            position:'absolute',
            bottom:0,
            width:288,
            height:100,
            background:`url(${ForegroundImg})`,
        }}>
            
        </div>
    )
}