import EmployersListItem from '../employers-list-item/employers-list-item';
import Empty from '../empty/empty';
import './employers-list.css';
const EmployersList = ({data, onDelete, onToggleProp, onValueChange}) => {
  const elements = data.map (item => {
    const {id, ...itemProps} = item;
    return (
      <EmployersListItem
        key={id}
        {...itemProps}
        onDelete={() => onDelete(id)}
        onToggleProp={(e)=> onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
        onValueChange={(e)=>onValueChange(id, e.target.value)}

      />
    );
  
  });

  return (
    <ul className="app-list list-group">
      {data.length ? elements : <Empty/>}
      
    </ul>
  );
};

export default EmployersList;
