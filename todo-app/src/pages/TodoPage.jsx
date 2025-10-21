import React from "react";
import TodoForm from "../components/TodoForm";

const TodoPage = () => {
  const handleFormSubmit = async (newItem) => {
    try {
      const response = await fetch("http://localhost:5000/submittodoitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert("Item submitted successfully!");
      } else {
        alert("Failed to submit item.");
      }
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  return (
    <div>
      <h1>To-Do Page</h1>
      <TodoForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default TodoPage;
