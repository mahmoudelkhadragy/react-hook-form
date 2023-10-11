import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

let count = 0;

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  channel: z.string().nonempty("Channel is required"),
});
// set form cvalues type
// type FormValues = {
//   username: string;
//   email: string;
//   channel: string;
// };
type FormValues = z.infer<typeof schema>;

export const ZodYouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });
  // object return from useForm has this vlaues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  count++;

  return (
    <div>
      <h1>Yup Youtube Form ({count})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-contol">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="flex">
          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
