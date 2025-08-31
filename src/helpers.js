import data from './menu.json';
import { imageMap } from "./images";

export const createElementWithClassInnerText = function(obj) {
    let el = obj.el ? obj.el : 'div';
    let cList = obj.cList ? obj.cList : null;
    let text = obj.text ? obj.text : null;
    let src = obj.src ? obj.src : imageMap.comingSoon;
    let element = document.createElement(el);

    if (obj.src) {
        let menuItem = data.find(item => item.imageKey === obj.src)
        src = imageMap[menuItem.imageKey];
    }

    if(el === 'img') {
        element.src = src;
        element.style.width = '300px';
        element.style.height = '200px';
        return element;
    }

    if (typeof cList === 'string' || cList instanceof String) {
        element.className = cList;
    } else if (Array.isArray(cList)) {
        cList.map(c => element.classList.add(c));
    }

    if (text !== null) {
        element.innerText = `${text}`;
    }

    return element;
}

export const addMultipleChildrenToParent = function(obj) {
    let parent = obj.parent ? obj.parent : null;
    let children = obj.children ? obj.children : null;

    if (parent === null) {
        console.error('Parent element not present in object. Verify object passed');
        return;
    } else if (children === null) {
        console.error('Children elements not present in object. Verify object passed');
        return;
    }

    if (typeof children === 'string' || children instanceof String) {
        parent.appendChild(children);
        return;
    } else if (Array.isArray(children)) {
        children.map(child => parent.appendChild(child));
        return;
    }
    
    console.error('Something went wrong. Children not appended');
    return;
}