import React, { useState, useEffect } from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BasicCard from "./BasicCard";
import useStore from '../../useStore';
import { useSelector } from 'react-redux';

const drawerBleeding = 136;

function BottomDrawer() {

  const [open, setOpen] = useState(true);
  const redux_data = useSelector((state) => state.searched_data);
  const temp = useSelector((state) => state.clickedCategoryId);

  useEffect(() => {    

  }, []);

  return (
    <div >
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box style={{backgroundColor:"#E7EBF0"}}>
        <SwipeableDrawer
          id="drawer"
          passiveListeners="false"
          disableEnforceFocus
          anchor="bottom"
          open={open}
          onClose={()=>setOpen(false)}
          onOpen={()=>setOpen(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }} 
          hideBackdrop={true}
          hysteresis={.3}
          
        >
          <div className='drawerBox' >
            <span className='puller'/>
            <Typography sx={{ p: 2, color: 'text.secondary' }}><span style={{fontWeight:'bold'}}>{redux_data.length}</span>개의 결과 {temp}</Typography>
            
          </div>
          <div className="cardBox" id="tmp">
            {redux_data?.map((x,i)=>(
              <BasicCard data={x} i={i} key={i}/>
            ))}
          </div>
        </SwipeableDrawer>
      </Box>
    </div>
  );
}


export default BottomDrawer;
