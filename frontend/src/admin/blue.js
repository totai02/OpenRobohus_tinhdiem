import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, ButtonToolbar, Form, FormControl, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout/Layout';
import socket from '../socket';
import { ToastContainer, toast } from 'react-toastify';

class AdminPage extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      if (_.isArray(this.props.teams) && this.props.teams.length === 8) {
        const state = {};
        _.each(_.range(1, 9), i => state[`team${i}`] = this.props.teams[i-1].name);
        this.setState(state);
      }
    }, 1000);
  }

  handleResetRound = () => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) socket.emit('admin/resetRound', {});
  };

  handleStartRace = () => {
    let confirm = window.confirm("Trận đấu sẽ được bắt đầu sau khi bạn bấm phím OK!");
    if (confirm) socket.emit('admin/startRound', {});
  };

  updateScore = (e)=> {
    console.log(e.target.id);
    socket.emit('admin/updateScore', {team: 'B', value: e.target.id});
  };

  render() {
    return (
      <AdminLayout name='control-panel'>
        <ToastContainer newestOnTop hideProgressBar autoClose={5000}/>
        <Row>
          <Col xs={6}>
            <ButtonToolbar>
              <Button bsStyle="primary" style={{width: '100%', height: '10rem', fontSize: '5rem'}} onClick={this.handleStartRace}>Start</Button>
            </ButtonToolbar>
          </Col>
          <Col xs={6}>
            <ButtonToolbar>
              <Button bsStyle="warning" style={{width: '100%', height: '10rem', fontSize: '5rem'}} onClick={this.handleResetRound}>Reset</Button>
            </ButtonToolbar>
          </Col>
        </Row>

        <Row style={{marginTop: '4rem'}}>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="success" id="2" onClick={this.updateScore}>+2</Button>
            </ButtonToolbar>
          </Col>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="success" id="3" onClick={this.updateScore}>+3</Button>
            </ButtonToolbar>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="success" id="5" onClick={this.updateScore}>+5</Button>
            </ButtonToolbar>
          </Col>
          <Col xs={6}>
            <ButtonToolbar style={{marginTop: 10}}>
              <Button style={{width: '100%', height: '10rem', fontSize: '5rem'}} bsStyle="success" id="10" onClick={this.updateScore}>+10</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </AdminLayout>
    )
  }
}

const mapStateToProps = state => state.admin;

export default connect(mapStateToProps)(AdminPage);
