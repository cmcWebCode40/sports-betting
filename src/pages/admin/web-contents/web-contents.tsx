import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useHistory, useLocation } from 'react-router-dom';
import { queryUrl } from '../../../helpers/query-params';
import PrivacyPolicy from './components/privacy-policy';
// import FAQs from './components/faqs';
import TermsAndConditions from './components/terms-conditions';
import FAQs from './components/faqs/faqs-page';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const WebContent = (): JSX.Element => {
  const location = useLocation();
  const page = queryUrl(location).get('current-page');
  const history = useHistory();
  const [value, setValue] = React.useState<number>(Number(page) || 0);

  const handleChange = (_: unknown, newValue: number) => {
    history.push(`?current-page=${newValue}`);
    setValue(newValue);
  };

  return (
    <div>
      <AppBar color="secondary" elevation={0} position="relative">
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          centered
          aria-label="simple tabs example"
        >
          <Tab label="Privacy Policy" {...a11yProps(0)} />
          <Tab label="Terms and Condition" {...a11yProps(1)} />
          <Tab label="Frequently Asked Questions" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PrivacyPolicy />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TermsAndConditions />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FAQs />
      </TabPanel>
    </div>
  );
};

export default WebContent;
