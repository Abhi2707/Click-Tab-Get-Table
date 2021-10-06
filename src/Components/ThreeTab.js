import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import DataTable from './DataTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box xs={12} md={6} lg={6} sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//Defined three tabs and added Datatable component to show content on clicked tab . 
  return (
    <Grid item xs={12} md={6} lg={4} sx={{margin:'auto'}} >
      <Box  sx={{ borderBottom: 1, borderColor: 'divider', justifyContent:'center' }}>
        <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Capsules List" {...a11yProps(0)} />
          <Tab label="Ships List" {...a11yProps(1)} />
          <Tab label="Rockets List" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel style={{width:850}} value={value} index={0}>
        <DataTable index={0}/>
      </TabPanel>
      <TabPanel style={{width:750}} value={value} index={1}>
      <DataTable index={1}/>
      </TabPanel>
      <TabPanel style={{width:850}} value={value} index={2}>
      <DataTable index ={2}/>
      </TabPanel>
    </Grid>
  );
}
