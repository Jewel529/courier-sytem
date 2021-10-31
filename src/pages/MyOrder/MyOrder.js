import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import "./MyOrder.css";

const MyOrder = () => {
  const [myOrder, setMyOrder] = useState([]);
  // const [singleOrder, setSingleOrder] = useState([]);

  const { user } = useAuth();

  //console.log(user);

  // console.log(user);
  useEffect(() => {
    fetch("https://grisly-ghost-25994.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        const filterOrder = data?.filter(
          (order) => order?.email == user?.email
        );
        setMyOrder(filterOrder);
      });
  }, []);

  const handleOrderDelteId = (id) => {
    const proceed = window.confirm("are you sure you want to delete");
    if (proceed) {
      fetch(`https://grisly-ghost-25994.herokuapp.com/orders/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.deletedCount > 0) {
            alert("deleted successfully");
            const remainigOrder = myOrder?.filter((order) => order._id !== id);
            setMyOrder(remainigOrder);
          }
        });
    }
  };

  return (
    <div>
      <h1>myOrder</h1>
      <table className=" table table-dark table-striped ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Service</th>
            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Delelte Option</th>
          </tr>
        </thead>
        {myOrder?.map((order) => (
          <tbody>
            <tr>
              <td>{order?.name}</td>
              <td>{order?.email}</td>
              <td>{order?.service_name}</td>
              <td>{order?.address}</td>
              <td>{order?.phonenumber}</td>
              <td>
                <button
                  onClick={() => handleOrderDelteId(order?._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default MyOrder;