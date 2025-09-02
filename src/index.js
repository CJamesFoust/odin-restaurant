import "./styles.css";
import about from "./about.json";
import home from "./home.json";
import contact from "./contact.json";
import { createElementWithClassInnerText, addMultipleChildrenToParent, selectCategory, setCurrentMenuContext, generateElementsFromJSON } from "./helpers";

(function() {
    document.querySelector('#home-btn').addEventListener('click', () => renderPage(home));
    document.querySelector('#menu-btn').addEventListener('click', () => renderMenu());
    document.querySelector('#about-btn').addEventListener('click', () => renderPage(about));
    document.querySelector('#contact-btn').addEventListener('click', () => renderPage(contact));
})()

const renderPage = (function(page) {
    const content = document.querySelector('#content');
    const pageEl = generateElementsFromJSON(page);
    content.replaceChildren();
    pageEl.map((el) => {
        content.appendChild(el);
    });
    setCurrentMenuContext("");
});

export const renderMenu = (function() {
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

export const fMap = {
    "renderMenu": renderMenu,
    "selectCategory": selectCategory
}

renderPage(home);
// renderMenu();
