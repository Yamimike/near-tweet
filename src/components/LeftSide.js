import React from "react";
import './Sidebar.css';
import SidebarOptions from './SidebarOptions';

import Bell from "./Icons/Bell";
import Group from "./Icons/Group";
import Home from "./Icons/Home";
import Hashtag from "./Icons/Hashtag";
import Mail from "./Icons/Mail";
import Bookmark from "./Icons/Bookmark";
import User from "./Icons/User";
import More from "./Icons/More";



export default function LeftSide() {







  return (

    <div className="sidebar">
  
    <SidebarOptions
        Icon={Home}
        text="Home" />
    <SidebarOptions
        Icon={Hashtag}
        text="Explore" />
    <SidebarOptions
        Icon={Bell}
        text="Notifications" />
    <SidebarOptions
        Icon={Mail}
        text="Messeage" />
    <SidebarOptions
        Icon={Bookmark}
        text="Bookmark" />
    <SidebarOptions
        Icon={Group}
        text="List" />
    <SidebarOptions
        Icon={User}
        text="Profile" />
    <SidebarOptions
        Icon={More}
        text="More" />
</div>

    
  );
}
