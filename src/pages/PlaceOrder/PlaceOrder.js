import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { servicename } = useParams();
  const { register, handleSubmit, reset } = useForm();
  // const value = "udoy";
  const { user } = useAuth();

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post("https://grisly-ghost-25994.herokuapp.com/orders", data)
      .then((res) => {
        //   console.log(res);
        if (res.data.insertedId) {
          alert("your order has been placed  succesfully");
          reset();
        }
      });
  };
  return (
    <div className="bg-success">
      <h1 className="text-light fw-bold ">Place Your Order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-style">
        <input {...register("name")} value={user.displayName || ""} readOnly />
        <input
          type="email"
          {...register("email")}
          placeholder="email"
          value={user.email || ""}
          readOnly
          required
        />
        <input
          {...register("service_name")}
          value={servicename || ""}
          placeholder="service name"
          required
        />
        <textarea {...register("address")} placeholder="Address" required />
        <input
          type="number"
          {...register("phonenumber")}
          placeholder="phoneNumber"
          required
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default PlaceOrder;
