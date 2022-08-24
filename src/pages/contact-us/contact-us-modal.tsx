import React, { SetStateAction } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AppModalView } from '../../components';
import { ContactUsData, contentMgtFn, onErrorCMG } from '../../logic/admin/webcontent.logic';
import { IErrorArgs } from '../../models/error-handler.model';

type TMethod = 'get' | 'patch' | 'put' | 'delete' | 'post';

type TData = {
  open: boolean;
  action: TMethod;
  contactUsItem: ContactUsData;
  setContactUsItem: React.Dispatch<SetStateAction<ContactUsData>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const ContactUsModal = ({
  open,
  setOpen,
  action,
  contactUsItem,
  setContactUsItem,
}: TData): JSX.Element => {
  const { mutate, isLoading: loader } = useMutation<unknown, IErrorArgs, unknown, unknown>(
    (dataInput) =>
      contentMgtFn<unknown, unknown>({
        data: dataInput,
        endPoint: 'contact-us/send-mail',
        method: 'post',
      }),
  );

  const onSuccess = (res: any) => {
    setOpen(!open);
    toast.success(res.data.message);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setContactUsItem((item) => ({ ...item, [name]: value }));
  };

  const onSubmitHeadline = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      subject: contactUsItem.subject,
      email: contactUsItem.email,
      message: contactUsItem.message,
    };
    mutate(data, { onSuccess, onError: onErrorCMG });
  };

  return (
    <>
      <AppModalView disableBoxClose open={open} setOpen={setOpen} title="Contact Us">
        <form
          style={{
            width: 470,
            height: 440,
          }}
          onSubmit={onSubmitHeadline}
        >
          <div>
            <TextField
              fullWidth
              margin="dense"
              id="subject"
              label="Subject"
              name="subject"
              value={contactUsItem?.subject}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="dense"
              id="email"
              label="Email Address"
              name="email"
              value={contactUsItem?.email}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              fullWidth
              multiline
              rows={10}
              margin="dense"
              id="message"
              label="Tell us what you think"
              name="message"
              value={contactUsItem?.message}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <div>
            <Button disabled={loader} type="submit" fullWidth variant="contained" color="primary">
              {action === 'patch' ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </AppModalView>
    </>
  );
};

export default ContactUsModal;
