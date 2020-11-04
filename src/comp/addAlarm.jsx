import React from "react";
import { TimePicker, Modal, Input } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
export default function AddAlarm(props){
    const {currenttime, alarmLength, editFormVisible, setFormData, formData , setAlarmLength, setAlarms, setEditFormVisible , alarms} = props;
    const handleOk = () => {
        setEditFormVisible(false);
        addAlarm();
        setFormData("");
     };
     const handleCancel = () => {
        setEditFormVisible(false);
     };

   const addAlarm = () => {
    if (formData.time === "" || formData.time === "undefined") return;
    let alarmsCopy = [...alarms];

    let currenttimeArr = currenttime.split(":");
    let timeArr = formData.time.split(":");

    const currValue = parseInt(currenttimeArr[0] + "" + currenttimeArr[1] + "" + currenttimeArr[2], 10);
    const timeValue = parseInt(timeArr[0] + "" + timeArr[1] + "" + timeArr[2], 10)
    let isActivated = false;
    if(currValue >= timeValue){
        isActivated = true;
    }

    alarmsCopy.push({
       label: formData.label,
       time: formData.time,
       activated: isActivated
    });
    if(alarmLength >2){
        alarmsCopy.sort((a, b) => {
            let timeA = a.time.split(":");
            let timeB = b.time.split(":");
            return (
               parseInt(timeA[0] + "" + timeA[1] + "" + timeA[2], 10) -
               parseInt(timeB[0] + "" + timeB[1] + "" + timeB[2], 10)
            );
         });
    }

    setAlarms(alarmsCopy);
    setAlarmLength(alarmLength + 1);
    // console.log(alarmsCopy);
 };
    return (
        <>
        {/* Add Alarm Modal */}
        <Modal
               title="Add Alarm"
               visible={editFormVisible}
               onOk={handleOk}
               onCancel={handleCancel}
            >
               Label:
               <Input
                  size="large"
                  // value={formData.label}
                  onChange={(event) => setFormData({ time: formData.time, label: event.target.value }) }
                  placeholder="large size"
                  prefix={<FileTextOutlined />}
               />
               <br />
               <br />
               <TimePicker
                  // value={formData.time}
                  onChange={(time, timeString) => setFormData({ time: timeString, label: formData.label })}
               />
            </Modal>
        </>
    )
}