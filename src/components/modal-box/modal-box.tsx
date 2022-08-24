import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import url from '../../assets/images/stadium.jpg';
import { useStyles } from './modal.style';
import { useAppSelector } from '../../provider/hooks/hooks';

interface ModalBoxProps {
  children: React.ReactElement;
}

export const ModalBox: React.FC<ModalBoxProps> = ({ children }) => {
  const classes = useStyles(url)();
  const {
    authentication: { isAuthModalOpened },
  } = useAppSelector((state) => state);

  return (
    <div>
      <Modal
        closeAfterTransition
        disableAutoFocus
        disableEnforceFocus
        open={isAuthModalOpened}
        className={classes.modal}
        BackdropComponent={Backdrop}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>{children}</div>
      </Modal>
    </div>
  );
};

export default ModalBox;
