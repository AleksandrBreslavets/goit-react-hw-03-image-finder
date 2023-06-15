import ReactModal from 'react-modal';
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

ReactModal.setAppElement('#root');

export const Modal = ({ isOpen, onClose, bigImg:{bigImgURL, altDescr} }) => {
    const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};
    return (
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={() => disableBodyScroll(document)}
        onAfterClose={()=>enableBodyScroll(document)}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <img src={bigImgURL} alt={altDescr} /> */}
      </ReactModal>
  );
}