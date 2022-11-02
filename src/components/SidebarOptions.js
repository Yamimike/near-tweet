import React from 'react'
import './SidebarOptions.css'


function SidebarOptions({ active, text, Icon}) {
    return (
        <div className = {`sidebarOptions ${active &&
            'sidebarOptions--active'}`}>
           <div className='Icon'> <Icon /> </div> 
            <h2>{text}</h2>
        </div>
    )
} 

export default SidebarOptions