
export default function Item(props) {
    const {item, isAddAllowed, updateItemCount} = props;
    return (
    <div>
        <div>
        Name : {item.name}
        </div>
        <div>
            Count : {item.count}
            </div>
            { isAddAllowed && <button onClick={() => updateItemCount(item.name, 1)}>Add</button>}
            { item.count > 0 && <button onClick={() => updateItemCount(item.name, -1)}>Delete</button>}
    </div>
    )
}
