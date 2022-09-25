import React from "react";
import { Button, Divider, Layout, Tooltip } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";

import { toggleCollapsedSideNav } from "../../appRedux/actions";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../authentication";

const { Header } = Layout;

const Topbar = () => {
  const { userSignOut } = useAuth();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("token"));

  const { navStyle } = useSelector(({ settings }) => settings);
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);
  const width = useSelector(({ common }) => common.width);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    userSignOut(() => {
      history.push("/");
    });
  };

  const title = useLocation();

  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER ||
      ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
        width < TAB_SIZE) ? (
        <div className="gx-linebar gx-mr-3">
          <i
            className="gx-icon-btn icon icon-menu"
            onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}
          />
        </div>
      ) : null}
      <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
        <img alt="" src={"/assets/images/w-logo.png"} />
      </Link>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // gap: "5px",
        }}
      >
        <div style={{ fontSize: "18px" }}>{title.pathname.split("/")[1]}</div>
        <div
          style={{
            marginRight: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "16px" }}>
            {user.nombre && user.nombre} {user.apellidos && user.apellidos}
          </span>
          <span style={{ fontSize: "11px", color: "gray" }}>
            {user.dni && user.dni}
          </span>
        </div>
        <Divider type="vertical" />
        <Tooltip placement="bottom" title="Cerrar Sesión">
          <Button style={{ margin: 0 }} type="text" onClick={onLogoutClick}>
            <LogoutOutlined style={{ color: "red" }} />
          </Button>
        </Tooltip>
      </div>
    </Header>
  );
};

export default Topbar;
