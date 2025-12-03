'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';

export default function MultilineTextFields() {

  const inputRef = React.useRef(null);
  let textChanged = false;

  // Run loop every 5 seconds
  React.useEffect(() => {
    const intervalID = setInterval(() => {
      if (textChanged == true) {
        handleUploadText();
        textChanged = false;
      }
      else {
        console.log("No change");
        handleSyncText();
      }
    }, 5000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalID);
  }, []);

  
  function handleTextChanged() {
    console.log("text changed");
    textChanged = true;
  }

  
  function handleUploadText() {
    console.log("called the function");

    // Get current textbox value
    const data = inputRef.current?.value || "";

    console.log("current text:", data);

    runDBCallAsync(`http://localhost:3000/api/uploadtext?text=${encodeURIComponent(data)}`);
  }

  const handleSyncText = (event) => {
          
    console.log("handling sync");

    let text = runDBCallAsync(`http://localhost:3000/api/synctext?userID=${100}`)
  
    console.log(text)
  }

  async function runDBCallAsync(url) {

    const res = await fetch(url);

    const data = await res.json();


    if(data.data== "valid"){

      console.log("login is valid!")

    } else {

      console.log("not valid  ")

    }

  }

  return (
    <container>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '100ch' } }}
        
        noValidate
        autoComplete="off"
      >
        <TextField
          inputRef={inputRef}
          id="textField"
          name="textField"
          label="Multiline"
          multiline
          rows={25}
          defaultValue="Default Value"
          onChange={handleTextChanged}
        />
      </Box>

      
    </container>
  );
}