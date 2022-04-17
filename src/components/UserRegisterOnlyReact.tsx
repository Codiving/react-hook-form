import { useState } from "react";

interface IUserData {
  name: string;
  age: number;
  id: string;
  password: string;
  email: string;
}

const initUserData = {
  name: "",
  age: 0,
  id: "",
  password: "",
  email: ""
};

const initErrors = {
  name: "",
  age: "",
  id: "",
  password: "",
  email: ""
};

const UserRegisterOnlyReact = () => {
  const [userData, setUserData] = useState<IUserData>(initUserData);
  const [errors, setErrors] = useState(initErrors);

  const onHandleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUserData(prev => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value
    }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        const { name, age, id, password, email } = userData;
        const domain = email.split("@")[1];

        if (domain !== "gmail.com") {
          setErrors(prev => ({
            ...prev,
            email: "gmail 형식이 아닙니다."
          }));
          return;
        }

        // ... 필수 값이 입력되지 않았습니다. (코드 작성 해야함)
        // ... name은 5글자 이상, 10글자 이하이어야 합니다. (코드 작성 해야함)
        // ... age는 10 이상, 100 이하이어야 합니다. (코드 작성 해야함)
        // ... password가 모두 영어인지 작성해야함
        // ... email이 gmail인지 확인해야함
        // ... 기타 등등 테스트 작성

        // ... 모든 테스트 통과
        setErrors(initErrors);
        console.log("# name", name);
        console.log("# age", age);
        console.log("# id", id);
        console.log("# password", password);
        console.log("# email", email);
      }}
    >
      <input
        value={userData["name"]}
        onChange={onHandleUserData}
        placeholder="name"
        name="name"
        required
        maxLength={10}
        minLength={5}
      />
      <input
        value={userData["age"]}
        onChange={onHandleUserData}
        placeholder="age"
        name="age"
        required
        type="number"
        min={10}
        max={100}
      />
      <input
        value={userData["id"]}
        onChange={onHandleUserData}
        placeholder="id"
        name="id"
        required
      />
      <input
        value={userData["password"]}
        onChange={onHandleUserData}
        placeholder="password"
        name="password"
        required
        type="password"
      />
      <input
        value={userData["email"]}
        onChange={onHandleUserData}
        placeholder="email"
        name="email"
        required
        type="email"
      />
      {!!errors.email && <span>{errors.email}</span>}
      <input type="submit" />
    </form>
  );
};

export default UserRegisterOnlyReact;
