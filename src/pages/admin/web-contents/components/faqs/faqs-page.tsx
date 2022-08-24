import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useGetQuery } from '../../../../../hooks/useGetQuery';
import { contentMgtFn, TFAQsResponse, FAQData } from '../../../../../logic/admin/webcontent.logic';
import { ITheme } from '../../../../../themes/theme';
import HeadlineModal from './faqs-modal';
import handleError from '../../../../../utils/functions/error-handler';
import BackDropLoader from '../../../../../components/loaders/backdrop-loader';

const queryOptions = {
  queryKey: 'faqs',
  options: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

type TResponse = {
  data: {
    data: FAQData;
  };
};
const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontWeight: 600,
    color: theme.palette.black,
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}));

type TMethod = 'get' | 'patch' | 'put' | 'delete' | 'post';

export const FaqPageView = (): JSX.Element => {
  const classes = useStyles();
  const [faqs, setFaqs] = useState<FAQData[]>([]);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [faqItem, setFaqItem] = useState<FAQData>({
    answer: '',
    question: '',
  });
  const [action, setAction] = useState<TMethod>('post');
  const { data: response, refetch } = useGetQuery<TFAQsResponse>({
    queryFn: () => contentMgtFn<unknown, TFAQsResponse>({ method: 'get', endPoint: 'faq' }),
    ...queryOptions,
  });

  const openModal = () => {
    setAction('post');
    setOpen(!open);
  };

  const onUpdate = (id: number | undefined) => {
    // setLoading(!loading);
    contentMgtFn<unknown, TResponse>({ method: 'get', endPoint: `faq/${id}` })
      .then((res) => {
        setFaqItem(res.data.data);
        setAction('patch');
        setItemId(id);
        setOpen(true);
      })
      .catch((err: any) => {
        const error = handleError(err);
        toast.error(error.message);
      });
    // .finally(() => setLoading(!loading));
  };

  const onDelete = (id: number | undefined) => {
    setLoading(!loading);
    contentMgtFn<unknown, TResponse>({ method: 'delete', endPoint: `faq/${id}` })
      .then(() => {
        toast.success('deleted');
        setLoading(!loading);
        refetch();
      })
      .catch((err: any) => {
        const error = handleError(err);
        toast.error(error.message);
        setLoading(!loading);
      });
    // .finally(() => setLoading(!loading));
  };

  useEffect(() => {
    if (response?.data) {
      setFaqs(response?.data?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data]);

  return (
    <Container fixed>
      {loading && <BackDropLoader isOpened={loading} />}
      <Typography className={classes.title} variant="h3">
        Frequently Asked Questions
      </Typography>
      {open && (
        <HeadlineModal
          faqItem={faqItem}
          setFaqItem={setFaqItem}
          getAllHeadLines={refetch}
          action={action}
          open={open}
          itemId={itemId}
          setOpen={setOpen}
        />
      )}
      <div>
        <Button onClick={openModal} size="small" variant="contained" color="primary">
          Add Faqs
        </Button>
        {faqs.map((item: FAQData) => (
          <Accordion key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button size="small" onClick={() => onUpdate(item.id as number)}>
                update
              </Button>
              <Button size="small" onClick={() => onDelete(item.id as number)} color="primary">
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default FaqPageView;
