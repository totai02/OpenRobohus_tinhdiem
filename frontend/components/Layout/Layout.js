/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import s from './Layout.css';
import { Grid, Row, Col } from 'react-bootstrap';

import Background from '../../assets/images/theme.jpg';

var backgroundStyle = {
  backgroundImage: 'url(' + Background + ')',
  backgroundSize: 'cover',
  overflow: 'hidden'
};

class Layout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    fadedFooter: PropTypes.bool,
  };

  render() {
    const { fadedFooter, ...rest } = this.props;
    let header;

    if (fadedFooter) {
      header = <header>
        <Grid>
          <Row style={{ marginTop: '2rem'}}>
            <Col xs={9}>
              <img src={require('../../assets/images/hus_logo.png')} style={{ height: '12rem' }} alt="footer" className="block-center" />
            </Col>
            <Col xs={2}>
              <img src={require('../../assets/images/khoa-logo.png')} style={{ height: '8rem' }} alt="footer" className="block-center" />
            </Col>
            <Col xs={1} >
              <img src={require('../../assets/images/khoa-vatli-logo.png')} style={{ height: '8rem' }} alt="footer" className="block-center" />
            </Col>
          </Row>
        </Grid>
      </header>
    }

    return (
      <div style={backgroundStyle} className={s.fullScreen}>
        {header}

        <section className="content" >
          <Grid>
            <div {...rest} className={cx(s.content, this.props.className)}/>
          </Grid>
        </section>

      </div>
    );
  }
}

export default Layout;
