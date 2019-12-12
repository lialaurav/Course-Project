import React from 'react';
import axios from 'axios';

/* Resets the styling of the form */
function resetForm() {
  document.getElementById('labelUsername').className = '';
  document.getElementById('labelText').className = '';
  document.getElementById('text').style.height = '43px';
  document.getElementById('username').className = 'validate';
  document.getElementById('text').className = 'materialize-textarea validate';
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', text: ''};
    this.handleUsername = this.handleUsername.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* Updates the username when user writes something  */
  handleUsername(e) {
    this.setState({username: e.target.value});
    document.getElementById('username').className = 'validate';
  }

  /* Updates the text when user writes something */
  handleText(e) {
    this.setState({text: e.target.value});
    document.getElementById('text').className = 'materialize-textarea validate';
  }

  /* Defines what happens when user submits a new post */
  handleSubmit(e) {
    // To prevent the whole page from reloading when user submits a new post
    e.preventDefault();

    // Save the current values of username and text
    const post = {
      username: this.state.username,
      text: this.state.text
    };

    // If both values are not empty, make a POST request to server and reset the whole form
    if (post.username !== '' && post.text !== '') {
      axios.post('http://192.168.1.39:5000/add', post)
        .then(res => {
          console.log(res);
        })
      this.setState({username: '', text: ''});
      resetForm();
    }
    // If either of the values is empty, show an error
    else {
      if (post.username === '') {
        document.getElementById('username').className = 'invalid';
      } if (post.text === '') {
        document.getElementById('text').className = 'materialize-textarea invalid';
      }
    }
  }

  /* Resets the whole form */
  handleReset() {
    this.setState({username: '', text: ''});
    resetForm();
  }

  /* Renders the form */
  render() {
    return (
      <div className="col s12 m4">
        <div className="card small animation-1">
          <div className="card-content">
          <form className="" onSubmit={this.handleSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">account_circle</i>
              <input type="text" className="validate" id="username" value={this.state.username} onChange={this.handleUsername} minLength="1" maxLength="20"></input>
              <label for="username" id="labelUsername">Username</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">mode_edit</i>
              <textarea className="materialize-textarea validate" id="text" value={this.state.text} onChange={this.handleText} minLength="1" maxLength="100"></textarea>
              <label for="text" id="labelText">What's on your mind?</label>
              <p className="calc">{this.state.text.length}/100</p>
            </div>
            <input type="reset" id="reset" onClick={this.handleReset} className="form-button material-icons reset" value="clear"></input>
            <input type="submit" id="submit" className="form-button submit material-icons" value="play_arrow"></input>
          </form>
          </div>
        </div>
      </div>
    )}
}

export default Form;
