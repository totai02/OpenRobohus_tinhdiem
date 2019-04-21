import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, ButtonToolbar, Form, FormControl, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout/Layout';
import socket from '../socket';
import { ToastContainer, toast } from 'react-toastify';

class AdminPage extends React.Component {
  state = {
    team1: '',
    team2: '',
    team3: '',
    team4: '',
    team5: '',
    team6: '',
    team7: '',
    team8: ''
  };

  componentDidMount() {
    setTimeout(() => {
      if (_.isArray(this.props.teams) && this.props.teams.length === 8) {
        const state = {};
        _.each(_.range(1, 9), i => state[`team${i}`] = this.props.teams[i-1].name);
        this.setState(state);
      }
    }, 1000);
  }

  updateScore = (e)=> {
    console.log(e.target.id);
    socket.emit('admin/updateScore', {team: 'R', value: e.target.id});
  };

  render() {
    return (
      <AdminLayout name='control-panel'>
        <ToastContainer newestOnTop hideProgressBar autoClose={5000}/>

        <Row style={{marginTop: '4rem'}}>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="danger" id="2" onClick={this.updateScore}>+2</Button>
            </ButtonToolbar>
          </Col>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="danger" id="3" onClick={this.updateScore}>+3</Button>
            </ButtonToolbar>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="danger" id="5" onClick={this.updateScore}>+5</Button>
            </ButtonToolbar>
          </Col>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="danger" id="10" onClick={this.updateScore}>+10</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </AdminLayout>
    )
  }
}

const mapStateToProps = state => state.admin;

export default connect(mapStateToProps)(AdminPage);
