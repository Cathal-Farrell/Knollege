'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function MultilineTextFields() {

  const handleSubmit = (event) => {
          
    console.log("handling submit");

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let text = data.get('textField')

    console.log(text)

    console.log("Sent text:" + text)

    runDBCallAsync(`http://localhost:3000/api/uploadtext?email=${text}`)
  }

  const handleSync = (event) => {
          
    console.log("handling sync");

    let text = data.get('text')

    console.log(text)

    console.log("Sent text:" + text)

    runDBCallAsync(`http://localhost:3000/api/uploadtext?text=${text}`)
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
        onSubmit={handleSubmit}
        on
        noValidate
        autoComplete="off"
      >
        <TextField
          id="textField"
          name="textField"
          label="Multiline"
          multiline
          rows={25}
          defaultValue="Default Value"
        />

        <Button 
          type="submit"
          variant="contained"
        >
          submit
        </Button>
        <Button 
          type="button"
          onClick={handleSync}
          variant="contained"
        >
          sync
        </Button>
      </Box>

      
    </container>
  );
}