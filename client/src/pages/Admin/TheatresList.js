import React, {useEffect, useState} from 'react';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { Table, message } from 'antd';

function TheatresList() {
const [theatres, setTheatres] = useState([]);
const dispatch = useDispatch();

const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatres();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      
    } catch (error) {
      message.error(error.message);
    } finally{
      dispatch(HideLoading());
    }
  };
  
  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });
      if(response.success){
        message.success(response.message);
        await getData();
      }else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Address",
        dataIndex: "address",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
        title: "Phone",
        dataIndex: "phone",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Owner",
        dataIndex: "owner",
        render: (text, record) => {
          return record.owner ? record.owner.name : "N/A";
        }
    },
    {
       title: "status",
       dataIndex: "isActive",
       render: (text, record) => {
        if(text){
          return "Approved";
        }else{
          return "Pending/Blocked";
        }
       }
    },
    {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
          return (
            <div className="flex gap-1">
             {record.isActive && <span className='underline'
             onClick={()=> handleStatusChange(record)}>Block</span>}
             {!record.isActive && <span className='underline'
             onClick={()=> handleStatusChange(record)}>Approve</span>}
            </div>
          );
        },
      },
  ]

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
       <Table columns={columns} dataSource={theatres} rowKey="_id"/>
       {/* <Table columns={columns} dataSource={theatres.map(theatre => ({ ...theatre, key: theatre._id }))} /> */}
    </div>
  )
}

export default TheatresList;