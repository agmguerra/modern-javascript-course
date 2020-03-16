// Storage controller

// Item controller
const ItemCtrl = (function() {
  //Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure / State
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public methods
  return {
    getItems: () => data.items,
    addItem: (name, calories) => {
      let id;

      //Create id
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      //calories to number
      calories = parseInt(calories);
      newItem = new Item(id, name, calories);

      // Add to item array
      data.items.push(newItem);

      return newItem;
    },
    logData: () => data
  }
  
})();


// UI controller
const UICtrl = (function() {
  const uiSelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }
  
  //Public methods
  return {
    populateItemList: (items) => {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>`;
      });

      //insert list items
      document.querySelector(uiSelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      
      return {
        name: document.querySelector(uiSelectors.itemNameInput).value,
        calories: document.querySelector(uiSelectors.itemCaloriesInput).value
      }
    },
    getSelectors: () => uiSelectors

  }

})();

// App controller
const App = (function(itemCtrl, uiCtrl) {
  
  //Load event listeners
  const loadEventListeners = () => {
    //get ui selectors
    const uiSelectors = uiCtrl.getSelectors();

    //Add item event
    document.querySelector(uiSelectors.addBtn).addEventListener('click', itemAddSubmit);

  }

  //Add item submit
  const itemAddSubmit = (e) => {

    const input = uiCtrl.getItemInput();
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.calories);
    }
    
    
    e.preventDefault();
  }

  //Public methods
  return {
    init: function() {

      //Fetch itens from data structure
      const items = itemCtrl.getItems();

      //populate item list
      uiCtrl.populateItemList(items);
      
      //Load event listeners
      loadEventListeners();
      
    }
  }
  
})(ItemCtrl, UICtrl);

App.init();

