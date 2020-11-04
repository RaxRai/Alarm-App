import React from "react";

import { Button, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Alarm(props) {
   const { alarm, handleDelete, handleEdit, i } = props;
   return (
      
         <Row gutter={24} style={{
            minWidth: 100
         }}>
            <Col span={24}>{alarm.time}</Col>
            <Col span={24}>
               <Button onClick={() => handleDelete(i)}>
                  <DeleteOutlined />
               </Button>

               <Button onClick={() => handleEdit(i)}>
                  <EditOutlined />
               </Button>
            </Col>
         </Row>
     
   );
}
