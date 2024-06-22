import './index.css'

const AddThumbnialItem = props => {
  const {details, onClickthumbnial} = props
  const {id, thumbnailUrl, imageUrl} = details
  const clickingImg = () => {
    onClickthumbnial(id)
  }

  return (
    <li className="thumbnailcontainer">
      <button type="button" onClick={clickingImg}>
        <img src={thumbnailUrl} className="thumbnailImg" alt="thumbnail" />
      </button>
    </li>
  )
}

export default AddThumbnialItem
