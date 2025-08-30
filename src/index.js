import "./styles.css";
import { createElementWithClassInnerText, addMultipleChildrenToParent } from "./helpers";

const navigateToHomePage = (function() {
    const content = document.querySelector('#content');
    const container  = createElementWithClassInnerText({el:'div', cList:'container'});
    const welcome = createElementWithClassInnerText({el:'div', cList:'welcome', text:'WELCOME TO'});
    const restaurantName = createElementWithClassInnerText({el:'div', cList:'restaurant-name'});
    const ember = createElementWithClassInnerText({el:'div', text:'Ember'});
    const and = createElementWithClassInnerText({el:'div', cList:'no-italic', text:'&'});
    const vine = createElementWithClassInnerText({el:'div', text:'Vine'});
    const slogan = createElementWithClassInnerText({el:'div', cList:'slogan', text:'Enjoy delicious food and a cozy atmosphere'});
    const viewMenu = createElementWithClassInnerText({el:'button', text: 'VIEW MENU'});
    
    addMultipleChildrenToParent({parent: restaurantName, children: [ember, and, vine]});
    addMultipleChildrenToParent({parent: container, children: [welcome, restaurantName, slogan, viewMenu]});

    content.replaceChildren();
    content.appendChild(container);
});

navigateToHomePage();
