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
import { Grid } from 'react-bootstrap';
import Modal from 'react-modal';

class Layout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  state = {
    button1: 'default',
    button2: 'default',
    redirectToControlPanel: false,
    redirectToEditResult: false,
    isPaneOpen: false
  };

  componentDidMount() {
    Modal.setAppElement(document.getElementById('container'));
  }

  render() {

    return (
      <div>
        <section className="content">
          <Grid>
            <h2 className="text-center">Admin Control Panel</h2>
            <div {...this.props} className={cx(s.content, this.props.className)} />
          </Grid>
        </section>
      </div>
    );
  }
}

export default Layout;
