import Cancel from "./Cancel";
import Submit from "./Submit";
import { useState } from "react";

const Form = ({ onSubmit, children, onCancel, submitLabel }) => {
  let i = 0;
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-96 border rounded-xl p-4 drop-shadow"
      method="post"
    >
      {children.map((child) => {
        i += 1;
        return (
          <div key={i} className="flex flex-col justify-between w-full mb-2">
            {child}
          </div>
        );
      })}
      <div className="flex items-center justify-around">
        <Cancel onClick={onCancel} />
        <Submit label={submitLabel} />
      </div>
    </form>
  );
};

export default Form;
