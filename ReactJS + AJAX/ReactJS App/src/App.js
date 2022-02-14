// StAuth10244: I Alec Pasion, 000811377 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

// Starter code for the front-end, includes examples of accessing all server 
// API routes with AJAX requests.

import './App.css';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { TextField, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow, styled, Button, Container, Grid, Collapse, Typography} from '@mui/material';
import Paper from "@material-ui/core/Paper";
// eslint-disable-next-line
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Material UI is included in the install of the front end, so we have access
// to components like Buttons, etc, when we import them.
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

}));

function Pets() {
  
  // isLoaded keeps track of whether the initial load of pet data from the
  // server has occurred.  pets is the array of pets data in the table, and 
  // searchResults is the array of pets data after a search request.
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  // eslint-disable-next-line
  let toEdit ={animal:"",description:"",age:"",price:""}
  // fetches all pet data from the server
  function fetchPets()
  {
    fetch("http://localhost:3001/api?act=getall")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        setIsLoaded(true);
        setPets(result);
      })    
  }
  
  // use fetchPets as an effect with an empty array as a 2nd argument, which 
  // means fetchPets will ONLY be called when the component first mounts
  useEffect(fetchPets, []);
  
  // Inserts a pet with hardcoded data in the URL for each query parameter, we 
  // could insert a pet with custom data by building a string like this:
  //
  // let url = "http://localhost:3001/api?act=add&animal=" + animal + ...
  //
  // fetch(url)
  // .then( ... )...
  //
  function addPet(e)
  {
    e.preventDefault()
    let animal = document.getElementById("petType").value
    let descriptionInput = document.getElementById("petDescription").value
    let age = document.getElementById("petAge").value
    let price = document.getElementById("petPrice").value
    let length = descriptionInput.length
    let description = ""
    for(let i = 0; i < length; i++){
      const char = descriptionInput[i];
      if(!(char === ' ')){
        description += char;
      }else{
        description += '%20';
      };
   };
    let url = "http://localhost:3001/api?act=add&animal=" + animal + "&description=" + description + "&age=" + age + "&price=" + price
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
  }

  // Deletes a pet from the pet inventory, using a hardcoded id query parameter
  // Again we could delete a pet with custom data by building a string like:
  //
  // let url = "http://localhost:3001/api?act=delete&id=" + id
  //
  // fetch(url)
  // .then( ... )...
  //
  // 
  function deletePet(e)
  {
    let id = e.target.id
    let url = "http://localhost:3001/api?act=delete&id=" + id
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
  }
  function searchPet()
  {
    let searchItem = document.getElementById("petSearch").value
    if(searchItem === ""){
      fetchPets();
      return;
    }
    let length = searchItem.length
    let item = ""
    for(let i = 0; i < length; i++){
      const char = searchItem[i];
      if(!(char === ' ')){
        item += char;
      }else{
        item += '%20';
      };
   };
   let url = "http://localhost:3001/api?act=search&term=" + item
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        setPets(result);
      });
  }

  // If data has loaded, render the table of pets, buttons that execute the 
  // above functions when they are clicked, and a table for search results. 
  // Notice how we can use Material UI components like Button if we import 
  // them as above.
  //
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <Paper elevation={6} id="header">
          <Typography variant="h5">PET INVENTORY</Typography>
        </Paper>
        <Paper elevation={6} id="firstSet">
          <form onSubmit={addPet}>
            <Grid container spacing={2}>
              <Grid item align="center">
                <TextField
                  required
                  id="petType"
                  label="Animal"
                />
              </Grid>
              <Grid item align="center">
                <TextField
                  required
                  id="petDescription"
                  label="Description"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  required
                  id="petAge"
                  label="Age"
                  type="number"
                  defaultValue="0"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="petPrice"
                  label="Price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item id="button">
                <Button variant="contained" type="submit">Add Pet</Button>
              </Grid>
              
            </Grid>
          </form><br />
        </Paper>
        <Paper elevation={6} id="paperContent">
          <Grid container>
            <Grid item id="results">
              <Grid container direction="column">
                <Grid item>
                  <TextField
                      required
                      id="petSearch"
                      label="Search"
                      onChange={searchPet}
                  /><br />
                </Grid>
                <Grid item>
                  <Table sx={{ maxWidth: 500 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="right">Animal</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="right">Age</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pets.map((pet) => (
                        <StyledTableRow key={pet.id} id={pet.id}>
                          <StyledTableCell component="th" scope="row">
                            {pet.animal}
                          </StyledTableCell>
                          <StyledTableCell align="right">{pet.description}</StyledTableCell>
                          <StyledTableCell align="right">{pet.age}</StyledTableCell>
                          <StyledTableCell align="right">{pet.price}</StyledTableCell>
                          <StyledTableCell align='right'><DeleteOutlinedIcon id={pet.id} onClick={deletePet}/></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>            
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

function App() {
  return (
    <div>
      <Pets />
    </div>
  );
}

export default App;
