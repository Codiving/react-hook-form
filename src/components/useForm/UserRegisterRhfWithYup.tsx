import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";
import { IUserData } from "./types";

const schema: SchemaOf<IUserData> = object({
  name: string()
    .required("이름은 필수 값입니다.")
    .min(5, "이름은 5글자 이상이어야합니다.")
    .max(10, "이름은 10글자 이하이어야 합니다."),
  age: number()
    .required("나이는 필수 값입니다.")
    .min(10, "나이는 10살 이상이어야 합니다.")
    .max(100, "나이는 100살 이하이어야 합니다."),
  id: string().required("id는 필수 값 입니다."),
  password: string()
    .required("비밀번호는 필수 값입니다.")
    .matches(/^[a-zA-Z]*$/, { message: "비밀번호는 영어만 가능합니다." }),
  email: string()
    .required("email은 필수 값 입니다.")
    .test("domainCheck", "gmail만 가능합니다.", email => {
      if (!email) return false;
      return email.split("@")[1] === "gmail.com";
    })
});

const UserRegisterRhfWithYup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserData>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  const onValid = (data: IUserData) => {
    console.log("# onValid", data);
  };

  const onInValid = (errors: FieldErrors) => {
    console.log("# onInValid", errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input {...register("name")} placeholder="name" />
      <span>{errors.name?.message}</span>
      <br />

      <input type="number" {...register("age")} placeholder="age" />
      <span>{errors.age?.message}</span>
      <br />

      <input {...register("id")} placeholder="id" />
      <span>{errors.id?.message}</span>
      <br />

      <input {...register("password")} type="password" placeholder="password" />
      <span>{errors.password?.message}</span>
      <br />

      <input {...register("email")} type="email" placeholder="email" />
      <span>{errors.email?.message}</span>
      <br />

      <input type="submit" />
    </form>
  );
};

export default UserRegisterRhfWithYup;
