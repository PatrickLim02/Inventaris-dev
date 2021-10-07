import react from 'react'
import './style.css'
import Search from '../../assets/search.svg'
function SearchBarBox() {
    return (
        <div className="search-box-container">
            <div className="element-container">
                <tr>
                    <td>
                        <input type="text" placeholder="Search" className="search-text" />
                    </td>
                    <td>
                        <img src={Search} className="search-icon" />
                    </td>
                </tr>
            </div>
        </div>

    )
}
export default SearchBarBox