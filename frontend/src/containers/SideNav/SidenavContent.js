import $ from 'jquery';
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
window.jQuery = window.$ = $;
require('jquery-slimscroll');

class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const $nav = $(this.nav);
    const slideDuration = 250;

    $nav.slimscroll({
      height: '100%'
    });

    const pathname = `#${history.location.pathname}`;

    $('ul.nav-menu > li.menu').click(function () {
      const menuLi = this;
      $('ul.nav-menu > li.menu')
        .not(menuLi)
        .removeClass('open');
      $('ul.nav-menu > li.menu ul')
        .not($('ul', menuLi))
        .slideUp(slideDuration);
      $('> ul', menuLi).slideToggle(slideDuration);
      $(menuLi).toggleClass('open');
    });

    $('ul.sub-menu li').click(function (e) {
      let superSubMenu = $(this).parent();
      if (superSubMenu.parent().hasClass('active')) {
        $('li', superSubMenu)
          .not($(this))
          .removeClass('active');
      } else {
        $('ul.sub-menu li')
          .not($(this))
          .removeClass('active');
      }

      $(this).toggleClass('active');
      e.stopPropagation();
    });

    const activeLi = $('a[href="' + pathname + '"]'); // select current a element
    const activeNav = activeLi.closest('ul'); // select closest ul
    if (activeNav.hasClass('sub-menu')) {
      activeNav.slideDown(slideDuration);
      activeNav.parent().addClass('open');
      activeLi.parent().addClass('active');
    } else {
      activeLi.parent().addClass('open');
    }
  }

  render() {
    return (
      <ul className="nav-menu" ref={(n) => this.nav = n}>
        <li className="nav-header">&nbsp;</li>
        <li className="menu no-arrow">
          <NavLink to="/app/search_planet">
            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
            <span className="nav-text">Search Planet</span>
          </NavLink>
        </li>   
      </ul>
    );
  }
}

export default withRouter(SidenavContent);
