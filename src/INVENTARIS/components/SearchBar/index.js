import react from 'react'
import './style.css'
import Search from '../../assets/search.svg'
function SearchBarBox(props) {
    const {placeholder, onClickEvent} = props
    return (
        <div className="search-box-container" >
            <div className="element-container">
                <input type="text" placeholder={placeholder} className="search-input" />
                <img src={Search} className="search-icon" onClick={onClickEvent}/>
            </div>
        </div>

    )
}
export default SearchBarBox