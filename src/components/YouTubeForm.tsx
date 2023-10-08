import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import { useEffect } from "react";
let count = 0;
// set form cvalues type
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};
export const YouTubeForm = () => {
  // make default value after fetch data
  /*
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Batman",
        email: data.email,
        channel: "",
      };
    },
  });
  */
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  // object return from useForm has this vlaues
  const { register, control, handleSubmit, formState, watch, getValues } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  // watch form values that will cause component to rerender
  // const watchForm = watch();
  count++;

  // useEffect(() => {
  //   const subscription = watch((val) => {
  //     console.log(val);
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);

  const handelGetValues = () => {
    console.log("get values", getValues());
  };

  // noValidate => to override html validation and set your pure validations
  return (
    <div>
      <h1>Youtube Form ({count})</h1>
      {/* <h2>{JSON.stringify(watchForm)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-contol">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="error ">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: (val) => {
                return (
                  val !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div>
          <h3>Social Media Links</h3>
          <div className="form-control">
            <label htmlFor="channel">Twitter</label>
            <input type="text" id="twitter" {...register("social.twitter")} />
          </div>
          <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <input type="text" id="facebook" {...register("social.facebook")} />
          </div>
        </div>
        <div>
          <h3>Phone Numbers</h3>
          {getValues("phoneNumbers").map((phoneNumber, i) => (
            <div className="form-control" key={`phone${i}`}>
              <label htmlFor={`phone${i}`}>Phone Number{i}</label>
              <input
                type="text"
                id={`phone${i}`}
                {...register(`phoneNumbers.${i}`)}
              />
            </div>
          ))}
          {/* <div className="form-control">
            <label htmlFor="secondary-phone">Phone Number2</label>
            <input
              type="text"
              id="secondary-phone"
              {...register("phoneNumbers.1")}
            />
          </div> */}
        </div>
        <div>
          <h3>
            Phone Numbers Dynamic
            <button
              type="button"
              className="sm_btn"
              onClick={() => append({ number: "" })}
            >
              +
            </button>
          </h3>
          {fields.map((field, i) => {
            return (
              <div className="form-control flex" key={field.id}>
                <input type="text" {...register(`phNumbers.${i}.number`)} />
                {i > 0 && (
                  <button
                    type="button"
                    className="sm_btn"
                    onClick={() => remove(i)}
                  >
                    -
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          {/* adding valuesAsNumber to change string number value to number type */}
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Date is required",
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button>Submit</button>
        <button type="button" onClick={handelGetValues}>
          Get Values
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
