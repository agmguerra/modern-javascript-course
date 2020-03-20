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
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300}
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

    getItemById: (id) => {
      let found = null;

      //Loop through items
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },

    logData: () => data,

    setCurrentItem: (item) => {
      data.currentItem = item;
    },

    getCurrentItem: () => {
      return data.currentItem;
    },

    getTotalCalories: () => {
      let total = 0;

      data.items.forEach((item) => {
        total += item.calories;
      });

      // Set total calories
      data.totalCalories = total;
      return total;
    }
  }
  
})();


// UI controller
const UICtrl = (function() {
  const uiSelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
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
    addListItem: (item) => {
      //show the list
      document.querySelector(uiSelectors.itemList).style.display = 'block'

      // crete li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`

      //Add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      
      //Insert item
      document.querySelector(uiSelectors.itemList).insertAdjacentElement('beforeend', li);
      
    },
    clearInput: () => {
       document.querySelector(uiSelectors.itemNameInput).value = '';
       document.querySelector(uiSelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: (currentItem) => {
      document.querySelector(uiSelectors.itemNameInput).value = currentItem.name;
      document.querySelector(uiSelectors.itemCaloriesInput).value = currentItem.calories;
      UICtrl.showEditState();
    },
    hideList: () => {
      document.querySelector(uiSelectors.itemList).style.display = 'none';
    },
    showTotalCalories: (total) => {
      document.querySelector(uiSelectors.totalCalories).textContent = total;
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(uiSelectors.updateBtn).style.display = 'none';
      document.querySelector(uiSelectors.deleteBtn).style.display = 'none';
      document.querySelector(uiSelectors.backBtn).style.display = 'none';
      document.querySelector(uiSelectors.addBtn).style.display = 'inline';
    },
    showEditState: () => {
      document.querySelector(uiSelectors.updateBtn).style.display = 'inline';
      document.querySelector(uiSelectors.deleteBtn).style.display = 'inline';
      document.querySelector(uiSelectors.backBtn).style.display = 'inline';
      document.querySelector(uiSelectors.addBtn).style.display = 'none';
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

    //Edit icon click event
    document.querySelector(uiSelectors.itemList).addEventListener('click', itemUpdateSubmit);

  }

  //Add item submit
  const itemAddSubmit = (e) => {

    const input = uiCtrl.getItemInput();
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.calories);

      //Add item to UI list
      uiCtrl.addListItem(newItem);

      //Get total calories
      const totalCaloires = itemCtrl.getTotalCalories();

      //Add total calories  to UI
      uiCtrl.showTotalCalories(totalCaloires);

      //Clear fields
      uiCtrl.clearInput();
    }
    
    
    e.preventDefault();
  }

  //Update item submit
  const itemUpdateSubmit = (e) => {
    if (e.target.classList.contains('edit-item')) {
      //get list item id
      const listId = e.target.parentNode.parentNode.id;

      //break into an array
      const listIdArr = listId.split('-');

      //get actual id
      const id = parseInt(listIdArr[1]);

      //get item 
      const itemToEdit = itemCtrl.getItemById(id);
      
      // set the current item
      itemCtrl.setCurrentItem(itemToEdit);

      //Add item to form
      uiCtrl.addItemToForm(itemCtrl.getCurrentItem());
      

    }
    
    e.preventDefault();
  }

  //Public methods
  return {
    init: function() {
      
      //Clear edit state / set initial state
      uiCtrl.clearEditState();

      //Fetch itens from data structure
      const items = itemCtrl.getItems();

      //Check if any itens
      if (items.length === 0) {
        uiCtrl.hideList();
      } else {
        //populate item list
        uiCtrl.populateItemList(items);
      }

      //Get total calories
      const totalCaloires = itemCtrl.getTotalCalories();

      //Add total calories  to UI
      uiCtrl.showTotalCalories(totalCaloires);
      
      //Load event listeners
      loadEventListeners();
      
    }
  }
  
})(ItemCtrl, UICtrl);

App.init();

