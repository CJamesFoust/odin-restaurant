import data from "./menu.json";
import { imageMap } from "./images";
import { fMap } from "./index.js";
var currentMenu = "";

export const setCurrentMenuContext = function (str) {
  currentMenu = str;
};

export const createElementWithClassInnerText = function (obj) {
  let el = obj.el ? obj.el : "div";
  let cList = obj.cList ? obj.cList : null;
  let text = obj.text ? obj.text : null;
  let src = obj.src ? obj.src : imageMap.comingSoon;
  let element = document.createElement(el);

  if (obj.src) {
    let menuItem = data.find((item) => item.imageKey === obj.src);
    src = imageMap[menuItem.imageKey];
  }

  if (el === "img") {
    element.src = src;
    element.style.width = "300px";
    element.style.height = "200px";
    return element;
  }

  if (typeof cList === "string" || cList instanceof String) {
    element.className = cList;
  } else if (Array.isArray(cList)) {
    cList.map((c) => element.classList.add(c));
  }

  if (text !== null) {
    element.innerText = `${text}`;
  }

  return element;
};

export const addMultipleChildrenToParent = function (obj) {
  let parent = obj.parent ? obj.parent : null;
  let children = obj.children ? obj.children : null;

  if (parent === null) {
    console.error("Parent element not present in object. Verify object passed");
    return;
  } else if (children === null) {
    console.error(
      "Children elements not present in object. Verify object passed"
    );
    return;
  }

  if (typeof children === "string" || children instanceof String) {
    parent.appendChild(children);
    return;
  } else if (Array.isArray(children)) {
    children.map((child) => parent.appendChild(child));
    return;
  }

  console.error("Something went wrong. Children not appended");
  return;
};

export const selectCategory = (category, foodGrid) => {
  if (currentMenu === category) {
    return;
  }

  let categoryMenu = data.filter((obj) => obj.category === category);
  let newMenu = [];

  categoryMenu.map((item) => {
    let menuItem = createElementWithClassInnerText({
      cList: ["item", `item-${item.display_order}`],
    });
    let img = createElementWithClassInnerText({
      el: "img",
      src: item.imageKey,
    });
    let itemNamePrice = createElementWithClassInnerText({
      cList: "item-name-price",
    });
    let itemName = createElementWithClassInnerText({
      cList: "item-name",
      text: item.name,
    });
    let itemPrice = createElementWithClassInnerText({
      cList: "item-price",
      text: item.cost,
    });
    let itemDesc = createElementWithClassInnerText({
      cList: "item-desc",
      text: item.description,
    });

    addMultipleChildrenToParent({
      parent: itemNamePrice,
      children: [itemName, itemPrice],
    });
    addMultipleChildrenToParent({
      parent: menuItem,
      children: [img, itemNamePrice, itemDesc],
    });
    newMenu.push(menuItem);
  });

  foodGrid.replaceChildren();

  newMenu.map((item) => {
    foodGrid.appendChild(item);
  });

  setCurrentMenuContext(category);
};

export const generateElementsFromJSON = (data) => {
  return data.map((obj) => {
    let t = obj.t ? obj.t : "div";
    let cl = obj.cl ? obj.cl : null;
    let id = obj.id ? obj.id : null;
    let text = obj.text ? obj.text : null;
    let ev = obj.ev ? obj.ev : null;
    let ch = obj.ch ? obj.ch : null;
    let ph = obj.ph ? obj.ph : null;
    let name = obj.name ? obj.name : null;
    let rows = obj.rows ? obj.rows : null;
    let gch;

    let el = document.createElement(t);

    if (cl !== null) {
      cl.map((c) => el.classList.add(c));
    };

    if (id !== null) {
      el.id = id;
    };

    if (text !== null) {
      el.textContent = text;
    };

    if (ev !== null) {
        let p = ev.p ? ev.p : [null];
        el.addEventListener(ev.evType, () => fMap[ev.f](...p));
    };

    if (ch !== null) {
      gch = generateElementsFromJSON(ch);
      gch.map((c) => {
        el.appendChild(c);
      });
    };

    if (ph !== null) {
        el.placeholder = ph;
    };

    if (name !== null) {
        el.name = name;
    };

    if (rows !== null) {
        el.rows = rows;
    }

    return el;
  });
};
