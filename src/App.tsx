import { useState } from "react";
import "./App.css";

type Talk = {
  title: string;
  abstract: string;
};

type Error = {
  title?: string;
  abstract?: string;
};

const savedTalk: Talk = {
  title: "React",
  abstract: "A JavaScript library for building user interfaces",
};

const newTalk: Talk = {
  title: "",
  abstract: "",
};

type Status = "idle" | "submitted" | "submitting";

type Touched = {
  title?: boolean;
  abstract?: boolean;
};

function App() {
  const [talk, setTalk] = useState(newTalk);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Touched>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTalk({ ...talk, [e.target.name]: e.target.value });
  }

  function validateForm() {
    const errors: Error = {};

    if (talk.title === "") {
      errors.title = "Title is required";
    }
    if (talk.abstract === "") {
      errors.abstract = "Abstract is required";
    }
    return errors;
  }

  // Derived state
  const errors = validateForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("submitted");
        console.log(talk);
      }}
    >
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={talk.title}
        onBlur={() => setTouched({ ...touched, title: true })}
        onChange={handleChange}
      />
      {status === "submitted" ||
        (touched.title && <p style={{ color: "red" }}>{errors.title}</p>)}

      <label>Abstract</label>
      <input
        type="text"
        name="abstract"
        value={talk.abstract}
        onBlur={() => setTouched({ ...touched, abstract: true })}
        onChange={handleChange}
      />
      {status === "submitted" ||
        (touched.abstract && <p style={{ color: "red" }}>{errors.abstract}</p>)}

      <input type="submit" value="Save" />
    </form>
  );
}

export default App;
