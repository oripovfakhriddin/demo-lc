import { Fragment, useEffect, useState } from "react";
import { Button, Flex, Image, Modal, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import "./TeachersPage.scss"
import { request } from "../../server/request";

const TeachersPage = () => {

  const [data, setData ] = useState([]);

  const getData = async () => {
    try {
      let {data} = await request.get("teacher");
      data.map((data)=>{
        data.key=data.id
        return data
      })
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  const deleteTeacher = (id) => {
    Modal.confirm({
      title: 'Do you want to delete Teacher',
      onOk: async () => {
        await request.delete(`teacher/${id}`)
        getData()
      }
    });
  }



  const columns = [
    {
      title: 'Image',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (image) => 
        <Image
          width={150}
          src={image}
        />
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: ( _, data ) => 
      <div>
        <p>{data.firstName}</p>
        <p>{data.lastName}</p>
      </div>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (id, data) => 
      <Fragment>
        <Button>Edit</Button>
        <Button onClick = {()=>{ deleteTeacher(id,data) }} >Delete</Button>
      </Fragment>  
      
    },
    
  ];
  


  return (
    <Fragment>
      <Table 
        scroll={{x: 1000}} 
        columns={columns} 
        dataSource={data}
        title={()=>{
          return <Flex className="ofa__teachers__header">
            <h2>Teachers</h2>
            <Input placeholder="Searching..." prefix={<UserOutlined />} />
            <Button type="dashed">
              Add teacher
            </Button>
          </Flex>
        }} />

    </Fragment>
  )
}

export default TeachersPage;