import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [
        {name: 'John C.', salary: 1000, rise: false, increase: false, id: 1},
        {name: 'Alex H.', salary: 2700, rise: false, increase: false, id: 2},
        {name: 'Carl Y.', salary: 1400, rise: false, increase: false, id: 3},
      ],
      term: '',
      filter: 'all',
    };
    this.maxId = 4;
  }

  deleteItem = id => {
    this.setState (({data}) => {
      return {
        data: data.filter (item => item.id !== id),
      };
    });
  };
  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
   localStorage.setItem(("item " + this.maxId), JSON.stringify(newItem))
   const getStorge = JSON.parse(localStorage.getItem("item " + this.maxId))
   console.log(getStorge);
    this.setState (({data}) => {
      const newArr = [...data, getStorge];
      return {
        data: newArr,
      };
    });
  };
  onValueChange = (id, e) => {
    const salary = Object.keys (this.state.data[id - 1])[1];
    console.log(salary)
    const editSalary = {
      [salary]: e,
    };
    this.setState (({data}) => ({
      data: data.map (item => {
        if (item.id === id) {
          return {...item, ...editSalary};
        } else {
          return item;
        }
      }),
    }));
    console.log (e);
    console.log (this.state.data);
  };
  onToggleProp = (id, prop) => {
    this.setState (({data}) => ({
      data: data.map (item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]};
        }
        return item;
      }),
    }));
  };
  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter (item => {
      return item.name.indexOf (term) > -1;
    });
  };
  onUpdateSearch = term => {
    this.setState ({term});
  };
  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter (item => item.rise);

      case 'moreThen1000':
        return items.filter (item => item.salary > 1000).sort();
      default:
        return items;
    }
  };
  onFilterSelect = filter => {
    this.setState ({filter});
  };
  render () {
    const {data, term, filter} = this.state;
    const visableData = this.filterPost (this.searchEmp (data, term), filter);
    const increased = data.filter (item => item.increase).length;
    const employees = data.length;

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        {
          <EmployersList
            data={visableData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}
            onValueChange={this.onValueChange}
          />
        }

        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
