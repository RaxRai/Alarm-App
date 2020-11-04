import React, { useState, useEffect } from "react";
import Alarm from "./alarm";
import ActiveAlarm from "./activeAlarm";
import AddAlarm from "./addAlarm";
import {  Button, Row, Col, Card ,Typography } from "antd";
import useSound from 'use-sound';
import zero from "./../sounds/zero.mp3";


export default function Alarms() {
   const { Title } = Typography;
   let timeNow = new Date();
   // 16:56:28 GMT+0530 (India Standard Time)
   timeNow = timeNow.toTimeString().split(" ")[0] + "";
   const [alarms, setAlarms] = useState([{label: "Morning" , time: "08:00:00", activated: true}
]);
   const [alarmLength, setAlarmLength] = useState(1);
   const [currenttime, setCurrenttime] = useState(timeNow);
   const [editFormVisible, setEditFormVisible] = useState(false);
   const [formData, setFormData] = useState({ time: "", label: "" });
   const [alarmModal , setAlarmModal] = useState(false);
   const [activeAlarm, setActiveAlarm] = useState(null);
   const [play, { stop }] = useSound(zero);
  

   const handleDelete = (i) => {
      let alarmsCopy = [...alarms];
      alarmsCopy.splice(i, 1);
      setAlarms(alarmsCopy);
      setAlarmLength(alarmLength - 1);
   };
   const handleEdit = (i) => {
      let alarmCopy = alarms[i];
      handleDelete(i);
      setEditFormVisible(true);
      setFormData(alarmCopy);
   };
   const checkActiveAlarm =()=>{
      console.log(alarmLength + " length");
      if(alarmLength <= 0 || activeAlarm !== null) return;
      let isActive = { active : false, index: null};
      let currentValueArr = currenttime.split(":");
      let currentValue = parseInt(currentValueArr[0] + "" + currentValueArr[1] + "" + currentValueArr[2], 10);
      for(let i=0; i<alarms.length; i++){
         if(alarms[i].activated === true) continue;
         let alarmValueArr = alarms[i].time.split(":");
         let alarmValue =parseInt(alarmValueArr[0] + "" + alarmValueArr[1] + "" + alarmValueArr[2], 10);
         if( currentValue >= alarmValue){
            isActive.active = true;
            isActive.index = i;
            play();
            break;
         }
      }
      if(isActive.active === true){
         let alarmCopy = alarms[isActive.index];
         setAlarmModal(true);
         setFormData(alarmCopy);
         setActiveAlarm(isActive.index);
         //setActiveAlarm(alarms[isActive.index]);
         console.log("Active" + activeAlarm);
      }
   }
   

   useEffect(() => {
      setInterval(() => {
         let timeNow = new Date();
         // 16:56:28 GMT+0530 (India Standard Time)
         timeNow = timeNow.toTimeString().split(" ")[0] + "";
         setCurrenttime(timeNow);
         
      }, 1000);
   }, []);

   checkActiveAlarm();
   return (
      <div className="alarms">
         <br />
         <>
         <Title level={3} keyboard>Current Time: {currenttime}</Title></>
         <>
            <Button type="primary" onClick={() => setEditFormVisible(true)}>
               Add Alarm
            </Button>

            <ActiveAlarm alarms={alarms} setAlarms={setAlarms} setAlarmModal={setAlarmModal} alarmModal={alarmModal}  setActiveAlarm={setActiveAlarm} activeAlarm={activeAlarm} formData={formData} stop={stop}/>

            <AddAlarm currenttime={currenttime} setEditFormVisible={setEditFormVisible} alarms={alarms} editFormVisible={editFormVisible}  setFormData={setFormData} formData={formData} setAlarmLength={setAlarmLength} alarmLength={alarmLength} setAlarms={setAlarms}/>
         </>
         <br />
         <Row gutter={24}>
            {alarms.map((alarm, i) => (
               <Col span={4} style={{
                  minWidth: 150
               }}>
                  <Card title={alarm.label} bordered={true}>
                     <Alarm
                        key={`alarm${i}`}
                        i={i}
                        alarm={alarm}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                     />
                  </Card>
               </Col>
            ))}
         </Row>
      </div>
   );
}
