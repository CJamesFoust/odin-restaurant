import "./styles.css";
import { createElementWithClassInnerText, addMultipleChildrenToParent } from "./helpers";
import data from './menu.json' with { type: 'json' };

(function() {
    document.querySelector('#home-btn').addEventListener('click', () => renderHomePage());
    document.querySelector('#menu-btn').addEventListener('click', () => renderMenu());
})()

const renderHomePage = (function() {
    const content = document.querySelector('#content');
    const container  = createElementWithClassInnerText({cList:'container'});
    const welcome = createElementWithClassInnerText({cList:'welcome', text:'WELCOME TO'});
    const restaurantName = createElementWithClassInnerText({cList:'restaurant-name'});
    const ember = createElementWithClassInnerText({text:'Ember'});
    const and = createElementWithClassInnerText({cList:'no-italic', text:'&'});
    const vine = createElementWithClassInnerText({text:'Vine'});
    const slogan = createElementWithClassInnerText({cList:'slogan', text:'Enjoy delicious food and a cozy atmosphere'});
    const viewMenu = createElementWithClassInnerText({el:'button', text: 'VIEW MENU'});
    viewMenu.addEventListener('click', () => renderMenu());
    
    addMultipleChildrenToParent({parent: restaurantName, children: [ember, and, vine]});
    addMultipleChildrenToParent({parent: container, children: [welcome, restaurantName, slogan, viewMenu]});

    content.replaceChildren();
    content.appendChild(container);
});

const renderMenu = (function() {
    const content = document.querySelector('#content');
    const container  = createElementWithClassInnerText({cList:'menu-container'});
    const title = createElementWithClassInnerText({cList: 'title', text: 'MENU'});
    const categories = createElementWithClassInnerText({cList: 'categories'});
    const appBtn = createElementWithClassInnerText({el: 'button', cList: 'category-button', text: 'APPETIZERS'})
    const mainCourseBtn = createElementWithClassInnerText({el: 'button', cList: 'category-button', text: 'MAIN COURSES'})
    const dessertsBtn = createElementWithClassInnerText({el: 'button', cList: 'category-button', text: 'DESSERTS'})
    const beveragesBtn = createElementWithClassInnerText({el: 'button', cList: 'category-button', text: 'BEVERAGES'})
    const foodGrid = createElementWithClassInnerText({cList: 'food-grid'});

    //change when implementing categories
    data.map((item) => {
        let menuItem = createElementWithClassInnerText({cList: ['item', `item-${item.display_order}`]});
        let img = createElementWithClassInnerText({el: 'img', src: item.imageKey});
        let itemNamePrice = createElementWithClassInnerText({cList: 'item-name-price'});
        let itemName = createElementWithClassInnerText({cList: 'item-name', text: item.name});
        let itemPrice = createElementWithClassInnerText({cList: 'item-price', text: item.cost});
        let itemDesc = createElementWithClassInnerText({cList: 'item-desc', text: item.description});

        addMultipleChildrenToParent({parent: itemNamePrice, children: [itemName, itemPrice]});
        addMultipleChildrenToParent({parent: menuItem, children: [ img, itemNamePrice, itemDesc]});
        foodGrid.appendChild(menuItem);
    })

   
    addMultipleChildrenToParent({parent: categories, children: [appBtn, mainCourseBtn, dessertsBtn, beveragesBtn]});
    addMultipleChildrenToParent({parent: container, children: [title, categories, foodGrid]});
    content.replaceChildren();
    content.appendChild(container);
})

// renderHomePage();
renderMenu();
