export const ImageGalleryItem = ({webformatURL, largeImageURL, tags}) => {
    return <li><img src={webformatURL} alt={tags} data-bigphoto={largeImageURL} /></li>
}