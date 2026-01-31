import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Modal from "./Modal";
import VoiceAssistant from "./VoiceAssistant";

function App() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My React Components Library</h1>

      <Button
        text="Open Modal"
        type="primary"
        onClick={openModal}
      />

      <VoiceAssistant />

      <Card
        title="Student Card"
        description="This card is coming from my reusable component."
      />

      <Modal show={open} onClose={closeModal}>
        <h2>Hello!</h2>
        <p>This is my custom modal component.</p>
      </Modal>
    </div>
  );
}

export default App;
