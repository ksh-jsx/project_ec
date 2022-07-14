import React, { useState, useEffect } from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BasicCard from "./BasicCard";
import useStore from '../../useStore';
import { useObserver } from "mobx-react";

const drawerBleeding = 56;

function BottomDrawer(props) {

  const { counter } = useStore();
  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  useEffect(() => {
    
  }, []);

  return useObserver(() => (
    <div >
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(40% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box style={{backgroundColor:"#E7EBF0"}}>
        <SwipeableDrawer
          disableEnforceFocus
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
          <div className='drawerBox' >
            <span className='puller'/>
            <Typography sx={{ p: 2, color: 'text.secondary' }}>{counter.newData.length} results</Typography>
            
          </div>
          <div className="cardBox" id="tmp">
            {counter.newData?.map((x,i)=>(
              <BasicCard data={x} i={i} key={i}/>
            ))}
          </div>
        </SwipeableDrawer>
      </Box>
    </div>
  ));
}


export default BottomDrawer;
