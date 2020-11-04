import Modal from "antd/lib/modal/Modal";
import React from "react";

export default function AddAlarm(props){
    const { stop ,alarms, setAlarms, alarmModal, setAlarmModal, activeAlarm, setActiveAlarm,formData} = props;
    const handleDeactivate = (index) => {
        console.log("deactivate");
        let alarmsCopy = [...alarms];
        alarmsCopy[index].activated = true;
        setAlarmModal(false);
        setAlarms(alarmsCopy);
        setActiveAlarm(null);
        stop()

    };

    const handleSnooze = (index) => {
        console.log("Snooze");
        setAlarmModal(false);
        let alarmsCopy = [...alarms];
        let hour = parseInt(alarms[index].time.split(":")[1], 10) + 2;
        if (hour > 59) {
        alarmsCopy[index].time =
            `${parseInt(alarms[index].time.split(":")[0], 10) + 1}` +
            ":" +
            hour +
            ":" +
            alarms[index].time.split(":")[2];
        } else {
        alarmsCopy[index].time =
            alarms[index].time.split(":")[0] +
            ":" +
            hour +
            ":" +
            alarms[index].time.split(":")[2];
        }
        setAlarms(alarmsCopy);
        setActiveAlarm(null)
        stop();
    };

    return (
        <>
        {/* Active Alarm Modal */}
        <Modal
               title="Active Alarm"
               visible={alarmModal}
               onOk={()=>handleSnooze(activeAlarm)}
               onCancel={()=>handleDeactivate(activeAlarm)}
               okText="Snooze"
               cancelText="Deactivate"
            >
               Label: {formData.label}
               <br />
               <br />
               Time: {formData.time}
        </Modal></>
    )
}