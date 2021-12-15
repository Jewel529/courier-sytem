import React from "react";
import "./AddService.css";
import { useForm } from "react-hook-form";
import axios from "axios";
const AddService = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://grisly-ghost-25994.herokuapp.com/services", data)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          alert("service add succesfully");
          reset();
        }
      });
  };
  return (
    <div className="add-service bg-success">
      <h1 className="text-light fw-bold ">Add Service</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form-style">
        <input {...register("serviceName")} placeholder="service name" />
        <textarea {...register("desc")} placeholder="description" />
        <input {...register("img")} placeholder="Image Url" />
        <input type="number" {...register("cost")} placeholder="price" />
        <input className="mb-3" type="submit" />
      </form>
    </div>
  );
};

export default AddService;
