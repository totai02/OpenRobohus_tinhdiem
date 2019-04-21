/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import RealTimeResult from './RealTimeResult';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {

  static propTypes = {

  };

  componentDidMount() {
    document.title = "Open RoboHUS 2019";
  }

  render() {
    const { currentRoundInfo, currentRoundTimeLeft} = this.props;
    let content = <RealTimeResult currentRoundInfo={currentRoundInfo} currentRoundTimeLeft={currentRoundTimeLeft} />;

    return (
      <Layout className={s.content} fadedFooter={true}>
        { content }
      </Layout>
    );
  }

}

const mapStateToProps = state => state.main;

export default connect(mapStateToProps)(HomePage);
