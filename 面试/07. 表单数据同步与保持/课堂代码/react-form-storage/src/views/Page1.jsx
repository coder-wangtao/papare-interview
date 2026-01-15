import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormStorage from "../hooks/useFormStorage";

const Page1 = () => {
  const [formData, setFormData] = useState({
    username: "",
    gender: "secret",
  });
  const navigate = useNavigate();

  const formStorage = useFormStorage("page1Form", formData, setFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextPage = () => {
    formStorage.saveData();
    navigate("/page2");
  };

  return (
    <div className="container">
      <h1>问题页1</h1>
      <form id="page1Form">
        <div>
          <label htmlFor="username">您的姓名：</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="请填写您的姓名"
          />
        </div>
        <div>
          <label htmlFor="gender">您的性别：</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="secret">保密</option>
          </select>
        </div>
        <button className="single" type="button" onClick={nextPage}>
          下一页
        </button>
      </form>
    </div>
  );
};

export default Page1;
