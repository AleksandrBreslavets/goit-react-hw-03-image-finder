import { ImageGalleryItem } from "ImageGalleryItem/ImageGalleryItem"
export const ImageGallery =({images, onOpen})=>{
    return (
        <ul onClick={onOpen}>
            { images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />
        ))}
        </ul>
    )
}