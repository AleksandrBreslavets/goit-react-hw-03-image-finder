import { GalleryImg, GalleryItem } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({webformatURL, largeImageURL, tags}) => {
    return <GalleryItem><GalleryImg src={webformatURL} alt={tags} data-bigphoto={largeImageURL} /></GalleryItem>
}