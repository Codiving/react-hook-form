import { FieldErrors, useForm } from "react-hook-form";

interface IUserData {
  name: string;
  age: number;
  id: string;
  password: string;
  email: string;
}

const UserRegisterRhf = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserData>({
    mode: "onSubmit"
  });

  const onValid = (data: IUserData) => {
    console.log("# onValid", data);
  };

  const onInValid = (errors: FieldErrors) => {
    console.log("# onInValid", errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("name", {
          required: "이름은 필수 값입니다.",
          minLength: {
            value: 5,
            message: "이름은 5글자 이상이어야합니다."
          },
          maxLength: {
            value: 10,
            message: "이름은 10글자 이하이어야 합니다."
          }
        })}
        placeholder="name"
      />
      <input
        type="number"
        {...register("age", {
          required: "나이는 필수 값입니다.",
          valueAsNumber: true,
          min: {
            value: 10,
            message: "나이는 10살 이상이어야 합니다."
          },
          max: {
            value: 100,
            message: "나이는 100살 이하이어야 합니다."
          }
        })}
        placeholder="age"
      />
      <input
        {...register("id", { required: "id는 필수 값 입니다." })}
        placeholder="id"
      />
      <input
        {...register("password", {
          required: "비밀번호는 필수 값입니다.",
          pattern: {
            value: /^[a-zA-Z]*$/,
            message: "비밀번호는 영어만 가능합니다."
          }
        })}
        type="password"
        placeholder="password"
      />
      <input
        {...register("email", {
          required: "email은 필수 값 입니다.",
          validate: {
            domainCheck: email =>
              email.split("@")[1] === "gmail.com" || "gmail만 가능합니다."
          }
        })}
        type="email"
        placeholder="email"
      />
      {errors?.email?.message && <span>{errors.email.message}</span>}

      <input type="submit" />
    </form>
  );
};

export default UserRegisterRhf;
