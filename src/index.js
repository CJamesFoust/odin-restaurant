import "./styles.css";
import aboutPage from "./about.json";
import { createElementWithClassInnerText, addMultipleChildrenToParent, selectCategory, setCurrentMenuContext, generateElementsFromJSON } from "./helpers";

(function() {
    document.querySelector('#home-btn').addEventListener('click', () => renderHomePage());
    document.querySelector('#menu-btn').addEventListener('click', () => renderMenu());
    document.querySelector('#about-btn').addEventListener('click', () => renderAbout());
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
    setCurrentMenuContext("");
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

    appBtn.addEventListener('click', () => {
        selectCategory("starter", foodGrid);
    })
    mainCourseBtn.addEventListener('click', () => {
        selectCategory("main", foodGrid);
    })
    dessertsBtn.addEventListener('click', () => {
        selectCategory("dessert", foodGrid);
    })
    beveragesBtn.addEventListener('click', () => {
        selectCategory("beverage", foodGrid);
    })

    

    selectCategory("starter", foodGrid)
   
    addMultipleChildrenToParent({parent: categories, children: [appBtn, mainCourseBtn, dessertsBtn, beveragesBtn]});
    addMultipleChildrenToParent({parent: container, children: [title, categories, foodGrid]});
    content.replaceChildren();
    content.appendChild(container);
})

const renderAbout = (function() {
    const content = document.querySelector('#content');
    const pageEl = generateElementsFromJSON(aboutPage);
    content.replaceChildren();
    pageEl.map((el) => {
        content.appendChild(el);
    });
    setCurrentMenuContext("");
})

renderHomePage();
// renderMenu();
// renderAbout();
