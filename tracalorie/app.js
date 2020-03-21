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

    updateItem: (name, calories) => {
      //Calories to number
      calories = parseInt(calories);

      let found = null;

      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].id === data.currentItem.id) {
          data.items[i].name = name;
          data.items[i].calories = calories;
          found = data.items[i];
          break;
        }   
      }

      return found;
    },

    deleteItem: (id) => {
      //Get ids
      const ids = data.items.map((item) => {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Renove item
      data.items.splice(index, 1);

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
    listItems: '#item-list li',
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
    updateListItem: (item) => {
      let listItems = document.querySelectorAll(uiSelectors.listItems);

      //Turn node list into array
      listItems = Array.from(listItems);
      
      for (let i = 0; i < listItems.length; i++) {
        const itemID = listItems[i].getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
        
      }


    },

    deleteListItem: (id) => {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
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
    clearEditState: (e) => {
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

    // Disable submit on enter (codigo 13)
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit icon click event
    document.querySelector(uiSelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(uiSelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Update item event
    document.querySelector(uiSelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    //Back btn event
    document.querySelector(uiSelectors.backBtn).addEventListener('click', (e) => {
      uiCtrl.clearEditState();
      e.preventDefault();
    });

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

  //Edit item click
  const itemEditClick = (e) => {
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

  // Update item submit
  const itemUpdateSubmit = (e) => {
    //get item input
    const input = uiCtrl.getItemInput();

    //Update item
    const updateItem = itemCtrl.updateItem(input.name, input.calories);
    
    //Update ui
    uiCtrl.updateListItem(updateItem);

    //Get total calories
    const totalCaloires = itemCtrl.getTotalCalories();

    //Add total calories  to UI
    uiCtrl.showTotalCalories(totalCaloires);

    //Clear edit state
    uiCtrl.clearEditState();

    e.preventDefault();
  }

  //Delete button event
  const itemDeleteSubmit = (e) => {
    //get current item
    const currentItem = itemCtrl.getCurrentItem();

    //Delete from data structure
    itemCtrl.deleteItem(currentItem.id);

    //Delete from ui
    uiCtrl.deleteListItem(currentItem.id);

    //Get total calories
    const totalCaloires = itemCtrl.getTotalCalories();

    //Add total calories  to UI
    uiCtrl.showTotalCalories(totalCaloires);

    //Clear edit state
    uiCtrl.clearEditState();


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

