import React, { useState } from "react";
import { NavigationItem, RootNavigationItem } from "../NavigationBar.types";
import { Button } from "../../Button";
import { ComponentVariants } from "../../types";

export default function NavigationItem(
    {id, name, expandable = false, expanded = false, variant, defaultVariant, childs, onClick}
    : RootNavigationItem & {defaultVariant?: ComponentVariants }
  ) {
    const vari = variant ? variant : defaultVariant;
    const [isExpanded, setIsExpanded] = useState(expanded)
    const handleClick = () => {
      if(expandable){
        setIsExpanded((val)=>!val)
      }else{
        if(onClick) onClick();
      }
    };
  return (
    <li key={id} className="relative ">
      <Button 
        variant={vari} 
        layout={expandable? "icon-navigation": "navigation"} 
        icon={isExpanded? "chevronUp": "chevronDown"} 
        onClick={handleClick}>
        {name}
      </Button>
      
      {childs ? (
        <ul className={`group ${isExpanded? "flex": "hidden"} absolute top-full mt-2  flex-1 list-none items-center justify-center flex-col space-y-1`}>
          {childs.map((child) => {
            return (
              <NavigationItem
                {...child}
                defaultVariant={defaultVariant ? defaultVariant : variant}
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}
