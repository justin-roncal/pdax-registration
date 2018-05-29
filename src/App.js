import React, { Component } from 'react';
import './App.css';
import {Button,Input,Paper,Grid,Typography, 
  TextField,Snackbar,IconButton} from '@material-ui/core'
import {Image} from 'react-bootstrap'
import MaskedInput from 'react-input-mask'

class App extends Component {

  state = {
    snackbar: false,
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

  handleClose = event => {
    this.setState({snackbar:false})
  }
  handleSubmit = event => {
    event.preventDefault();
    const {register: {fname,lname,cno,eadd}} = this.state
    const url = "https://cnrbwzrs79.execute-api.ap-southeast-1.amazonaws.com/prod";
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        fname,
        lname,
        cno,
        eadd
      })
    }).then( data =>{
      this.setState({snackbar:true})
    })

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
        <Grid container className="bg" spacing={24}>
          <Image className="branding" width="30%" src="./images/pdax-brand-identity.png" />

          <Grid item xs>
            <Paper className="mainGrid paperContainer">
              <form>
                <Typography  align="center" className="header" variant="headline" component="h1">
                    Register
                </Typography>

                <Grid className="row" container spacing={16}>

                  <Grid item md={6}>
                    <TextField
                      label="First Name"
                      placeholder="Enter First Name"
                      value={fname}
                      onChange={this.handleChange('fname')}
                      id="fname"
                    />
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      label="Last Name"
                      placeholder="Enter Last Name"
                      value={lname}
                      onChange={this.handleChange('lname')}
                      id="lname"
                    />
                  </Grid>

                </Grid>

                <Grid className="row" container spacing={16}>
                      <Grid item md={12}>
                        <TextField
                          label="Contact Number"
                          fullWidth
                          placeholder="Enter Contact Number"
                          value={cno}
                          onChange={this.handleChange('cno')}
                          id="fname"
                        />
                      </Grid>
                </Grid>

                <Grid className="row" container spacing={16}>
                  <Grid item md={12}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      placeholder="Enter Email Address"
                      value={eadd}
                      onChange={this.handleChange('eadd')}
                      id="fname"
                    />
                  </Grid>
                </Grid>
              </form>
              <Grid container md={12}>
                <Button className="btn-submit" onClick={this.handleSubmit} variant="raised" color="primary" id="b1">
                  Submit
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm>
          </Grid>

          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbar}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Registration Successful!</span>}
          action={[
            <Button key="close" color="secondary" size="small" onClick={this.handleClose}>
              Close
            </Button>,
          ]}
        />
        </Grid>
    );
  }
}

export default App;