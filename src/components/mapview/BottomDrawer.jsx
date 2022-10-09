import React, { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import BasicCard from "./BasicCard";
import { useDispatch, useSelector } from "react-redux";
import { SORT } from "../../stores/mapSlice";

const drawerBleeding = 120;

function BottomDrawer() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [sort, setSort] = useState(true);

  const searched_data = useSelector((state) => {
    return state.mapCounter.searched_data;
  });
  const onSortBtnClick = () => {
    setSort((prev) => !prev);
    dispatch(SORT());
  };

  return (
    <div>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `50%`,
            overflow: "visible",
          },
        }}
      />
      <div style={{ backgroundColor: "#E7EBF0" }}>
        <SwipeableDrawer
          id="drawer"
          disableEnforceFocus
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          hideBackdrop={true}
          hysteresis={0.3}
        >
          <div className="drawerBox">
            <span className="puller" />
            <div className="drawerBoxSort">
              <button onClick={() => onSortBtnClick()}>
                <img
                  src={
                    sort
                      ? require("../../assets/img/sort_d.png")
                      : require("../../assets/img/sort_u.png")
                  }
                  alt="sort"
                />
                <span> 접수시작일</span>
              </button>
            </div>
          </div>
          <div className="cardBox">
            {searched_data?.map((x, i) => (
              <BasicCard data={x} i={i} key={i} />
            ))}
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}

export default BottomDrawer;
