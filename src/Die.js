import './Die.css';

function Die ({selected, value, clickHandler}) {
    return (
        <div className={selected ? 'die selected' : 'die'} onClick={clickHandler}>
            {value}
        </div>
    );
}

export default Die;