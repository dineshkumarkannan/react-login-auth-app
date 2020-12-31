
const ITEMS = [{
    "name": "Orange",
    "count": 5
  },
  {
    "name": "Banan",
    "count": 2
  },
  {
    "name": "Grape",
    "count": 3
  }];

export default class Items {

    getItems() {
        let items = ITEMS;
        if(localStorage.getItem('allItems')){
          items = JSON.parse(localStorage.getItem('allItems'));
        }
        return items;
      }
    
      updateItems(data){
        localStorage.setItem('allItems', JSON.stringify(data));
        return {success: true};
      }
}