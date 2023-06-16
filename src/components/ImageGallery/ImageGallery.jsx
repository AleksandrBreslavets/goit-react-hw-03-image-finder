import { ImageGalleryItem } from "ImageGalleryItem/ImageGalleryItem"
import { GalleryList } from "./ImageGallery.styled"
export const ImageGallery =({images, onOpen})=>{
    return (
        <GalleryList onClick={onOpen}>
            { images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />
        ))}
        </GalleryList>
    )
}