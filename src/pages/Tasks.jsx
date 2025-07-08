import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import dummydata from "../dummydata/tasksData.json";
import Title from "../components/customHeaders/Title";
import CustomButton from "../components/CustomButton";
import API from "../services/api";
import CustomInput from "../components/CustomInput";
import { taskSchema } from "../utils/validation";
// import ToastMessage from "../components/ToastMessage";
import { ThreeCircles } from "react-loader-spinner";
// import { Toaster, toast } from "sonner";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Tasks = () => {
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", description: "" });
  const [editForm, setEditForm] = useState({ title: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const handleNavigateToHome = () => {
    navigate("/home");
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleEditClick = (item) => {
    setIsEdit(true);
    setSelectedItemId(item?._id);
    setEditForm({ ...item });
  };
  const handleSetAddValue = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };
  const handleSetEditValue = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleGetTasks = async () => {
    setError("");
    setLoadingTasks(true);

    try {
      const res = await API.get("/task/get-tasks");
      const data = res.data;
      if (!res.error) {
        // toast.success("Tasks fetched successfully");
        setData(data?.task);
      } else {
        setError(res.error);
      }
    } catch (error) {
      console.log({ error });
      setError(error?.response?.data?.error);
      toast.error("An error occured");
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setError("");
    try {
      const res = await API.delete(`/task/delete-task/${id}`);
      if (!res.error) {
        handleGetTasks();
      } else {
        setError(res.error);
      }
    } catch (error) {
      console.log({ error });
      setError(error?.response?.data?.error);
    }
  };
  const handleEditTask = async () => {
    setError("");
    setEditLoading(true);
    try {
      const res = await API.put(
        `/task/update-task/${selectedItemId}`,
        editForm
      );
      if (!res.error) {
        setIsEdit(false);
        setEditForm({});
        handleGetTasks();
      } else {
        setError(res.error);
      }
    } catch (error) {
      console.log({ error });
      setError(error?.response?.data?.error);
    } finally {
      setEditLoading(false);
    }
  };
  const handleSaveTask = async (data) => {
    setError("");
    setAddLoading(true);
    try {
      const res = await API.post("/task/create-task", data);
      if (!res.error) {
        toast.success("Tasks created successfully");
        reset()
        handleGetTasks();
      } else {
        setError(res.error);
      }
    } catch (error) {
      console.log({ error });
      setError(error?.response?.data?.error || error?.response?.data?.message);
    } finally {
      setAddLoading(false);
    }
  };
  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className=" w-full flex justify-center">
      {loadingTasks && (
        <div className=" absolute flex items-center justify-center w-full h-screen bg-black opacity-80">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <div className=" w-full max-w-xl flex flex-col item-center mx-0">
        <div className=" flex justify-between  mb-20 mt-4">
          <Title classNames=" w-full"> welcome to Tasks</Title>
          <CustomButton onClick={handleLogOut} className=" whitespace-nowrap">
            Log Out
          </CustomButton>
        </div>

        <>
          {isEdit ? (
            <div className=" mb-10">
              <div>Edit task</div>
              <div className="flex gap-2 items-center w-full justify-between">
                <CustomInput
                  placeholder="title"
                  name="title"
                  value={editForm?.title}
                  onChange={handleSetEditValue}
                />
                <CustomInput
                  placeholder="description"
                  name="description"
                  value={editForm?.description}
                  onChange={handleSetEditValue}
                />

                <CustomButton loading={editLoading} onClick={handleEditTask}>
                  Save
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </CustomButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleSaveTask)} className=" mb-10">
              <div>Add new task</div>
              <div className="flex gap-2 items-center w-full justify-between">
                <CustomInput
                  placeholder="title"
                  name="title"
                  {...register("title")}
                />
                <CustomInput
                  placeholder="description"
                  name="description"
                  {...register("description")}
                />

                <CustomButton
                  type="submit"
                  loading={addLoading}
                  // onClick={handleSaveTask}
                >
                  Save
                </CustomButton>
              </div>
            </form>
          )}
        </>

        {error && <p className="text-red-500 my-2">{error}</p>}

        <div className=" flex flex-col gap-2 border border-green-500 p-4 rounded-md">
          Tasks
          <div className=" h-48 overflow-y-auto flex flex-col gap-2">
            <>
              {data &&
                data?.map((item, idx) => (
                  <>
                    <div className=" flex items-center justify-between border border-green-400 bg-green-100 rounded-lg p-2">
                      <div className=" flex gap-2">
                        <div>{idx + 1}.</div>
                        <div>{item.title}</div>
                      </div>

                      <div>{item.description}</div>

                      <div className=" flex items-center gap-2">
                        <input
                          type="checkbox"
                          className=" w-5 h-5"
                          value={item.completed}
                        />
                        <p
                          className=" cursor-pointer hover:underline hover:text-red-500"
                          onClick={() => handleDeleteTask(item?._id)}
                        >
                          Delete
                        </p>
                        <p
                          onClick={() => handleEditClick(item)}
                          className=" cursor-pointer hover:underline hover:text-red-500"
                        >
                          Edit
                        </p>
                      </div>
                    </div>
                  </>
                ))}
            </>
          </div>
        </div>

        <div className=" space-x-1 mt-4">
          <CustomButton onClick={handleNavigateToHome}>Go to home</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
