import React, { SetStateAction } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AppModalView } from '../../../../../components';
import { contentMgtFn, onErrorCMG, FAQData } from '../../../../../logic/admin/webcontent.logic';
import { IErrorArgs } from '../../../../../models/error-handler.model';

type TMethod = 'get' | 'patch' | 'put' | 'delete' | 'post';

type TData = {
  open: boolean;
  action: TMethod;
  itemId: number | undefined;
  getAllHeadLines: () => void;
  faqItem: FAQData;
  setFaqItem: React.Dispatch<SetStateAction<FAQData>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const FAQModal = ({
  open,
  setOpen,
  action,
  itemId,
  getAllHeadLines,
  faqItem,
  setFaqItem,
}: TData): JSX.Element => {
  const { mutate, isLoading: loader } = useMutation<unknown, IErrorArgs, unknown, unknown>(
    (dataInput) =>
      contentMgtFn<unknown, unknown>({
        data: dataInput,
        endPoint: action === 'patch' ? `faq/${itemId}` : 'faq',
        method: action || 'post',
      }),
  );

  const onSuccess = (res: any) => {
    getAllHeadLines();
    setOpen(!open);
    toast.success(res.data.message);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFaqItem((item) => ({ ...item, [name]: value }));
  };

  const onSubmitHeadline = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      question: faqItem.question,
      answer: faqItem.answer,
    };
    mutate(data, { onSuccess, onError: onErrorCMG });
  };

  return (
    <>
      <AppModalView disableBoxClose open={open} setOpen={setOpen} title="FAQs">
        <form
          style={{
            width: 250,
          }}
          onSubmit={onSubmitHeadline}
        >
          <div>
            <TextField
              fullWidth
              margin="dense"
              id="user_auth.title"
              label="Question"
              name="question"
              value={faqItem?.question}
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
              id="user_body"
              name="answer"
              value={faqItem?.answer}
              onChange={handleChange}
              label="Answer"
              variant="outlined"
            />
          </div>
          <div>
            <Button disabled={loader} type="submit" fullWidth variant="contained" color="primary">
              {action === 'patch' ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </AppModalView>
    </>
  );
};

export default FAQModal;
