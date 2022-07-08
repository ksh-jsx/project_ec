import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';

import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

function BottomDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div >
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(40% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }} 
          hideBackdrop={true}
          hysteresis={0.3}
        >
          <div className='drawerBox' onClick={()=>console.log('click!')} onDrag={(e)=>(console.log('drag'))}>
            <span className='puller'/>
            <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
          </div>
          
        </SwipeableDrawer>
      </Box>
    </div>
  );
}


export default BottomDrawer;
