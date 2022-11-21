import React from "react";
import { Button, Menu } from "antd";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import {
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import { useSelector } from "react-redux";
import { generateModules } from "../../util/generateModules";
import { globalVariables } from "../../global.style";
import { CloudUploadOutlined } from "@ant-design/icons";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const menu = generateModules(
    token,
    "menu",
    getNavStyleSubMenuClass,
    navStyle
  );

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div style={{ height: "20px" }} />
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: sidebarCollapsed ? "10px 15px" : "10px 40px",
            }}
          >
            <Button
              style={{
                width: "100%",
                backgroundColor: globalVariables.color.primary[100],
                color: globalVariables.color.blanco,
                border: "none",
              }}
              type="ghost"
              // TODO: Mostrar pagina de carga masiva de folios
              onClick={() => {}}
            >
              {sidebarCollapsed ? (
                <CloudUploadOutlined
                  style={{ fontSize: "18px", lineHeight: "2.5" }}
                />
              ) : (
                "Importar archivo"
              )}
            </Button>
          </div>
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {menu && menu.length > 0 ? menu.map((item) => item) : null}
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
