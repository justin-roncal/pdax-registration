import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import {Button,Input,Paper,Grid,Typography} from '@material-ui/core'
import $ from 'jquery';
import ObjectsToCsv from 'objects-to-csv'

import stringify from 'csv-stringify'
//import JSON from 'react-stringify'


class App extends Component {

  state = {
    persons: [],

    register: {

      fname: '',
      lname: '',
      cno: '',
      eadd: ''

    }
  }

  handleChange = name => ({ target: {value}}) => {
    this.setState({
      register: {
        ...this.state.register,
        [name]:value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const {register: {fname,lname,cno,eadd}} = this.state

    const credetials = {
      fname: this.state.register.fname,
      lname: this.state.register.lname,
      cno: this.state.register.cno,
      eadd: this.state.register.eadd
    }

    // console.log(JSON.stringify(credetials))

    // let csv = stringify([credetials])

    // console.log(csv)

    const script_url = "https://script.google.com/macros/s/AKfycbyzo9LDSsxHigtXRnt25ecb1kJJ6Z9ecNlBnER7fP3xlynyX_0/exec";
  
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/jsonp',
          "Access-Control-Allow-Origin": "*",
      }
    }

    // const url = script_url+"?callback=ctrlq&fname="+fname+"&lname="+lname+"&cno="+cno+"&eadd="+eadd+"&action=insert";
    const url = 
     `${script_url}?callback=ctrlq&fname=${fname}&lname=${lname}&cno=${cno}&eadd=${eadd}&action=insert`

    // let csv = new ObjectsToCsv(credetials)

  console.log(url)

    // let csvContent = "data:text/csv;charset=utf-8,";
    //   credetials.forEach(function(rowArray){
    //     let row = rowArray.join(",");
    //     csvContent += row + "\r\n";
    //   }); 

      //  let encodedUri = encodeURI(csv);

      //  console.log(encodedUri);
      //  window.open(encodedUri);

    axios.post(url)

    // this.componentDidMount() {
    //   $.ajax({
    //     crossDomain: true,
    //     url: url ,
    //     method: "GET",
    //     dataType: "jsonp"
    //   });
    // }
    

    this.setState({
      register: {

        fname: '',
        lname: '',
        cno: '',
        eadd: ''
  
      }
    })
  }
  
  render() {

    const {register:{fname,lname,cno,eadd}} = this.state

    return (
      <div className="App">
        <Grid container spacing={24}>
          <Grid item sm>
          </Grid>
          <Grid item xs>
            <Paper className="mainGrid paperContainer">

              <form>
                <Grid container spacing={16}>
                  <Typography className="header" variant="headline" component="h3">
                    Register
                  </Typography>
                </Grid> 
                
                <Grid container spacing={16}>

                  <Grid item md={6}>
                    <Input
                      placeholder="First Name"
                      value={fname}
                      onChange={this.handleChange('fname')}
                      id="fname"
                    />
                  </Grid>

                  <Grid item md={6}>
                    <Input
                      placeholder="Last Name"
                      value={lname}
                      onChange={this.handleChange('lname')}
                      id="lname"
                    />
                  </Grid>

                </Grid>

                <Grid container spacing={16}>
                      <Grid item md={12}>
                        <Input
                          placeholder="Contact Number"
                          value={cno}
                          onChange={this.handleChange('cno')}
                          id="fname"
                        />
                      </Grid>
                </Grid>

                <Grid container spacing={16}>
                  <Grid item md={12}>
                    <Input
                      placeholder="Email Address"
                      value={eadd}
                      onChange={this.handleChange('eadd')}
                      id="fname"
                    />
                  </Grid>
                </Grid>
              </form>

              <Button onClick={this.handleSubmit} variant="raised" color="primary" id="b1">
                Button
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;