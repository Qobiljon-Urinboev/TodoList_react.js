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
        {name: 'John C.', salary: 1000, increase: false, id: 1},
        {name: 'Alex H.', salary: 2700, increase: false, id: 2},
        {name: 'Carl Y.', salary: 1400, increase: true, id: 3},
      ],
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
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
}
  render () {
    const {data} = this.state;
    return (
      <div className="app">
        <AppInfo />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployersList data={data} onDelete={id => this.deleteItem (id)} />
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
