import React, { useState, useEffect } from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BasicCard from "./BasicCard";
import useStore from '../../useStore';
import { useObserver } from "mobx-react";
import { DoubleArrow } from "@mui/icons-material";

const drawerBleeding = 56;

function BottomDrawer() {

  const { counter } = useStore();
  const [open, setOpen] = useState(true);

  useEffect(() => {    
    document.getElementById('drawer').addEventListener('touchmove', test(), {passive:false});
    document.getElementById('drawer').removeEventListener('touchmove', test(), {passive:false});
  }, []);
  
  const test = () =>{
    console.log('add')
  }

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
          hysteresis={0.3}
          
        >
          <div className='drawerBox' >
            <span className='puller'/>
            <Typography sx={{ p: 2, color: 'text.secondary' }}><span style={{fontWeight:'bold'}}>{counter.newData.length}</span>개의 결과</Typography>
            
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
