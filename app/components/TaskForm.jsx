"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TaskForm = ({ task }) => {
  const EditMode = task._id === "new" ? false : true;
  const route = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EditMode) {
      const res = await fetch(`/api/Tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to update Task.");
      }
    } else {
      const res = await fetch("/api/Tasks", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create Task.");
      }
    }
    route.refresh();
    route.push("/");
  };

  const startingTaskData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EditMode) {
    startingTaskData["title"] = task.title;
    startingTaskData["description"] = task.description;
    startingTaskData["priority"] = task.priority;
    startingTaskData["progress"] = task.progress;
    startingTaskData["status"] = task.status;
    startingTaskData["category"] = task.category;
  }

  const [formData, setFormData] = useState(startingTaskData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2 "
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EditMode ? "Update Your Task" : "Create Your Task"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          ></input>
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          ></input>
          <label>
            2
            <input
              id="priority-3"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={3}
              checked={formData.priority == 3}
            ></input>
            <label>3</label>
            <input
              id="priority-4"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={4}
              checked={formData.priority == 4}
            ></input>
            <label>4</label>
            <input
              id="priority-5"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={5}
              checked={formData.priority == 5}
            ></input>
            <label>5</label>
          </label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        ></input>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EditMode ? "Update" : "Create"}
        />
      </form>
    </div>
  );
};

export default TaskForm;
