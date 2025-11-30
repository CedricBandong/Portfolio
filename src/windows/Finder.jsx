import React from 'react'
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";
import useLocationStore from "#store/location";
import { locations } from "#constants/index.js";
import clsx from "clsx";
import useWindowStore from "#store/window";

const Finder = () => {
    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore(); 
    const openItem = (item) => {
        if(item.fileType === "pdf") return openWindow("resume");
        if(item.kind === "folder") return setActiveLocation(item);
        if(["fig", "url"].includes(item.fileType) && item.href) 
            return window.open(item.href, "_blank");

        openWindow(`${item.fileType}${item.kind}`, item)
    };
    
    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>

            <div style={{ height: "13vh" }}>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActiveLocation(item)}
                        className={clsx(
                            "flex items-center gap-2 p-1 rounded cursor-pointer",
                            item.id === activeLocation.id
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100"
                        )}
                    >
                        <img src={item.icon} alt={item.name} className="w-4 h-4" />
                            <span className="text-sm truncate max-w-[120px]">
                                {item.name}
                            </span>
                        </li>
                ))}
                </ul>
                </div>
            </div>
            );

  return (
    <>
        <div id="window-header">
            <WindowControls target="finder" />
            <Search className="icon" />
        </div>

        <div className="bg-white flex h-full">
            <div className="sidebar">
                    {renderList('Favorites', Object.values(locations))}
                    {renderList('My Projects', locations.work.children)}
            </div>
            
            <ul className="content">
                {activeLocation?.children.map((item) => (
                    <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                        <img src={item.icon} alt={item.name} />
                        <p>
                            {item.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>

    </>
  )
}

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow