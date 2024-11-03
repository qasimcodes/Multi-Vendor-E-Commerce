import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const MyImageGallery = ({ images }) => {
  const galleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return <ImageGallery items={galleryImages} showFullscreenButton={true} />;
};

export default MyImageGallery;