import React, { SetStateAction } from 'react';
import { createStyles, withStyles, WithStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { ITheme } from '../../themes/theme';

export const useAppModalStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      backgroundImage: theme.palette.primary.light,
    },
    modal: {
      position: 'absolute',
      backgroundImage: theme.palette.primary.light,
      border: 'none',
      width: '100%',
      outline: 'none !important',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(-2, 0, 0, 0),
      color: theme.palette.grey[500],
    },
  }),
);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(0.5),
      color: theme.palette.grey[500],
    },
    title: {
      textAlign: 'center',
      fontWeight: 600,
      fontSize: '18px',
      color: theme.palette.primary.main,
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface AppModalViewProps {
  title?: string;
  children: React.ReactNode;
  showBottomClose?: boolean;
  // dividers?: boolean;
  open: boolean;
  disableBoxClose?: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  closeModal?: () => void;
}

export default function AppModalView({
  children,
  title,
  open = false,
  setOpen,
  showBottomClose,
  disableBoxClose,
  closeModal,
}: AppModalViewProps): JSX.Element {
  const classes = useAppModalStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const persistOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.modal}>
      <Modal
        closeAfterTransition
        disableAutoFocus
        disableEnforceFocus
        open={open}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Dialog
          onClose={disableBoxClose ? persistOpen : handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title || 'No title'}
          </DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
          {showBottomClose && (
            <DialogActions>
              <Button autoFocus onClick={closeModal} color="primary">
                Save changes
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </Modal>
    </div>
  );
}
