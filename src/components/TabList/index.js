import './index.css'

const AddTabItem = props => {
  const {details, onchangecategory} = props
  const {displayText, tabId} = details
  const changetab = () => {
    onchangecategory(tabId)
  }
  return (
    <li className="listContainer">
      <button
        onClick={changetab}
        type="button"
        className="listbutton buttonhihghtlight"
      >
        {displayText}
      </button>
    </li>
  )
}

export default AddTabItem
